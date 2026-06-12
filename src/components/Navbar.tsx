import React, { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, Headphones } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMagnetic } from '../hooks/useMagnetic'

interface NavbarProps {
  cartCount: number
  onCartClick: () => void
  onNavigate: (sectionIndex: number) => void
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navLinks = [
    { label: 'Hero', index: 0 },
    { label: 'Featured', index: 1 },
    { label: 'Categories', index: 2 },
    { label: 'Customize', index: 3 },
    { label: 'Reviews', index: 4 },
    { label: 'Our Story', index: 5 }
  ]

  const buttonRef = useMagnetic<HTMLButtonElement>(0.2)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 px-6 md:px-12 ${
          isScrolled ? 'glass-nav backdrop-blur-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo with futuristic logo animation */}
          <div 
            onClick={() => onNavigate(0)}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-zinc-900 border border-white/10 group-hover:border-brand-cyan/50 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/20 to-brand-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Headphones className="w-4 h-4 text-white group-hover:text-brand-cyan group-hover:rotate-12 transition-all duration-500" />
            </div>
            <span className="font-display font-bold text-xl tracking-[0.2em] text-white uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-cyan transition-all duration-300">
              AURA
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigate(link.index)}
                className="font-sans text-[13px] tracking-widest text-zinc-400 uppercase font-medium hover:text-white transition-colors cursor-pointer relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-cyan group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Cart Icon & Premium Magnetic Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 text-white transition-all cursor-pointer group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-brand-cyan text-black font-sans font-bold text-[10px] rounded-full shadow-lg"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Premium Magnetic CTA Button */}
            <button
              ref={buttonRef}
              onClick={() => onNavigate(3)}
              className="hidden md:block px-6 py-2.5 rounded-xl bg-white text-black font-sans font-bold text-xs tracking-widest uppercase hover:bg-zinc-200 transition-colors shadow-xl cursor-pointer relative overflow-hidden group"
            >
              <span className="relative z-10">Configure</span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-white transition-all cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Slide-down Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[73px] left-0 w-full z-40 bg-zinc-950/95 border-b border-white/5 backdrop-blur-xl md:hidden px-6 py-8 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.index)
                  setIsMobileMenuOpen(false)
                }}
                className="font-sans text-sm tracking-widest text-zinc-400 uppercase font-semibold text-left py-2 hover:text-brand-cyan transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate(3)
                setIsMobileMenuOpen(false)
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-sans font-bold text-xs tracking-widest uppercase text-center mt-2 shadow-lg"
            >
              Configure Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
