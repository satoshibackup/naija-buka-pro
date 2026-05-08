'use client';

import Link from 'next/link';
import { ShoppingCart, Leaf, Menu as MenuIcon, X } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useEffect, useState } from 'react';
import siteSettings from '@/../data/site.json';
import CartSlider from '@/components/CartSlider';

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = mounted ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/#menu' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '#footer' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-primary shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-black text-accent flex items-center gap-2">
                {siteSettings.logo && siteSettings.logo !== "" ? (
                  <img src={siteSettings.logo} alt={siteSettings.brandName} className="h-10 w-auto object-contain" />
                ) : (
                  <>
                    <Leaf className="text-accent fill-accent" size={24} />
                    <span className="uppercase tracking-tighter">{siteSettings.brandName}</span>
                  </>
                )}
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-white/80 hover:text-accent font-bold text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-accent hover:scale-110 transition-transform"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-black text-primary bg-accent rounded-full border-2 border-primary">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-accent"
              >
                {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-primary border-t border-white/5 p-6 animate-fade-in">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-lg font-bold"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      <CartSlider open={isCartOpen} setOpen={setIsCartOpen} />
    </>
  );
}
