import React from 'react'
import { Cpu, Sparkles, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMagnetic } from '../hooks/useMagnetic'

interface HeroProps {
  onScrollToNext: () => void
  onAddToCart: () => void
}

const Hero: React.FC<HeroProps> = ({ onScrollToNext, onAddToCart }) => {
  const exploreBtnRef = useMagnetic<HTMLButtonElement>(0.2)
  const cartBtnRef = useMagnetic<HTMLButtonElement>(0.25)

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center px-6 md:px-12 py-24 select-none z-10 pointer-events-none">
      {/* Background soft glowing blur effects (glowing under the 3D canvas) */}
      <div className="absolute top-[20%] left-[15%] w-96 h-96 rounded-full bg-brand-purple/10 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-brand-cyan/10 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />

      {/* Hero Header Badge */}
      <div className="w-full max-w-7xl mx-auto flex justify-start pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md shadow-lg"
        >
          <Award className="w-4 h-4 text-brand-cyan animate-pulse" />
          <span className="font-sans text-[11px] font-semibold tracking-widest text-zinc-300 uppercase">
            Awwwards Site of the Day 2026
          </span>
        </motion.div>
      </div>

      {/* Hero Main Content */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center flex-grow py-8 pointer-events-auto">
        {/* Left Side: Text and CTA */}
        <div className="flex flex-col items-start text-left z-20">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-brand-cyan text-xs font-bold tracking-[0.4em] uppercase mb-4"
          >
            Spatial Sound Reimagined
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease: 'easeOut' }}
            className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-none text-white tracking-tight uppercase"
          >
            Aura <br />
            <span className="text-gradient-purple">Gen-V</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.7 }}
            className="font-sans text-zinc-400 text-sm md:text-base max-w-md mt-6 leading-relaxed font-light"
          >
            Experience acoustic perfection. High-fidelity spatial audio meets dynamic ANC and organic luxury aesthetics. Sculpted for comfort, designed for the future.
          </motion.p>

          {/* Interactive Button Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <button
              ref={exploreBtnRef}
              onClick={onScrollToNext}
              className="px-8 py-4 rounded-xl bg-white text-black font-sans font-bold text-xs tracking-widest uppercase hover:bg-zinc-200 transition-colors shadow-2xl shadow-white/5 cursor-pointer"
            >
              Explore 3D
            </button>
            <button
              ref={cartBtnRef}
              onClick={onAddToCart}
              className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-white font-sans font-bold text-xs tracking-widest uppercase hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md cursor-pointer"
            >
              Buy Now — $399
            </button>
          </motion.div>
        </div>

        {/* Right Side: Reserved for the floating 3D Headphone (canvas aligns here) */}
        <div className="w-full h-[350px] lg:h-[500px] pointer-events-none" />
      </div>

      {/* Floating Info Panels / Specs */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-6 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center gap-4 bg-zinc-950/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl max-w-xs shadow-xl"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center border border-brand-purple/20">
            <Cpu className="w-5 h-5 text-brand-purple" />
          </div>
          <div>
            <h4 className="font-sans text-[11px] font-bold tracking-wider text-white uppercase">A1 Neural Core</h4>
            <p className="font-sans text-[10px] text-zinc-400 mt-0.5">Real-time room-scaling spatial audio processing.</p>
          </div>
        </motion.div>

        {/* Scroll mouse indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          onClick={onScrollToNext}
          className="self-center flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="font-sans text-[10px] font-semibold tracking-[0.3em] text-zinc-500 uppercase group-hover:text-white transition-colors">
            Scroll
          </span>
          <div className="w-6 h-10 rounded-full border border-zinc-700 flex justify-center p-1.5 group-hover:border-zinc-500 transition-colors">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-brand-cyan"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex items-center gap-4 bg-zinc-950/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl max-w-xs shadow-xl"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/20">
            <Sparkles className="w-5 h-5 text-brand-cyan" />
          </div>
          <div>
            <h4 className="font-sans text-[11px] font-bold tracking-wider text-white uppercase">Fluid Acoustics</h4>
            <p className="font-sans text-[10px] text-zinc-400 mt-0.5">Liquid graphene speaker drivers for zero distortion.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
