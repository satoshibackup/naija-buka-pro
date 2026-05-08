import menuData from '@/../data/menu.json';
import MenuCard from './MenuCard';

export default function MenuGrid() {
  return (
    <section id="menu" className="py-24 bg-cream scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-accent font-bold tracking-[0.3em] uppercase text-sm mb-4">The Selection</div>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">Our Signature Dishes</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 font-medium opacity-80">
            Handpicked recipes passed down through generations, reimagined for the modern Lagosian.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {menuData.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 font-medium italic">
            All dishes served with a choice of sides and a complimentary chilled drink.
          </p>
        </div>
      </div>
    </section>
  );
}
