'use client';

import Link from 'next/link';
import { ChevronRight, Zap, ShieldCheck, CreditCard } from 'lucide-react';
import siteSettings from '@/../data/site.json';

export default function Hero() {
  return (
    <div className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Advanced Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover"
          src={siteSettings.heroImage}
          alt={siteSettings.brandName}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-4xl text-white">
          <div className="inline-flex items-center gap-3 bg-accent/20 backdrop-blur-xl border border-accent/30 text-accent px-5 py-2.5 rounded-2xl text-xs font-black mb-8 animate-fade-in tracking-widest shadow-2xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
            </span>
            PREMIUM LAGOS BUISNESS
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.95] mb-8 drop-shadow-2xl tracking-tighter italic">
            {siteSettings.heroTitle.split(' & ')[0]} <br />
            <span className="text-accent">& {siteSettings.heroTitle.split(' & ')[1]}</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl font-medium leading-relaxed opacity-95">
            {siteSettings.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              href="#menu"
              className="bg-accent text-primary px-12 py-6 rounded-[2rem] text-xl font-black flex items-center justify-center gap-3 hover:bg-white transition-all transform hover:-translate-y-2 shadow-[0_20px_50px_rgba(212,175,55,0.3)]"
            >
              ORDER NOW <ChevronRight size={28} />
            </Link>
          </div>
        </div>

        {/* Floating Stats Bar */}
        <div className="absolute bottom-[-60px] left-4 right-4 max-w-6xl mx-auto hidden lg:grid grid-cols-3 gap-10 bg-white p-12 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-gray-100 z-20">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-accent/10 rounded-3xl flex items-center justify-center text-accent shadow-inner">
              <Zap size={36} />
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-xl tracking-tight">30min Delivery</h4>
              <p className="text-gray-500 font-medium text-sm">VI, Lekki, Ikoyi & Environs</p>
            </div>
          </div>
          <div className="flex items-center gap-6 border-x border-gray-100 px-10">
            <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shadow-inner">
              <ShieldCheck size={36} />
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-xl tracking-tight">100% Fresh</h4>
              <p className="text-gray-500 font-medium text-sm">Farm to table ingredients</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 shadow-inner">
              <CreditCard size={36} />
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-xl tracking-tight">Card Payments</h4>
              <p className="text-gray-500 font-medium text-sm">Secure Paystack Checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
