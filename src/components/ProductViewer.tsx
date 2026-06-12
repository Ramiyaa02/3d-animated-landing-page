import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Center, Environment } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

interface ProductViewerProps {
  color: string
  metalness: number
  roughness: number
  activeSection: number
  mouseCoords: { x: number; y: number }
}

// Custom internal component to draw and animate the headphone mesh
const HeadphoneModel: React.FC<{
  color: string
  metalness: number
  roughness: number
  activeSection: number
  mouseCoords: { x: number; y: number }
}> = ({ color, metalness, roughness, activeSection, mouseCoords }) => {
  const modelRef = useRef<THREE.Group>(null)
  const leftEarcupRef = useRef<THREE.Mesh>(null)
  const rightEarcupRef = useRef<THREE.Mesh>(null)
  const headbandRef = useRef<THREE.Mesh>(null)
  
  // Color conversion for smooth GSAP transitions
  useEffect(() => {
    if (leftEarcupRef.current && rightEarcupRef.current) {
      const targetColor = new THREE.Color(color)
      const leftMat = leftEarcupRef.current.material as THREE.MeshPhysicalMaterial
      const rightMat = rightEarcupRef.current.material as THREE.MeshPhysicalMaterial

      // Animate material color channels individually for TypeScript compatibility
      gsap.to(leftMat.color, {
        duration: 0.8,
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        ease: 'power2.out',
      })
      gsap.to(leftMat, {
        duration: 0.8,
        metalness: metalness,
        roughness: roughness,
        ease: 'power2.out',
      })

      gsap.to(rightMat.color, {
        duration: 0.8,
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        ease: 'power2.out',
      })
      gsap.to(rightMat, {
        duration: 0.8,
        metalness: metalness,
        roughness: roughness,
        ease: 'power2.out',
      })
    }
  }, [color, metalness, roughness])

  // GSAP animation triggers when activeSection changes
  useEffect(() => {
    if (!modelRef.current) return

    // Define positions, rotations and scales for different sections
    let targetPos = { x: 0, y: 0.2, z: 0 }
    let targetRot = { x: 0.1, y: 0.5, z: 0 }
    let targetScale = 1.3

    switch (activeSection) {
      case 0: // Hero
        targetPos = { x: 0, y: 0, z: 0 }
        targetRot = { x: 0.1, y: 0.3, z: 0 }
        targetScale = 1.6
        break
      case 1: // Featured Products
        targetPos = { x: -1.5, y: -0.2, z: 0 }
        targetRot = { x: 0.2, y: -0.6, z: -0.1 }
        targetScale = 1.1
        break
      case 2: // Categories
        targetPos = { x: 1.6, y: -0.1, z: 0 }
        targetRot = { x: -0.1, y: 1.2, z: 0.2 }
        targetScale = 1.0
        break
      case 3: // Interactive Showcase
        targetPos = { x: -1.2, y: 0.1, z: 0.5 }
        targetRot = { x: 0.3, y: 2.2, z: -0.1 }
        targetScale = 1.7
        break
      case 4: // Testimonials
        targetPos = { x: 1.4, y: 0, z: 0 }
        targetRot = { x: 0.2, y: -0.8, z: 0 }
        targetScale = 1.2
        break
      case 5: // Brand Story
        targetPos = { x: 0, y: 0, z: 2.2 } // Zoomed in extremely close
        targetRot = { x: 0.5, y: 0.8, z: 0.3 }
        targetScale = 2.5
        break
      case 6: // Newsletter
        targetPos = { x: 0, y: -0.2, z: 0 }
        targetRot = { x: 0, y: 3.14, z: 0 } // Back view
        targetScale = 1.2
        break
      default:
        break
    }

    // Animate transition using GSAP
    gsap.to(modelRef.current.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1.5,
      ease: 'power3.out',
    })

    gsap.to(modelRef.current.rotation, {
      x: targetRot.x,
      y: targetRot.y,
      z: targetRot.z,
      duration: 1.5,
      ease: 'power3.out',
    })

    gsap.to(modelRef.current.scale, {
      x: targetScale,
      y: targetScale,
      z: targetScale,
      duration: 1.5,
      ease: 'power3.out',
    })
  }, [activeSection])

  // Frame animation loop for mouse physics parallax & slow auto rotation
  useFrame((state) => {
    if (!modelRef.current) return

    const t = state.clock.getElapsedTime()

    // Base auto rotation + mouse parallax influence
    // Only apply mouse parallax in sections where the camera is not super close-up
    const parallaxFactorX = activeSection === 5 ? 0.05 : 0.4
    const parallaxFactorY = activeSection === 5 ? 0.05 : 0.4

    // Target rotation including idle hover bobbing and mouse parallax
    const targetXRot = (activeSection === 5 ? 0.5 : 0.1) + Math.sin(t * 0.5) * 0.05 + mouseCoords.y * parallaxFactorY
    const targetYRot = (activeSection === 0 ? 0.3 : activeSection === 3 ? 2.2 : 0.5) + t * 0.15 + mouseCoords.x * parallaxFactorX

    // Smooth lerp to targets to prevent jarring cuts
    modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetXRot, 0.05)
    modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetYRot, 0.05)

    // Soft floating bobbing effect on position
    if (activeSection !== 5) {
      modelRef.current.position.y += Math.sin(t * 1.5) * 0.001
    }
  })

  return (
    <group ref={modelRef}>
      {/* Headband Arch */}
      <mesh ref={headbandRef} castShadow receiveShadow>
        <torusGeometry args={[0.9, 0.08, 16, 100, Math.PI]} />
        <meshPhysicalMaterial
          color="#18181b"
          metalness={0.9}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Headband inner cushion */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <torusGeometry args={[0.86, 0.05, 12, 100, Math.PI]} />
        <meshStandardMaterial color="#09090b" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Left Hinge and Extender */}
      <group position={[-0.9, 0, 0]}>
        {/* Metal slider bar */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />
          <meshPhysicalMaterial color="#a1a1aa" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Metallic connector socket */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
          <meshPhysicalMaterial color="#3f3f46" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Earcup pivot joint */}
        <mesh position={[0, -0.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.12, 16]} />
          <meshPhysicalMaterial color="#27272a" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Left Earcup Shell */}
        <group position={[-0.08, -0.4, 0]} rotation={[0, 0, -Math.PI / 8]}>
          <mesh ref={leftEarcupRef} castShadow receiveShadow>
            {/* Elegant beveled cylinder ear cup */}
            <cylinderGeometry args={[0.35, 0.38, 0.28, 32]} />
            <meshPhysicalMaterial
              color={color}
              metalness={metalness}
              roughness={roughness}
              clearcoat={metalness > 0.5 ? 1.0 : 0.2}
              clearcoatRoughness={0.15}
              reflectivity={1.0}
            />
          </mesh>

          {/* Chrome Outer Accent Ring */}
          <mesh position={[0, 0.14, 0]} castShadow>
            <torusGeometry args={[0.34, 0.02, 8, 32]} />
            <meshPhysicalMaterial color="#ffffff" metalness={1.0} roughness={0.05} />
          </mesh>

          {/* Ear Cushion (Leather pad) */}
          <mesh position={[0, -0.16, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.39, 0.39, 0.08, 32]} />
            <meshStandardMaterial color="#121212" roughness={0.8} metalness={0.2} />
          </mesh>

          {/* Inner mesh speaker cover */}
          <mesh position={[0, -0.21, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.02, 32]} />
            <meshStandardMaterial color="#1c1917" roughness={0.95} />
          </mesh>

          {/* Futuristic Glowing LED Ring */}
          <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.22, 0.015, 8, 32]} />
            <meshBasicMaterial color={color === '#ffffff' ? '#00f5d4' : color} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* Right Hinge and Extender */}
      <group position={[0.9, 0, 0]}>
        {/* Metal slider bar */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />
          <meshPhysicalMaterial color="#a1a1aa" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Metallic connector socket */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
          <meshPhysicalMaterial color="#3f3f46" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Earcup pivot joint */}
        <mesh position={[0, -0.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.12, 16]} />
          <meshPhysicalMaterial color="#27272a" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Right Earcup Shell */}
        <group position={[0.08, -0.4, 0]} rotation={[0, 0, Math.PI / 8]}>
          <mesh ref={rightEarcupRef} castShadow receiveShadow>
            <cylinderGeometry args={[0.35, 0.38, 0.28, 32]} />
            <meshPhysicalMaterial
              color={color}
              metalness={metalness}
              roughness={roughness}
              clearcoat={metalness > 0.5 ? 1.0 : 0.2}
              clearcoatRoughness={0.15}
              reflectivity={1.0}
            />
          </mesh>

          {/* Chrome Outer Accent Ring */}
          <mesh position={[0, 0.14, 0]} castShadow>
            <torusGeometry args={[0.34, 0.02, 8, 32]} />
            <meshPhysicalMaterial color="#ffffff" metalness={1.0} roughness={0.05} />
          </mesh>

          {/* Ear Cushion (Leather pad) */}
          <mesh position={[0, -0.16, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.39, 0.39, 0.08, 32]} />
            <meshStandardMaterial color="#121212" roughness={0.8} metalness={0.2} />
          </mesh>

          {/* Inner mesh speaker cover */}
          <mesh position={[0, -0.21, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 0.02, 32]} />
            <meshStandardMaterial color="#1c1917" roughness={0.95} />
          </mesh>

          {/* Futuristic Glowing LED Ring */}
          <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.22, 0.015, 8, 32]} />
            <meshBasicMaterial color={color === '#ffffff' ? '#00f5d4' : color} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

