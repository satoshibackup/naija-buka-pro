'use client';

import { useCartStore } from '@/store/useCartStore';
import { Plus, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MenuCard({ item }: { item: any }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const isSoldOut = item.stock === 0;

  const handleAddToCart = () => {
    if (isSoldOut) return;
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      style: {
        background: 'var(--primary)',
        color: '#FFFBF2',
        borderRadius: '12px',
        fontWeight: 'bold',
      },
    });
  };

  return (
    <div className={`bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 transition-all ${isSoldOut ? 'opacity-75' : 'hover:-translate-y-2'}`}>
      <div className="relative aspect-[4/3]">
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover ${isSoldOut ? 'grayscale' : ''}`}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-white/90 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1 shadow-sm">
            <Tag size={10} className="text-accent" /> {item.category || 'Special'}
          </span>
          {isSoldOut && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-sm">
              Sold Out
            </span>
          )}
        </div>
      </div>

      <div className="p-4"> {/* Reduced padding p-4 not p-6 */}
        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
        <p className="text-gray-500 text-xs mb-6 line-clamp-2 min-h-[2.5rem]">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <span className="text-primary font-bold text-xl">₦{item.price.toLocaleString()}</span>
          <button
            onClick={handleAddToCart}
            disabled={isSoldOut}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isSoldOut 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-accent text-primary hover:bg-primary hover:text-accent shadow-md'
            }`}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
