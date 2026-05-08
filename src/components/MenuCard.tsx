'use client';

import { useCartStore } from '@/store/useCartStore';
import { Plus, Share2, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MenuCard({ item }: { item: any }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const isSoldOut = item.stock === 0;

  const handleAddToCart = () => {
    if (isSoldOut) return;
    addToCart(item);
    toast.success(`${item.name} added to your pot!`, {
      style: {
        background: 'var(--primary)',
        color: '#FFFBF2',
        borderRadius: '16px',
        fontWeight: '800',
      },
      iconTheme: {
        primary: 'var(--accent)',
        secondary: 'var(--primary)',
      },
    });
  };

  const handleWhatsAppShare = () => {
    const text = `Check out this ${item.name} from Naija Buka Pro! Only ₦${item.price.toLocaleString()}. Order here: ${window.location.origin}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={`relative bg-white rounded-[3rem] shadow-2xl overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] transition-all duration-500 group border border-gray-100/50 flex flex-col ${isSoldOut ? 'opacity-75' : 'hover:-translate-y-4'}`}>
      
      {/* Category & Badges */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
        <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg border border-primary/5 flex items-center gap-1.5">
          <Tag size={10} className="text-accent" /> {item.category || 'Special'}
        </span>
        {isSoldOut && (
          <span className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg animate-pulse">
            Sold Out
          </span>
        )}
      </div>

      {/* Share Button */}
      <button
        onClick={handleWhatsAppShare}
        className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-primary shadow-xl hover:bg-accent transition-all scale-0 group-hover:scale-100 duration-300"
      >
        <Share2 size={20} />
      </button>

      {/* Image with Dynamic Gradient */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isSoldOut ? 'grayscale' : ''}`}
        />
        {!isSoldOut && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
             <span className="text-accent font-black text-xs uppercase tracking-widest mb-1">Chef's Choice</span>
             <p className="text-white text-sm font-medium leading-tight">Authentic recipe, fresh daily.</p>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-10 flex-grow flex flex-col bg-white">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl font-black text-gray-900 leading-none tracking-tighter">{item.name}</h3>
        </div>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-10 flex-grow font-medium">
          {item.description}
        </p>

        <div className="flex items-center justify-between gap-6 pt-6 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price</span>
            <span className="text-primary font-black text-3xl tracking-tighter">₦{item.price.toLocaleString()}</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isSoldOut}
            className={`px-8 py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl ${
              isSoldOut 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
              : 'bg-accent text-primary hover:bg-primary hover:text-accent shadow-accent/20 border border-accent/20'
            }`}
          >
            {isSoldOut ? 'RESTOCKING' : <><Plus size={24} /> ADD TO POT</>}
          </button>
        </div>
      </div>
    </div>
  );
}
