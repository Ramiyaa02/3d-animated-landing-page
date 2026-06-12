import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const useMagnetic = <T extends HTMLElement = HTMLElement>(strength: number = 0.35) => {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent
      const rect = element.getBoundingClientRect()
      
      // Calculate coordinates of center of the element
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Delta from center to cursor
      const deltaX = mouseEvent.clientX - centerX
      const deltaY = mouseEvent.clientY - centerY

      // Animate the element position towards the cursor with damping
      gsap.to(element, {
        x: deltaX * strength,
        y: deltaY * strength,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const handleMouseLeave = () => {
      // Return element to original position with elastic spring effect
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return ref
}
