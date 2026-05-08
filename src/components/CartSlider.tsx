'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';

interface CartSliderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CartSlider({ open, setOpen }: CartSliderProps) {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Slide-out Panel Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm transition-opacity duration-500"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white z-[60] shadow-2xl transform transition-transform duration-500 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header - Refined and Calm */}
          <div className="bg-primary p-6 flex justify-between items-center relative overflow-hidden">
            <div className="flex items-center gap-2 relative z-10">
              <ShoppingCart className="text-accent" size={20} />
              <h2 className="text-xl font-semibold text-white">Your Cart</h2>
            </div>
            <button 
              onClick={() => setOpen(false)} 
              className="text-white/80 hover:text-white transition-colors relative z-10 p-1"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-8">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <span className="text-6xl mb-6 opacity-20">🍲</span>
                <h3 className="text-xl font-semibold text-gray-900">Your cart is empty</h3>
                <p className="text-gray-500 mt-2 font-medium max-w-[250px]">Choose some delicious dishes from our menu to get started.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center group">
                    <div className="relative shrink-0 overflow-hidden rounded-2xl shadow-sm border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                      <p className="text-primary font-semibold text-lg">₦{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-lg transition-all"><Minus size={12} /></button>
                          <span className="px-3 font-semibold text-gray-900 text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-lg transition-all"><Plus size={12} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-8 border-t border-gray-100 bg-white">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-500 uppercase tracking-wide">Total</span>
                <span className="text-2xl font-bold text-primary tracking-tight">₦{getTotal().toLocaleString()}</span>
              </div>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="w-full bg-accent text-primary py-4 rounded-full font-semibold text-lg text-center block shadow-lg shadow-accent/20 hover:scale-[1.02] transition-all duration-300"
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
