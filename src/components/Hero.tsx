'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import site from '@/../data/site.json'

export default function Hero() {
  return (
    <div className="relative h-screen w-full">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        {site.heroImages.map((img, i) => (
          <SwiperSlide key={i}>
            <div 
              className="h-full w-full bg-cover bg-center"
              style={{backgroundImage: `url(${img})`}}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      {/* Centered content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            {site.heroTitle}
            <span className="text-accent"> Correct Soup</span> in Lagos
          </h1>
          <p className="text-lg md:text-xl text-white/90 mt-6 max-w-2xl mx-auto">
            {site.heroSubtitle}
          </p>
          <a 
            href="#menu" 
            className="mt-8 inline-block bg-accent text-primary px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition"
          >
            Order Now
          </a>
        </div>
      </div>
    </div>
  )
}
