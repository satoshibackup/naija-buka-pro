import menuData from '@/../data/menu.json';
import MenuCard from './MenuCard';

export default function MenuGrid() {
  const featuredItems = menuData.filter(item => item.featured);
  const otherItems = menuData.filter(item => !item.featured);

  return (
    <section id="menu" className="py-32 bg-cream scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="text-accent font-black tracking-[0.4em] uppercase text-xs mb-4">The Collection</div>
          <h2 className="text-5xl md:text-6xl font-black text-primary mb-6 tracking-tighter">Our Signature Dishes</h2>
          <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-8"></div>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 font-medium opacity-70 leading-relaxed">
            Handpicked recipes passed down through generations, reimagined for the modern Lagosian.
          </p>
        </div>
        
        {/* Featured Section */}
        {featuredItems.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl font-black text-primary/40 uppercase tracking-[0.2em] mb-10 text-center">Featured Favorites</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
              {featuredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Full Grid Section */}
        {otherItems.length > 0 && (
          <div>
            <h3 className="text-2xl font-black text-primary/40 uppercase tracking-[0.2em] mb-10 text-center">Daily Specials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {otherItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-32 p-16 bg-primary rounded-[4rem] text-center relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
          <h3 className="text-4xl font-black text-white mb-6 relative z-10 tracking-tighter">Planning a Party?</h3>
          <p className="text-accent font-bold text-xl mb-10 relative z-10 max-w-lg mx-auto leading-relaxed">
            We handle bulk orders for weddings, birthdays, and corporate events with the same "Mama Nkechi" touch.
          </p>
          <a
            href="https://wa.me/234800NAIJABUKA"
            className="inline-flex bg-accent text-primary px-12 py-5 rounded-2xl font-black text-lg hover:bg-white transition-all relative z-10"
          >
            GET A CUSTOM QUOTE
          </a>
        </div>
      </div>
    </section>
  );
}
