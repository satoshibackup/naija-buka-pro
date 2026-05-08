'use client';

import { MenuItem, useCartStore } from '@/store/useCartStore';
import { Plus, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MenuCard({ item }: { item: any }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const isSoldOut = item.stock === 0;

  const handleAddToCart = () => {
    if (isSoldOut) return;
    addToCart(item);
    toast.success(`${item.name} added to your pot!`, {
      style: {
        background: '#0B4D2A',
        color: '#FFFBF2',
        borderRadius: '12px',
      },
      iconTheme: {
        primary: '#D4AF37',
        secondary: '#0B4D2A',
      },
    });
  };

  const handleWhatsAppShare = () => {
    const text = `Check out this ${item.name} from Naija Buka Pro! Only ₦${item.price.toLocaleString()}. Order here: ${window.location.origin}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={`relative bg-white rounded-[2rem] shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100/50 flex flex-col ${isSoldOut ? 'opacity-75 grayscale-[0.5]' : 'hover:-translate-y-2'}`}>
      {/* Sold Out Badge */}
      {isSoldOut && (
        <div className="absolute top-4 left-4 z-20 bg-red-600 text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
          Sold Out
        </div>
      )}

      {/* Share Button */}
      <button
        onClick={handleWhatsAppShare}
        className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-accent hover:text-primary transition-all scale-0 group-hover:scale-100"
      >
        <Share2 size={18} />
      </button>

      {/* Image Wrapper */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {!isSoldOut && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
             <p className="text-white text-xs font-medium translate-y-4 group-hover:translate-y-0 transition-transform">Perfectly prepared by our master chefs</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">{item.name}</h3>
          <span className="text-primary font-black text-xl tracking-tighter bg-accent/10 px-3 py-1 rounded-lg">₦{item.price.toLocaleString()}</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
          {item.description}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={isSoldOut}
          className={`w-full py-4 rounded-2xl font-extrabold flex items-center justify-center gap-3 transition-all shadow-md active:scale-95 ${
            isSoldOut 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-accent text-primary hover:bg-primary hover:text-accent shadow-accent/20'
          }`}
        >
          {isSoldOut ? 'Unavailable' : <><Plus size={20} /> Add to Pot</>}
        </button>
      </div>
    </div>
  );
}
