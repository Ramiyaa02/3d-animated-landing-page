import React, { useRef, useState } from 'react'
import { Eye, Plus, Star } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  description: string
  rating: number
  color: string
  glowColor: string
  specs: string[]
}

interface FeaturedProps {
  onAddToCart: (product: { name: string; price: number; color: string }) => void
  onQuickView: (product: Product) => void
}

// 3D Tilt Card wrapper component
const TiltCard: React.FC<{ children: React.ReactNode; glowColor: string }> = ({ children, glowColor }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Relative coordinates from 0 to width/height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    
    // Convert to percentage values (-0.5 to 0.5)
    const xPct = (mouseX / width) - 0.5
    const yPct = (mouseY / height) - 0.5

    // Multipliers for tilt strength
    const rotateX = -yPct * 20 // Rotate around X based on Y coordinate
    const rotateY = xPct * 20  // Rotate around Y based on X coordinate
    
    // Glow position coordinates in percentage
    const glowX = (mouseX / width) * 100
    const glowY = (mouseY / height) * 100

    setCoords({ rotateX, rotateY, glowX, glowY })
  }

  const handleMouseLeave = () => {
    // Reset back to center
    setCoords({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-3xl p-6 transition-all duration-300 ease-out glass-card border border-white/5 shadow-2xl hover:border-white/15 cursor-pointer group"
      style={{
        transform: `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale(1.02)`,
      }}
    >
      {/* Dynamic light reflection glow based on mouse position */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle 180px at ${coords.glowX}% ${coords.glowY}%, ${glowColor}1a, transparent 70%)`,
        }}
      />
      {children}
    </div>
  )
}

const Featured: React.FC<FeaturedProps> = ({ onAddToCart, onQuickView }) => {
  const featuredProducts: Product[] = [
    {
      id: 'p1',
      name: 'Aura Studio Pro',
      price: 449,
      description: 'The pinnacle of spatial acoustic engineering with polished titanium accents.',
      rating: 4.9,
      color: '#e0aaff',
      glowColor: '#9d4edd',
      specs: ['50h battery', 'Hybrid ANC v2', 'Titanium Drivers'],
    },
    {
      id: 'p2',
      name: 'Aura Stealth Edition',
      price: 399,
      description: 'Matte dark carbon chassis with silent adaptive sound profiles.',
      rating: 4.8,
      color: '#3f3f46',
      glowColor: '#00f5d4',
      specs: ['45h battery', 'Auto ANC', 'Graphene Core'],
    },
    {
      id: 'p3',
      name: 'Aura Chroma Carbon',
      price: 499,
      description: 'Hand-crafted carbon fibre frame with color-shifting acoustic housing.',
      rating: 5.0,
      color: '#ff007f',
      glowColor: '#ff007f',
      specs: ['60h battery', 'Dynamic ANC', 'Carbon Diaphragms'],
    },
  ]

  return (
    <section className="relative w-full py-32 px-6 md:px-12 select-none z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start text-left mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-brand-purple/20 bg-brand-purple/5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
            <span className="font-sans text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
              Curated Selection
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tight text-white">
            Featured <span className="text-gradient-purple">Acoustics</span>
          </h2>
          <p className="font-sans text-zinc-400 text-sm max-w-md mt-4 font-light">
            Designed for audiophiles who demand flawless precision and luxurious physical craftsmanship.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, idx) => (
            <TiltCard key={product.id} glowColor={product.glowColor}>
              {/* Product Badge */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                  <Star className="w-3.5 h-3.5 fill-brand-cyan text-brand-cyan" />
                  <span className="font-bold font-sans">{product.rating}</span>
                </div>
                {idx === 2 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-[9px] font-bold text-brand-pink tracking-widest uppercase">
                    Rare Edition
                  </span>
                )}
              </div>

              {/* Product Visual Mockup */}
              <div className="relative w-full h-48 flex items-center justify-center mb-6 overflow-hidden rounded-2xl bg-zinc-950/50 border border-white/5">
                {/* Dynamic colored background circle glow */}
                <div
                  className="absolute w-24 h-24 rounded-full blur-[40px] opacity-25 group-hover:scale-150 transition-transform duration-500"
                  style={{ backgroundColor: product.glowColor }}
                />
                
                {/* 2D Representation in card */}
                <div className="flex flex-col items-center gap-2 group-hover:scale-110 transition-transform duration-500">
                  <div 
                    className="w-16 h-16 rounded-full border-4 flex items-center justify-center"
                    style={{ borderColor: product.color, boxShadow: `0 0 20px ${product.glowColor}40` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10" />
                  </div>
                  <span className="font-sans text-[10px] tracking-widest font-bold uppercase text-zinc-400">
                    {product.specs[2]}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="text-left">
                <h3 className="font-sans font-bold text-lg text-white group-hover:text-brand-cyan transition-colors">
                  {product.name}
                </h3>
                <p className="font-sans text-zinc-400 text-xs mt-2 leading-relaxed h-12 overflow-hidden">
                  {product.description}
                </p>

                {/* Specs Pill Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.specs.slice(0, 2).map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-0.5 rounded-md border border-white/5 bg-white/2 text-[9px] font-sans text-zinc-400 uppercase tracking-wider"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest">Price</span>
                    <span className="font-sans font-bold text-lg text-white">${product.price}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onQuickView(product)}
                      className="p-2.5 rounded-xl border border-white/5 bg-white/3 hover:bg-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
                      title="Quick View"
                    >
                      <Eye className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => onAddToCart({ name: product.name, price: product.price, color: product.color })}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-black font-sans font-bold text-xs hover:bg-zinc-200 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Featured