// Scene light source controller reacting to mouse for realistic specular highlights
const DynamicSceneLighting: React.FC<{ mouseCoords: { x: number; y: number } }> = ({ mouseCoords }) => {
  const lightRef = useRef<THREE.DirectionalLight>(null)

  useFrame(() => {
    if (lightRef.current) {
      // Lerp key light position based on mouse to dynamic reflections
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, mouseCoords.x * 6 + 4, 0.08)
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, -mouseCoords.y * 6 + 5, 0.08)
    }
  })

  return (
    <>
      {/* Studio ambient environment fill */}
      <ambientLight intensity={0.6} />

      {/* Main direction key light */}
      <directionalLight
        ref={lightRef}
        position={[4, 5, 5]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* Soft backlighting (rim light) */}
      <directionalLight position={[-4, 3, -4]} intensity={1.8} color="#a0c4ff" />

      {/* Cyberpunk accent lights */}
      <pointLight position={[-3, -2, 2]} intensity={2.0} color="#ff007f" />
      <pointLight position={[3, -2, -2]} intensity={2.0} color="#00f5d4" />
    </>
  )
}

const ProductViewer: React.FC<ProductViewerProps> = (props) => {
  return (
    <div className="w-full h-full relative select-none pointer-events-none">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.0
        }}
      >
        <DynamicSceneLighting mouseCoords={props.mouseCoords} />

        <Center>
          <HeadphoneModel {...props} />
        </Center>

        {/* Ambient floating dust particles in 3D space */}
        <Sparkles
          count={80}
          scale={7}
          size={2.5}
          speed={0.4}
          opacity={0.4}
          color="#00f5d4"
        />
        <Sparkles
          count={80}
          scale={7}
          size={2.0}
          speed={0.3}
          opacity={0.3}
          color="#ff007f"
        />

        {/* Dynamic environmental reflection */}
        <Environment preset="studio" blur={0.8} />
      </Canvas>
    </div>
  )
}

export default ProductViewer
