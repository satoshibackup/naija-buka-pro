'use client';

import dynamic from 'next/dynamic';

const CartContent = dynamic(() => import('@/components/CartContent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  ),
});

export default function CartPage() {
  return <CartContent />;
}
