import React, { useState } from 'react'
import { Send, CheckCircle2, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMagnetic } from '../hooks/useMagnetic'

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isError, setIsError] = useState(false)

  const btnRef = useMagnetic<HTMLButtonElement>(0.2)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setIsError(true)
      return
    }
    
    setIsError(false)
    setIsSubmitted(true)
  }

  return (
    <section className="relative w-full py-32 px-6 md:px-12 select-none z-10">
      {/* Background ambient glowing details */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-cyan/5 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto glass-premium rounded-[40px] p-8 md:p-16 text-center border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Glow corner detail */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-purple/10 blur-[40px] rounded-full pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-6">
                <Mail className="w-5 h-5 text-brand-cyan" />
              </div>
              
              <h2 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tight text-white mb-4">
                Join the <span className="text-gradient-purple">Acoustic Circle</span>
              </h2>
              
              <p className="font-sans text-zinc-400 text-sm max-w-md mb-8 leading-relaxed font-light">
                Subscribe to get early notification of upcoming hardware drops, exclusive acoustics insights, and members-only laboratory reserves.
              </p>

              <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (isError) setIsError(false)
                    }}
                    placeholder="Enter your email address"
                    className={`w-full px-5 py-4 rounded-xl bg-zinc-950 border text-white font-sans text-xs focus:outline-none transition-all ${
                      isError 
                        ? 'border-brand-pink/50 focus:border-brand-pink' 
                        : 'border-white/10 focus:border-brand-cyan/50 focus:shadow-[0_0_20px_rgba(0,245,212,0.15)]'
                    }`}
                  />
                  {isError && (
                    <span className="absolute left-0 -bottom-5 text-[10px] font-sans text-brand-pink font-semibold uppercase tracking-wider">
                      Please enter a valid email.
                    </span>
                  )}
                </div>
                
                <button
                  ref={btnRef}
                  type="submit"
                  className="px-6 py-4 rounded-xl bg-white text-black font-sans font-bold text-xs tracking-wider uppercase hover:bg-zinc-200 cursor-pointer flex items-center justify-center gap-2 transition-colors sm:w-auto w-full"
                >
                  Join
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center py-6"
            >
              <div className="w-16 h-16 rounded-full bg-brand-cyan/10 border border-brand-cyan/35 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-brand-cyan animate-bounce" />
              </div>
              
              <h2 className="font-display font-bold text-3xl uppercase tracking-tight text-white mb-3">
                You are <span className="text-gradient-cyan-blue">Subscribed</span>
              </h2>
              
              <p className="font-sans text-zinc-400 text-xs tracking-widest uppercase mb-8">
                Welcome to the laboratory circle.
              </p>
              
              <p className="font-sans text-zinc-400 text-sm max-w-xs leading-relaxed font-light">
                We have logged your email. A verification link and a secret welcoming code has been dispatched.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Newsletter
