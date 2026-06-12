import React, { useState } from 'react'
import { X, Trash2, ShoppingBag, CreditCard, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

interface CartItem {
  id: string
  name: string
  price: number
  color: string
}

interface CartProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onRemoveItem: (id: string) => void
  onClearCart: () => void
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemoveItem, onClearCart }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  const subtotal = items.reduce((acc, item) => acc + item.price, 0)

  const handleCheckout = () => {
    if (items.length === 0) return

    setIsCheckingOut(true)
    
    // Simulate luxury payment processing delay
    setTimeout(() => {
      setIsCheckingOut(false)
      setCheckoutSuccess(true)
      
      // Launch celebratory confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#9d4edd', '#00f5d4', '#ff007f', '#ffffff']
      })

      // Auto-clear cart and close after delay
      setTimeout(() => {
        onClearCart()
        setCheckoutSuccess(false)
        onClose()
      }, 4000)
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950/95 border-l border-white/5 backdrop-blur-2xl shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-cyan" />
                <span className="font-sans font-bold text-sm text-white uppercase tracking-wider">
                  Your Laboratory Bag ({items.length})
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items / Checkout Success screen */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4">
              <AnimatePresence mode="wait">
                {checkoutSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-cyan/15 border border-brand-cyan/35 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-brand-cyan" />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tight mb-2">
                      Order Dispatched
                    </h3>
                    <p className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest mb-6">
                      Reserve Securely Logged
                    </p>
                    <p className="font-sans text-zinc-450 text-xs leading-relaxed max-w-xs font-light">
                      Thank you for choosing Aura. Your order has been placed successfully and our engineers are packing your soundstage kit.
                    </p>
                  </motion.div>
                ) : items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center text-zinc-500 mb-6">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <p className="font-sans text-zinc-400 text-sm font-semibold uppercase tracking-wider">
                      Your bag is empty
                    </p>
                    <p className="font-sans text-zinc-500 text-xs mt-2 max-w-[200px] leading-relaxed">
                      Explore the customizer or features to select your gear.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="list" className="flex flex-col gap-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="rounded-2xl p-4 bg-white/2 border border-white/5 flex items-center justify-between hover:bg-white/4 hover:border-white/10 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          {/* Colored representation dot representing cup color */}
                          <div
                            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: item.color }}
                          />
                          <div className="flex flex-col items-start">
                            <span className="font-sans font-bold text-xs text-white uppercase tracking-wider text-left">
                              {item.name}
                            </span>
                            <span className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                              Custom Build
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-sans font-bold text-sm text-white">
                            ${item.price}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2 rounded-lg border border-white/5 hover:border-brand-pink/20 bg-white/2 hover:bg-brand-pink/5 text-zinc-500 hover:text-brand-pink transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Actions */}
            {items.length > 0 && !checkoutSuccess && (
              <div className="p-6 border-t border-white/5 flex flex-col gap-4 bg-zinc-950">
                <div className="flex justify-between items-center text-zinc-400 font-sans text-xs uppercase font-bold tracking-wider">
                  <span>Subtotal</span>
                  <span className="text-white text-base">${subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-zinc-500 uppercase tracking-widest">
                  <span>Shipping & Laboratory Duties</span>
                  <span className="text-brand-cyan">Complimentary</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-4 rounded-xl font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-xl ${
                    isCheckingOut
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-white hover:bg-zinc-200 text-black transition-colors'
                  }`}
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-zinc-600 border-t-brand-cyan rounded-full animate-spin" />
                      Securing Laboratory Hold...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Checkout Securely
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Cart
