'use client';

import Link from 'next/link';
import { ChevronRight, Zap, ShieldCheck, CreditCard } from 'lucide-react';
import siteSettings from '@/../data/site.json';

export default function Hero() {
  const [firstPart, ...rest] = siteSettings.heroTitle.split('&');
  const secondPart = rest.join('&');

  return (
    <div className="relative h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover"
          src={siteSettings.heroImage}
          alt={siteSettings.brandName}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold mb-6 border border-accent/20">
            BUSINESS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 tracking-normal">
            {firstPart} <span className="text-accent">& {secondPart.trim()}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl font-medium opacity-90">
            {siteSettings.heroSubtitle}
          </p>
          
          <Link
            href="#menu"
            className="inline-flex bg-accent text-primary px-8 py-4 rounded-xl text-lg font-bold items-center gap-2 hover:bg-white transition-all shadow-lg shadow-accent/20"
          >
            Order Now <ChevronRight size={20} />
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-[-40px] left-4 right-4 max-w-6xl mx-auto hidden lg:grid grid-cols-3 gap-8 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 z-20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">30min Delivery</h4>
              <p className="text-gray-500 text-xs">Fast & Reliable</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-x border-gray-100 px-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">100% Fresh</h4>
              <p className="text-gray-500 text-xs">Authentic Ingredients</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <CreditCard size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-base">Card Payments</h4>
              <p className="text-gray-500 text-xs">Secure Checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
