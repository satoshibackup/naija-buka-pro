'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import siteSettings from '@/../data/site.json';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const [firstPart, ...rest] = siteSettings.heroTitle.split('&');
  const secondPart = rest.join('&');

  return (
    <div className="relative h-[80vh] md:h-[70vh] flex items-center overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="absolute inset-0 z-0 h-full w-full"
      >
        {siteSettings.heroImages.map((img, i) => (
          <SwiperSlide key={i}>
            <div 
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 tracking-normal">
            {firstPart} <span className="text-accent">& {secondPart.trim()}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-xl font-medium opacity-90">
            {siteSettings.heroSubtitle}
          </p>
          
          <Link
            href="#menu"
            className="inline-flex bg-accent text-primary px-8 py-4 rounded-xl text-lg font-bold items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-accent/20"
          >
            Order Now <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
