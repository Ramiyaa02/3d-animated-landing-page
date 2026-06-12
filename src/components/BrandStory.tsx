import React from 'react'
import { Headphones, Activity, Compass, Wind } from 'lucide-react'

const BrandStory: React.FC = () => {
  const points = [
    {
      icon: <Compass className="w-5 h-5 text-brand-cyan" />,
      title: 'Danish Design Language',
      description: 'Organic minimalist contours balanced with functional durability.',
    },
    {
      icon: <Activity className="w-5 h-5 text-brand-purple" />,
      title: 'Precision Acoustic Tuning',
      description: 'Years of frequency response mapping to ensure neutral, high-resolution reproduction.',
    },
    {
      icon: <Wind className="w-5 h-5 text-brand-pink" />,
      title: 'Breathable Comfort',
      description: 'Acoustic memory foam covered in ultra-premium protein leather isolates heat.',
    },
  ]

  return (
    <section className="relative w-full py-32 px-6 md:px-12 select-none z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        {/* Left column: Text storytelling details */}
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-brand-pink/20 bg-brand-pink/5 mb-4">
            <Headphones className="w-3.5 h-3.5 text-brand-pink" />
            <span className="font-sans text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
              Our Blueprint
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tight text-white mb-6">
            Sculpted by <span className="text-gradient-gold">Sound Scientists</span>
          </h2>
          <p className="font-sans text-zinc-400 text-sm md:text-base leading-relaxed mb-10 font-light max-w-lg">
            At Aura, we believe technology should dissolve into the sensory experience. We have stripped away all unnecessary visual noise, crafting a hyper-refined headphone from custom carbon weaves and brushed aerospace metals.
          </p>

          {/* Key pillars */}
          <div className="flex flex-col gap-6 w-full max-w-md">
            {points.map((pt, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-white/3 border border-white/5 mt-0.5">
                  {pt.icon}
                </div>
                <div className="flex flex-col items-start">
                  <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
                    {pt.title}
                  </h4>
                  <p className="font-sans text-zinc-400 text-xs mt-1 leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column is reserved for the zoomed-in 3D model close-up */}
        <div className="w-full h-[300px] lg:h-[500px] pointer-events-none hidden lg:block" />
      </div>
    </section>
  )
}

export default BrandStory
