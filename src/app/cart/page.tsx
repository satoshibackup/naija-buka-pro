'use client';

import { useCartStore } from '@/store/useCartStore';
import { Trash2, Plus, Minus, CreditCard, ArrowLeft } from 'lucide-react';
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
    amount: total * 100, // Paystack amount is in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = () => {
    toast.success('Order received! We’ll contact you');
    clearCart();
  };

  const onClose = () => {
    toast.error('Payment cancelled');
  };

  if (!mounted) return null;

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="bg-gray-100 p-8 rounded-full mb-6">
          <Trash2 size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          href="/" 
          className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-bold"
        >
          Go Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900">Your Order Summary</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="divide-y divide-gray-100">
          {cart.map((item) => (
            <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                <p className="text-primary font-bold">₦{item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 font-bold text-gray-900">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-2 hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600 text-lg">Total Amount</span>
            <span className="text-3xl font-extrabold text-gray-900">₦{total.toLocaleString()}</span>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address (for order confirmation)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          <button
            onClick={() => {
              if (!email) {
                toast.error('Please enter your email');
                return;
              }
              initializePayment({ onSuccess, onClose });
            }}
            className="w-full flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-xl hover:bg-green-700 transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <CreditCard size={24} /> Checkout with Paystack
          </button>
          
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <h4 className="text-sm font-bold text-yellow-800 mb-2 uppercase tracking-wider">Test Card Info:</h4>
            <code className="text-xs text-yellow-700 block">Number: 4084 0840 8408 4081</code>
            <code className="text-xs text-yellow-700 block">CVV: 123 | Exp: 12/30 | PIN: 0000</code>
          </div>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            Secure Payment Powered by Paystack
          </div>
        </div>
      </div>
    </div>
  );
}
