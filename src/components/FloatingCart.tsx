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
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-primary text-accent rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-110 transition-transform active:scale-95 border-2 border-accent/20"
      >
        <div className="relative">
          <ShoppingCart size={28} />
          {count > 0 && (
            <span className="absolute -top-3 -right-3 bg-accent text-primary text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-primary">
              {count}
            </span>
          )}
        </div>
      </button>

      {/* Slide-out Panel Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-cream z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-primary text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingCart className="text-accent" /> Your Pot
            </h2>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <X size={28} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <span className="text-6xl mb-4">🍲</span>
                <h3 className="text-xl font-bold text-gray-900">Your pot is empty</h3>
                <p className="text-gray-500 mt-2">Add some delicious dishes to get started!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <p className="text-primary font-bold text-sm">₦{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center bg-gray-100 rounded-full px-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-primary"><Minus size={14} /></button>
                          <span className="px-3 font-bold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-primary"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-2xl font-bold text-primary">₦{getTotal().toLocaleString()}</span>
              </div>
              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="w-full bg-accent text-primary py-4 rounded-xl font-bold text-center block shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Checkout ₦{getTotal().toLocaleString()}
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
