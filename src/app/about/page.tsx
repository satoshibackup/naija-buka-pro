import siteSettings from '@/../data/site.json';

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Page Header */}
      <div className="bg-primary py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Story</h1>
        <p className="text-accent font-medium uppercase tracking-widest text-sm">Authentically Nigerian</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-accent/20 rounded-3xl group-hover:-inset-6 transition-all duration-500"></div>
            <img 
              src={siteSettings.aboutImage} 
              alt={siteSettings.brandName}
              className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl"
            />
          </div>

          {/* Text */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              {siteSettings.aboutTitle}
            </h2>
            <div className="w-20 h-1.5 bg-accent rounded-full"></div>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              {siteSettings.aboutText}
            </p>
            <p className="text-gray-500 leading-relaxed">
              At {siteSettings.brandName}, we don't just serve food; we serve memories. Every plate of Jollof, every bowl of Egusi, and every stick of Suya is a testament to our commitment to quality and tradition. We source our ingredients directly from local farmers to ensure that every bite is as fresh as the Lagos morning air.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <h4 className="text-3xl font-black text-primary mb-2">14+</h4>
                <p className="text-gray-500 font-bold uppercase text-xs">Years of Flavor</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-primary mb-2">50k+</h4>
                <p className="text-gray-500 font-bold uppercase text-xs">Happy Foodies</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Authenticity', text: 'Traditional recipes, no shortcuts.' },
              { title: 'Community', text: 'Supporting local farmers and families.' },
              { title: 'Quality', text: 'Only the freshest ingredients in our pots.' }
            ].map((value, i) => (
              <div key={i} className="p-8 bg-cream rounded-3xl border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-4">{value.title}</h3>
                <p className="text-gray-500 font-medium">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
