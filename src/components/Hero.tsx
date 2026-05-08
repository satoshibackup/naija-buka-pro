'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import siteSettings from '@/../data/site.json';

export default function Hero() {
  const [firstPart, ...rest] = siteSettings.heroTitle.split('&');
  const secondPart = rest.join('&');

  return (
    <div className="relative h-[70vh] flex items-center overflow-hidden">
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
      </div>
    </div>
  );
}
