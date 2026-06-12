import React from 'react'
import { Disc, Layers, ShieldCheck, Gamepad2 } from 'lucide-react'

interface Category {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  gradient: string
  tags: string[]
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    {
      id: 'c1',
      title: 'Studio Master',
      subtitle: 'Pure Reference Grade',
      description: 'Zero distortion acoustic chambers configured for professional audio engineering.',
      icon: <Disc className="w-6 h-6 text-brand-purple" />,
      gradient: 'from-brand-purple/20 to-transparent',
      tags: ['Audiophile', 'Wired/Wireless', 'True Analog'],
    },
    {
      id: 'c2',
      title: 'Active ANC Air',
      subtitle: 'Immersive Silence',
      description: 'Multi-layer ambient sound canceling for frequent travelers and dynamic workspace focus.',
      icon: <ShieldCheck className="w-6 h-6 text-brand-cyan" />,
      gradient: 'from-brand-cyan/20 to-transparent',
      tags: ['Travel', 'Lightweight', '48h ANC'],
    },
    {
      id: 'c3',
      title: 'Chroma Pro',
      subtitle: 'Illuminated Beats',
      description: 'Synchronized rhythm responsive LED lights integrated into premium sandblasted aluminum cups.',
      icon: <Layers className="w-6 h-6 text-brand-pink" />,
      gradient: 'from-brand-pink/20 to-transparent',
      tags: ['Dynamic RGB', 'Pro Customizer', 'Wireless'],
    },
    {
      id: 'c4',
      title: 'Quantum Gaming',
      subtitle: 'Ultra-low Latency',
      description: 'Spatial surround audio profiling with custom hyper-fast 2.4Ghz wireless transmitter dongle.',
      icon: <Gamepad2 className="w-6 h-6 text-yellow-400" />,
      gradient: 'from-yellow-500/20 to-transparent',
      tags: ['2.4Ghz Wireless', 'Boom Mic', '3D Soundstage'],
    },
  ]

  return (
    <section className="relative w-full py-32 px-6 md:px-12 select-none z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-end text-right mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            <span className="font-sans text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
              Acoustic Classifications
            </span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tight text-white">
            Product <span className="text-gradient-cyan-blue">Categories</span>
          </h2>
          <p className="font-sans text-zinc-400 text-sm max-w-md mt-4 font-light ml-auto">
            Choose your signature experience. Every category hosts custom acoustic tuning and build profiles.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="relative rounded-3xl p-8 glass overflow-hidden border border-white/5 hover:border-white/10 group cursor-pointer transition-all duration-500 hover:-translate-y-1 shadow-xl"
            >
              {/* Subtle back gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-20 group-hover:opacity-30 transition-all duration-500 -z-10`} />
              
              {/* Neon border highlight */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-brand-cyan/40 transition-all duration-700" />

              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Icon and Subtitle */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                      {cat.icon}
                    </div>
                    <span className="font-sans text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                      {cat.subtitle}
                    </span>
                  </div>

                  {/* Header */}
                  <h3 className="font-sans font-bold text-2xl text-white group-hover:text-white transition-colors text-left">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-zinc-400 text-sm mt-3 leading-relaxed text-left max-w-sm">
                    {cat.description}
                  </p>
                </div>

                {/* Tags and CTA */}
                <div className="flex flex-wrap gap-2 items-center justify-between mt-10 pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-white/2 border border-white/5 text-[9px] font-sans text-zinc-400 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="font-sans text-[11px] font-bold tracking-widest text-brand-cyan uppercase group-hover:translate-x-1.5 transition-transform duration-300">
                    Discover →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
