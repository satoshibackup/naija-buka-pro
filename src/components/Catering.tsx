'use client'
import site from '@/../data/site.json'

export default function Catering() {
  if (!site.cateringEnabled) return null
  
  return (
    <section className="my-16 px-4">
      <div className="container mx-auto">
        <div 
          className="relative rounded-3xl overflow-hidden py-20 px-6 text-center"
          style={{
            backgroundImage: `url(${site.cateringImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-primary/85" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {site.cateringTitle}
            </h2>
            <p className="text-accent text-lg mb-8 font-medium">
              {site.cateringText}
            </p>
            <a 
              href={site.cateringButtonLink}
              className="inline-block bg-accent text-primary px-8 py-4 rounded-full font-bold hover:scale-105 transition"
            >
              {site.cateringButtonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
