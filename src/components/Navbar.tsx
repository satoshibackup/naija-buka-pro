'use client';

import Link from 'next/link';
import { ShoppingCart, Menu as MenuIcon } from 'lucide-react';
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
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <span className="bg-primary text-white p-1 rounded">NB</span>
              <span className="hidden sm:inline">Naija Buka Pro</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/cart" 
              className="relative p-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="sm:hidden p-2 text-gray-600">
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
