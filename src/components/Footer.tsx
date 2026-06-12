import React from 'react'
import { Headphones } from 'lucide-react'

interface FooterProps {
  onNavigate: (sectionIndex: number) => void
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear()

  const columns = [
    {
      title: 'Shop',
      links: [
        { label: 'Featured Acoustics', index: 1 },
        { label: 'Browse Categories', index: 2 },
        { label: 'Configure Aura', index: 3 },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Sound Labs Story', index: 5 },
        { label: 'Press Kit', index: 5 },
        { label: 'Engineering Careers', index: 5 },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'Spatial Calibration Guide', index: 4 },
        { label: 'Warranty & Returns', index: 4 },
        { label: 'Audio Forum Support', index: 4 },
      ],
    },
  ]

  return (
    <footer className="relative w-full bg-zinc-950 border-t border-white/5 py-20 px-6 md:px-12 select-none z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <div 
              onClick={() => onNavigate(0)}
              className="flex items-center gap-2.5 cursor-pointer group mb-6"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border border-white/10 group-hover:border-brand-purple/50 transition-all duration-300">
                <Headphones className="w-4 h-4 text-white group-hover:text-brand-purple transition-colors" />
              </div>
              <span className="font-display font-bold text-lg tracking-[0.2em] text-white uppercase">
                AURA
              </span>
            </div>
            <p className="font-sans text-zinc-500 text-xs max-w-sm leading-relaxed mb-6 font-light">
              Crafting reference-grade hardware for the sound explorers of tomorrow. Designed in Copenhagen. Built for the cosmos.
            </p>
            
            {/* Social Icons (using clean inline SVGs for compatibility) */}
            <div className="flex gap-4">
              {/* Twitter/X */}
              <a href="#" className="w-8 h-8 rounded-lg border border-white/5 bg-white/2 hover:bg-white/5 hover:border-brand-cyan/40 text-zinc-400 hover:text-brand-cyan flex items-center justify-center transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-8 h-8 rounded-lg border border-white/5 bg-white/2 hover:bg-white/5 hover:border-brand-purple/40 text-zinc-400 hover:text-brand-purple flex items-center justify-center transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* Youtube */}
              <a href="#" className="w-8 h-8 rounded-lg border border-white/5 bg-white/2 hover:bg-white/5 hover:border-brand-pink/40 text-zinc-400 hover:text-brand-pink flex items-center justify-center transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              {/* Github */}
              <a href="#" className="w-8 h-8 rounded-lg border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/20 text-zinc-400 hover:text-white flex items-center justify-center transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.646.64.699 1.026 1.592 1.026 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col items-start text-left">
              <span className="font-sans text-[10px] font-bold tracking-widest text-white uppercase mb-5">
                {col.title}
              </span>
              <div className="flex flex-col gap-3">
                {col.links.map((link, lIdx) => (
                  <button
                    key={lIdx}
                    onClick={() => onNavigate(link.index)}
                    className="font-sans text-[11px] text-zinc-500 hover:text-brand-cyan transition-colors uppercase tracking-wider text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Footer Bottom (Copyright) */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] font-sans text-zinc-550 uppercase tracking-widest gap-4">
          <span>© {currentYear} Aura acoustics Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Cookies Settings</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
