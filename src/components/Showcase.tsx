import React from 'react'
import { Sparkles, Sliders, Check, ShoppingCart } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'

interface ShowcaseProps {
  color: string
  setColor: (color: string) => void
  metalness: number
  setMetalness: (m: number) => void
  roughness: number
  setRoughness: (r: number) => void
  onAddToCart: (product: { name: string; price: number; color: string }) => void
}

const Showcase: React.FC<ShowcaseProps> = ({
  color,
  setColor,
  metalness,
  setMetalness,
  roughness,
  setRoughness,
  onAddToCart,
}) => {
  const colors = [
    { name: 'Aurora Purple', value: '#9d4edd', glow: 'shadow-brand-purple/20' },
    { name: 'Neon Teal', value: '#00f5d4', glow: 'shadow-brand-cyan/20' },
    { name: 'Electric Magenta', value: '#ff007f', glow: 'shadow-brand-pink/20' },
    { name: 'Space White', value: '#ffffff', glow: 'shadow-white/20' },
    { name: 'Stealth Carbon', value: '#27272a', glow: 'shadow-zinc-500/20' },
  ]

  const cartBtnRef = useMagnetic<HTMLButtonElement>(0.2)

  const getActiveColorName = () => {
    return colors.find((c) => c.value === color)?.name || 'Custom'
  }

  const handleAddToCart = () => {
    onAddToCart({
      name: `Aura Custom [${getActiveColorName()}]`,
      price: 429,
      color: color,
    })
  }

  return (
    <section className="relative w-full min-h-screen flex items-center px-6 md:px-12 py-24 select-none z-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        {/* Left column is blank layout-wise, but is where the 3D Canvas floats */}
        <div className="w-full h-[300px] lg:h-[600px] pointer-events-none hidden lg:block" />

        {/* Right column: Sleek glassmorphic interactive customizer panel */}
        <div className="flex flex-col items-start text-left pointer-events-auto">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-brand-purple/20 bg-brand-purple/5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
            <span className="font-sans text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
              Interactive Lab
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tight text-white mb-2">
            Configure <span className="text-gradient-purple">Your Aura</span>
          </h2>
          <p className="font-sans text-zinc-400 text-sm max-w-md mb-8 font-light">
            Design your acoustic masterpiece. Fine-tune material reflection, surface roughness, and colors. Your changes update the 3D viewport in real-time.
          </p>

          <div className="w-full glass-premium rounded-3xl p-6 md:p-8 flex flex-col gap-8">
            {/* Color Chooser */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-sans text-xs font-bold tracking-widest text-zinc-400 uppercase">
                  Select Accent Color
                </span>
                <span className="font-sans text-xs font-bold text-brand-cyan uppercase tracking-wider">
                  {getActiveColorName()}
                </span>
              </div>
              <div className="flex gap-4">
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    className={`relative w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg ${c.glow} border-2 ${
                      color === c.value ? 'border-white scale-110' : 'border-white/10'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  >
                    {color === c.value && (
                      <Check className={`w-4 h-4 ${c.value === '#ffffff' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Sliders */}
            <div className="flex flex-col gap-6">
              {/* Metalness Slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="font-sans text-xs font-bold tracking-widest text-zinc-400 uppercase">
                      Material Polish (Metalness)
                    </span>
                  </div>
                  <span className="font-sans text-[11px] font-bold text-zinc-300">
                    {Math.round(metalness * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={metalness}
                  onChange={(e) => setMetalness(parseFloat(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 font-medium uppercase font-sans mt-1">
                  <span>Matte Polymer</span>
                  <span>Gloss Titanium</span>
                </div>
              </div>

              {/* Roughness Slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="font-sans text-xs font-bold tracking-widest text-zinc-400 uppercase">
                      Surface Satin (Roughness)
                    </span>
                  </div>
                  <span className="font-sans text-[11px] font-bold text-zinc-300">
                    {Math.round(roughness * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.8"
                  step="0.05"
                  value={roughness}
                  onChange={(e) => setRoughness(parseFloat(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-pink"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 font-medium uppercase font-sans mt-1">
                  <span>Mirror Chrome</span>
                  <span>Soft Velvet</span>
                </div>
              </div>
            </div>

            {/* Spec breakdown */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/2 border border-white/5">
              <div>
                <span className="font-sans text-[9px] text-zinc-500 uppercase tracking-widest block">Core Driver</span>
                <span className="font-sans font-bold text-xs text-white uppercase mt-0.5 block">Liquid Graphene</span>
              </div>
              <div>
                <span className="font-sans text-[9px] text-zinc-500 uppercase tracking-widest block">Spatial Mode</span>
                <span className="font-sans font-bold text-xs text-white uppercase mt-0.5 block">Dynamic Atmos</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-4 mt-2">
              <div className="flex flex-col">
                <span className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest">Pricing</span>
                <span className="font-sans font-bold text-2xl text-white">$429.00</span>
              </div>

              <button
                ref={cartBtnRef}
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-sans font-bold text-xs tracking-wider uppercase shadow-xl cursor-pointer transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Add Customized to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Showcase
