'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Hi, I want to order from Naija Buka Pro! Please let me know what's available today.");
    window.open(`https://wa.me/234800NAIJABUKA?text=${text}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 left-6 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-110 transition-transform active:scale-95 animate-bounce-slow"
      title="Order via WhatsApp"
    >
      <MessageCircle size={32} />
    </button>
  );
}
