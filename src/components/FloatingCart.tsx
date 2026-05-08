'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';

export default function FloatingCart() {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const count = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Floating Button - Redesigned as Gold Circle */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-20 h-20 bg-accent text-primary rounded-full shadow-[0_20px_50px_rgba(212,175,55,0.4)] flex items-center justify-center z-40 hover:scale-110 transition-all duration-300 active:scale-95 border-4 border-white"
      >
        <div className="relative">
          <ShoppingCart size={32} strokeWidth={3} />
          {count > 0 && (
            <span className="absolute -top-4 -right-4 bg-primary text-accent text-xs font-black w-8 h-8 rounded-full flex items-center justify-center border-4 border-accent shadow-xl">
              {count}
            </span>
          )}
        </div>
      </button>

      {/* Slide-out Panel Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 backdrop-blur-md transition-opacity duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-lg bg-cream z-[60] shadow-2xl transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-10 border-b border-primary/5 flex justify-between items-center bg-primary text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <h2 className="text-3xl font-black flex items-center gap-3 relative z-10 tracking-tighter uppercase">
              <ShoppingCart className="text-accent" size={32} /> Your Pot
            </h2>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-300 relative z-10 bg-white/10 p-2 rounded-xl">
              <X size={28} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-10">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <span className="text-8xl mb-6 grayscale animate-pulse">🍲</span>
                <h3 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Your pot is empty</h3>
                <p className="text-gray-500 mt-4 font-medium max-w-[250px]">The fire is burning but there's no food in the pot yet!</p>
              </div>
            ) : (
              <div className="space-y-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center group">
                    <div className="relative shrink-0 overflow-hidden rounded-[1.5rem] shadow-lg">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-black text-xl text-gray-900 tracking-tight leading-none mb-1">{item.name}</h4>
                      <p className="text-primary font-black text-lg tracking-tighter">₦{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center bg-gray-100 rounded-2xl p-1 border border-gray-200">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm"><Minus size={14} /></button>
                          <span className="px-4 font-black text-gray-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={20} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-10 border-t border-primary/5 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Amount</span>
                <span className="text-4xl font-black text-primary tracking-tighter italic">₦{getTotal().toLocaleString()}</span>
              </div>
              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="w-full bg-accent text-primary py-6 rounded-[2rem] font-black text-xl text-center block shadow-2xl hover:bg-primary hover:text-accent transition-all duration-300 transform hover:-translate-y-1 tracking-tighter uppercase"
              >
                Checkout Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
