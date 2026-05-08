'use client';

import Link from 'next/link';
import { ShoppingCart, User, Leaf, Menu as MenuIcon } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-extrabold text-accent flex items-center gap-2 tracking-tighter">
              <Leaf className="text-accent fill-accent" size={28} />
              <span>NAIJA BUKA PRO</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <Link 
              href="/admin" 
              className="p-2 text-white/80 hover:text-accent transition-colors flex items-center gap-2 text-sm font-medium"
              title="Admin Login"
            >
              <User size={20} />
              <span className="hidden sm:inline">Portal</span>
            </Link>
            
            <Link 
              href="/cart" 
              className="relative p-2 text-white/80 hover:text-accent transition-all hover:scale-110"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primary transform translate-x-1/2 -translate-y-1/2 bg-accent rounded-full border-2 border-primary">
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
