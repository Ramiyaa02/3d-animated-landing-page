import React, { useState } from 'react'
import { Star, UserCheck, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Review {
  id: string
  name: string
  role: string
  rating: number
  category: string
  comment: string
  avatarColor: string
}

const Reviews: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  const reviews: Review[] = [
    {
      id: 'r1',
      name: 'Alexander Vane',
      role: 'Grammy Mastering Engineer',
      rating: 5,
      category: 'Studio',
      comment: 'The Aura Studio Pro has completely replaced my nearfield monitor configuration for late-night master reference listening. The space representation is unbelievably accurate.',
      avatarColor: 'bg-indigo-600',
    },
    {
      id: 'r2',
      name: 'Sarah Jenkins',
      role: 'Creative Director at Velo',
      rating: 5,
      category: 'Travel',
      comment: 'Absolute silence. The hybrid ANC blocks high-frequency jet engines and chatter effortlessly. Plus, the glassmorphic cups draw questions wherever I go.',
      avatarColor: 'bg-teal-600',
    },
    {
      id: 'r3',
      name: 'Marcus Thorne',
      role: 'AV Systems Architect',
      rating: 4.8,
      category: 'Studio',
      comment: 'An astonishing soundstage for a closed-back headphone. The graphene drivers produce extremely tight transience, especially in the sub-bass frequencies.',
      avatarColor: 'bg-emerald-600',
    },
    {
      id: 'r4',
      name: 'Lina Rodriguez',
      role: 'UI Designer & Gamer',
      rating: 5,
      category: 'Stealth',
      comment: 'Zero delay and superb comfort. I wear it during my 8-hour coding sessions and then hop straight into gaming without any ear strain. Highly recommended.',
      avatarColor: 'bg-rose-600',
    },
  ]

  const filters = ['All', 'Studio', 'Travel', 'Stealth']

  const filteredReviews = activeFilter === 'All' 
    ? reviews 
    : reviews.filter((r) => r.category === activeFilter)

  return (
    <section className="relative w-full py-32 px-6 md:px-12 select-none z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header and Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-left">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 mb-4 w-fit">
              <UserCheck className="w-3.5 h-3.5 text-brand-cyan" />
              <span className="font-sans text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
                Acoustic Endorsements
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tight text-white">
              Trusted by <span className="text-gradient-cyan-blue">Sound Experts</span>
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex gap-2.5 p-1.5 rounded-2xl bg-zinc-950 border border-white/5 w-fit">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-sans font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-white text-black'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid with Animations */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((rev) => (
              <motion.div
                layout
                key={rev.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl p-8 glass flex flex-col justify-between border border-white/5 hover:border-white/10 hover:bg-white/3 transition-all duration-300 shadow-xl"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rev.rating)
                            ? 'fill-brand-purple text-brand-purple'
                            : 'text-zinc-650'
                        }`}
                      />
                    ))}
                    {rev.rating % 1 !== 0 && (
                      <Star className="w-4 h-4 fill-brand-purple text-brand-purple opacity-50" />
                    )}
                  </div>

                  {/* Comment */}
                  <p className="font-sans text-zinc-350 text-sm italic leading-relaxed text-left font-light mb-8">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className={`w-10 h-10 rounded-full ${rev.avatarColor} flex items-center justify-center text-white font-sans font-extrabold text-xs uppercase tracking-wider`}>
                    {rev.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-sans font-bold text-sm text-white">{rev.name}</span>
                    <span className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">
                      {rev.role}
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-[10px] text-zinc-500 font-sans uppercase font-bold tracking-wider">
                    <Shield className="w-3.5 h-3.5 text-zinc-600" />
                    Verified
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Reviews
