'use client';

import { useCartStore } from '@/store/useCartStore';
import { Trash2, Plus, Minus, CreditCard, ArrowLeft, ShieldCheck, Truck, User, Phone, MapPin, FileText, Info } from 'lucide-react';
import Link from 'next/link';
import { usePaystackPayment } from 'react-paystack';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import siteSettings from '@/../data/site.json';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  // Checkout Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = mounted ? getTotal() : 0;
  
  // Delivery Logic
  let deliveryFee = 0;
  let deliveryLabel = "Delivery";
  let isCustomDelivery = false;

  if (mounted) {
    if (siteSettings.deliveryMode === "flat") {
      const threshold = siteSettings.deliveryFreeThreshold || 0;
      const isFree = threshold > 0 && subtotal >= threshold;
      deliveryFee = isFree ? 0 : (siteSettings.deliveryFlatFee || 0);
      deliveryLabel = deliveryFee === 0 ? "Delivery: Free" : `Delivery: ₦${deliveryFee.toLocaleString()}`;
    } 
    else if (siteSettings.deliveryMode === "free") {
      deliveryFee = 0;
      deliveryLabel = "Delivery: Free";
    }
    else if (siteSettings.deliveryMode === "custom") {
      deliveryFee = 0;
      isCustomDelivery = true;
      deliveryLabel = "Delivery: TBD";
    }
  }

  const total = subtotal + deliveryFee;
  
  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.email || 'guest@naijabuka.com',
    amount: total * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = () => {
    toast.success('Order received! We will contact you shortly.', {
      style: { background: 'var(--primary)', color: '#FFFBF2', fontWeight: 'bold' }
    });
    clearCart();
  };

  const onClose = () => {
    toast.error('Payment was not completed');
  };

  if (!mounted) return null;

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-cream">
        <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center mb-8 border-2 border-dashed border-primary/20">
          <span className="text-6xl">🍲</span>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Your pot is empty</h2>
        <p className="text-gray-500 mb-10 max-w-sm text-center font-medium opacity-80">The fire is ready, but you haven't added anything to your order yet.</p>
        <Link 
          href="/#menu" 
          className="bg-primary text-accent px-10 py-4 rounded-xl hover:scale-105 transition-all font-bold shadow-xl"
        >
          VIEW MENU
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Order List */}
          <div className="flex-grow">
            <div className="flex items-center gap-4 mb-10">
              <Link href="/" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all">
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Your Order</h1>
            </div>

            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-xl">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-primary font-bold text-lg">₦{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg text-primary transition-all shadow-sm"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 font-bold text-gray-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-xl text-primary transition-all shadow-sm"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 p-2 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Form */}
          <div className="w-full lg:w-[450px]">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Checkout Details</h2>
              
              <div className="space-y-6 mb-8">
                {/* Guest Info */}
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium text-sm"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-5 text-gray-400" size={18} />
                    <textarea
                      placeholder="Delivery Address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium h-24 resize-none text-sm"
                    />
                  </div>
                  <div className="relative">
                    <FileText className="absolute left-4 top-5 text-gray-400" size={18} />
                    <textarea
                      placeholder="Order Notes (Optional)"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-medium h-20 resize-none text-sm"
                    />
                  </div>
                </div>

                {/* Delivery Info Box */}
                {isCustomDelivery && (
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex gap-3">
                    <Info className="text-primary shrink-0" size={18} />
                    <div className="text-xs text-gray-600 leading-relaxed font-medium">
                      <p className="font-bold text-primary mb-1 uppercase tracking-wider">Custom Delivery Rules:</p>
                      {siteSettings.deliveryCustomText}
                      <p className="mt-2 text-[10px] italic opacity-75">* Final delivery cost will be confirmed via WhatsApp after order.</p>
                    </div>
                  </div>
                )}
                
                {siteSettings.deliveryAreas && (
                  <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
                    <Truck size={14} className="text-gray-400" />
                    <p className="text-[10px] text-gray-500 font-bold uppercase truncate">Areas: {siteSettings.deliveryAreas}</p>
                  </div>
                )}

                <div className="pt-6 border-t border-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 font-medium">Subtotal</span>
                    <span className="text-gray-900 font-bold">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-500 font-medium">{isCustomDelivery ? "Delivery (TBD)" : "Delivery"}</span>
                    <span className={`font-bold ${deliveryFee === 0 && !isCustomDelivery ? "text-green-600" : "text-gray-900"}`}>
                      {isCustomDelivery ? "WhatsApp" : deliveryFee === 0 ? "FREE" : `₦${deliveryFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-black text-primary">₦{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!formData.name || !formData.phone || !formData.address) {
                    toast.error('Please fill in all delivery details');
                    return;
                  }
                  initializePayment({ onSuccess, onClose });
                }}
                className="w-full flex items-center justify-center gap-3 bg-accent text-primary py-5 rounded-2xl hover:bg-primary hover:text-accent transition-all font-bold text-lg shadow-lg shadow-accent/10"
              >
                <CreditCard size={24} /> PAY {isCustomDelivery ? "SUBTOTAL" : "WITH PAYSTACK"}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
