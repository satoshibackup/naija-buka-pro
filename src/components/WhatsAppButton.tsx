'use client';

import { MessageCircle } from 'lucide-react';
import siteSettings from '@/../data/site.json';

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(`Hi, I want to order from ${siteSettings.brandName}! Please let me know what's available today.`);
    window.open(`https://wa.me/${siteSettings.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-8 left-8 w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_20px_50px_rgba(37,211,102,0.4)] flex items-center justify-center z-40 hover:scale-110 transition-all active:scale-95 border-4 border-white animate-bounce-slow"
      title="Order via WhatsApp"
    >
      <MessageCircle size={32} />
    </button>
  );
}
