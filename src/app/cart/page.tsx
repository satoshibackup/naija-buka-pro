'use client';

import { useCartStore } from '@/store/useCartStore';
import { Trash2, Plus, Minus, CreditCard, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import { usePaystackPayment } from 'react-paystack';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = mounted ? getTotal() : 0;
  const config = {
    reference: (new Date()).getTime().toString(),
    email: email || 'customer@example.com',
    amount: total * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = () => {
    toast.success('Order received! Your food is being prepared.', {
      style: { background: '#0B4D2A', color: '#FFFBF2' }
    });
    clearCart();
  };

  const onClose = () => {
    toast.error('Payment cancelled');
  };

  if (!mounted) return null;

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-cream">
        <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center mb-8 border-2 border-dashed border-primary/20">
          <span className="text-6xl">🍲</span>
        </div>
        <h2 className="text-4xl font-black mb-4 text-gray-900">Your pot is empty</h2>
        <p className="text-gray-500 mb-10 max-w-sm text-center font-medium opacity-80">The fire is ready, but you haven't added anything to your order yet.</p>
        <Link 
          href="/#menu" 
          className="bg-primary text-accent px-12 py-5 rounded-2xl hover:scale-105 transition-all font-black shadow-2xl"
        >
          EXPLORE THE MENU
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Order List */}
          <div className="flex-grow">
            <div className="flex items-center gap-4 mb-10">
              <Link href="/" className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all">
                <ArrowLeft size={24} />
              </Link>
              <h1 className="text-4xl font-black text-gray-900">Your Order</h1>
            </div>

            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-all">
                  <div className="relative w-28 h-28 shrink-0 overflow-hidden rounded-2xl">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl font-extrabold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-primary font-black text-lg">₦{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl text-primary transition-all shadow-sm"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="px-5 font-black text-lg text-gray-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl text-primary transition-all shadow-sm"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="w-full md:w-[400px]">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 sticky top-28">
              <h2 className="text-2xl font-black text-gray-900 mb-8">Summary</h2>
              
              <div className="space-y-4 mb-8 pb-8 border-b border-gray-100">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-10">
                <span className="text-gray-900 font-bold text-lg">Total</span>
                <span className="text-3xl font-black text-primary tracking-tighter">₦{total.toLocaleString()}</span>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">
                  Delivery Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:bg-white outline-none transition-all font-medium text-gray-900"
                />
              </div>

              <button
                onClick={() => {
                  if (!email) {
                    toast.error('Please enter your email for delivery');
                    return;
                  }
                  initializePayment({ onSuccess, onClose });
                }}
                className="w-full flex items-center justify-center gap-3 bg-accent text-primary py-5 rounded-2xl hover:bg-primary hover:text-accent transition-all font-black text-lg shadow-xl shadow-accent/20"
              >
                <CreditCard size={24} /> PAY NOW
              </button>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <Truck size={18} className="text-primary" />
                  <span>Doorstep delivery in 30-45 mins</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <ShieldCheck size={18} className="text-primary" />
                  <span>Secure Paystack Checkout</span>
                </div>
              </div>

              {/* Test Card Info */}
              <div className="mt-8 p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                <h4 className="text-[10px] font-black text-yellow-800 mb-2 uppercase tracking-widest">Dev Test Card:</h4>
                <div className="font-mono text-xs text-yellow-700 space-y-1">
                  <p>4084 0840 8408 4081</p>
                  <p>CVV: 123 | PIN: 0000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
