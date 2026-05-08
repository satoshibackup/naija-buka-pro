'use client';

import { MenuItem, useCartStore } from '@/store/useCartStore';
import { ShoppingCart, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MenuCard({ item }: { item: MenuItem }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      style: {
        border: '1px solid #16a34a',
        padding: '16px',
        color: '#16a34a',
      },
      iconTheme: {
        primary: '#16a34a',
        secondary: '#FFFAEE',
      },
    });
  };

  const handleWhatsAppShare = () => {
    const text = `Check out this delicious ${item.name} from Naija Buka Pro! Only ₦${item.price.toLocaleString()}. Order here: ${window.location.origin}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleWhatsAppShare}
            className="p-2 bg-white/90 rounded-full text-primary hover:bg-primary hover:text-white transition-colors shadow-sm"
            title="Share on WhatsApp"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
          <span className="text-primary font-bold">₦{item.price.toLocaleString()}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
