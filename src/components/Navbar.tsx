'use client';

import Link from 'next/link';
import { ShoppingCart, User, Leaf, Menu as MenuIcon } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useEffect, useState } from 'react';
import siteSettings from '@/../data/site.json';

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-black text-accent flex items-center gap-3 tracking-tighter">
              <div className="bg-accent p-1.5 rounded-xl shadow-lg shadow-black/20">
                <Leaf className="text-primary fill-primary" size={24} />
              </div>
              <span className="uppercase">{siteSettings.brandName}</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <Link 
              href="/admin" 
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/90 rounded-xl transition-all flex items-center gap-2 text-sm font-bold border border-white/5 group"
            >
              <User size={18} className="group-hover:text-accent" />
              <span className="hidden sm:inline">Portal</span>
            </Link>
            
            <Link 
              href="/cart" 
              className="relative p-3 bg-accent/10 hover:bg-accent text-accent hover:text-primary rounded-xl transition-all duration-300 group shadow-inner"
            >
              <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 text-[10px] font-black leading-none text-primary transform bg-accent rounded-full border-2 border-primary shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button className="sm:hidden p-2 text-accent">
              <MenuIcon size={28} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
