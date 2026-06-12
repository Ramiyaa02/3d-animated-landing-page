import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Featured from './components/Featured'
import Categories from './components/Categories'
import Showcase from './components/Showcase'
import Reviews from './components/Reviews'
import BrandStory from './components/BrandStory'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import ProductViewer from './components/ProductViewer'
import Cart from './components/Cart'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CartItem {
  id: string
  name: string
  price: number
  color: string
}

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

function App() {
  // 3D Model Parameters
  const [color, setColor] = useState('#9d4edd')
  const [metalness, setMetalness] = useState(0.85)
  const [roughness, setRoughness] = useState(0.15)
  const [activeSection, setActiveSection] = useState(0)
  
  // Mouse coordinates for 3D parallax tracking
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 })

  // Cart Management
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Modal / Quick View
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  // Track cursor position globally for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMouseCoords({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Intersection Observer to track which section is currently active and transition 3D model
  useEffect(() => {
    const sections = document.querySelectorAll('section[data-index]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10)
            setActiveSection(index)
          }
        })
      },
      {
        root: null,
        threshold: 0.35, // Trigger when 35% of the section is visible
      }
    )

    sections.forEach((s) => observer.observe(s))
    return () => {
      sections.forEach((s) => observer.unobserve(s))
    }
  }, [])

  // GSAP ScrollTrigger for section entry reveals
  useEffect(() => {
    const revealElements = document.querySelectorAll('.gsap-reveal')
    
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 50,
          clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
        },
        {
          opacity: 1,
          y: 0,
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, [])

  // Add Item to Cart
  const handleAddToCart = (product: { name: string; price: number; color: string }) => {
    const newItem: CartItem = {
      id: Date.now().toString(),
      name: product.name,
      price: product.price,
      color: product.color,
    }
    setCartItems((prev) => [...prev, newItem])
    setIsCartOpen(true)
  }

  // Remove Item from Cart
  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Clear Cart
  const handleClearCart = () => {
    setCartItems([])
  }

  // Scroll to a specific section index smoothly
  const handleNavigate = (index: number) => {
    const sections = document.querySelectorAll('section[data-index]')
    const targetSection = Array.from(sections).find(
      (s) => parseInt(s.getAttribute('data-index') || '', 10) === index
    )
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-brand-cyan selection:text-black overflow-x-hidden">
      {/* Sticky Premium Navbar */}
      <Navbar
        cartCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* FIXED 3D Canvas Background Container */}
      {/* Only render fixed viewport on desktop screens where 3D flows beautifully */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none hidden lg:block">
        <ProductViewer
          color={color}
          metalness={metalness}
          roughness={roughness}
          activeSection={activeSection}
          mouseCoords={mouseCoords}
        />
      </div>

      {/* Content Layout Sections */}
      <main className="relative w-full z-10">
        
        {/* Section 0: Hero */}
        <section id="hero-section" data-index={0} className="w-full">
          <Hero 
            onScrollToNext={() => handleNavigate(1)}
            onAddToCart={() => handleAddToCart({ name: 'Aura Gen-V', price: 399, color: '#9d4edd' })}
          />
        </section>

        {/* Section 1: Featured Products */}
        <section id="featured-section" data-index={1} className="w-full bg-[#050505]/30 backdrop-blur-3xl lg:bg-transparent gsap-reveal">
          <Featured
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        </section>

        {/* Section 2: Product Categories */}
        <section id="categories-section" data-index={2} className="w-full bg-[#030303]/60 backdrop-blur-3xl lg:bg-transparent gsap-reveal">
          <Categories />
        </section>

        {/* Section 3: Interactive 3D Customizer Showcase */}
        <section id="customize-section" data-index={3} className="w-full gsap-reveal">
          {/* Mobile warning label for customizer preview */}
          <div className="lg:hidden w-full px-6 pt-16 text-center select-none">
            <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] uppercase font-bold tracking-widest">
              Standard Viewport Active on Mobile
            </span>
          </div>
          <Showcase
            color={color}
            setColor={setColor}
            metalness={metalness}
            setMetalness={setMetalness}
            roughness={roughness}
            setRoughness={setRoughness}
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* Section 4: Customer Reviews */}
        <section id="reviews-section" data-index={4} className="w-full bg-[#050505]/40 backdrop-blur-3xl lg:bg-transparent gsap-reveal">
          <Reviews />
        </section>

        {/* Section 5: Brand Story */}
        <section id="story-section" data-index={5} className="w-full bg-[#030303]/50 backdrop-blur-3xl lg:bg-transparent gsap-reveal">
          <BrandStory />
        </section>

        {/* Section 6: Newsletter Signup */}
        <section id="newsletter-section" data-index={6} className="w-full gsap-reveal">
          <Newsletter />
        </section>

      </main>

      {/* Footer component */}
      <Footer onNavigate={handleNavigate} />

      {/* Slide-over Shopping Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div 
            onClick={() => setQuickViewProduct(null)} 
            className="absolute inset-0 bg-black/70 backdrop-blur-md" 
          />
          <div className="relative w-full max-w-lg glass-premium rounded-3xl p-8 border border-white/10 z-10 shadow-2xl flex flex-col items-start text-left">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-sans text-[10px] font-bold tracking-widest text-brand-cyan uppercase mb-2">
              Hardware Specs
            </span>
            <h3 className="font-sans font-bold text-2xl text-white uppercase mb-4">
              {quickViewProduct.name}
            </h3>
            <p className="font-sans text-zinc-400 text-sm leading-relaxed mb-6 font-light">
              {quickViewProduct.description}
            </p>

            <div className="w-full flex flex-col gap-3 mb-6 bg-white/2 p-4 rounded-2xl border border-white/5">
              {quickViewProduct.specs.map((s, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="font-sans text-zinc-500 uppercase tracking-widest">Dimension {idx + 1}</span>
                  <span className="font-sans font-bold text-white uppercase">{s}</span>
                </div>
              ))}
            </div>

            <div className="w-full flex items-center justify-between pt-4 border-t border-white/5">
              <span className="font-sans font-bold text-xl text-white">${quickViewProduct.price}</span>
              <button
                onClick={() => {
                  handleAddToCart({
                    name: quickViewProduct.name,
                    price: quickViewProduct.price,
                    color: quickViewProduct.color,
                  })
                  setQuickViewProduct(null)
                }}
                className="px-6 py-3 rounded-xl bg-white text-black font-sans font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors"
              >
                Add to bag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Simple X icon for modal
const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default App
