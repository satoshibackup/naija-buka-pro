'use client';

import { FaWhatsapp } from 'react-icons/fa';
import siteSettings from '@/../data/site.json';

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(`Hi, I want to order from ${siteSettings.brandName}!`);
    window.open(`https://wa.me/${siteSettings.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-8 left-8 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-110 transition-all border-4 border-white"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp size={24} />
    </button>
  );
}
