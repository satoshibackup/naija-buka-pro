import menuData from '@/../data/menu.json';
import MenuCard from './MenuCard';

export default function MenuGrid() {
  return (
    <section id="menu" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Signature Dishes</h2>
          <p className="mt-4 text-xl text-gray-500">Traditional recipes with a modern touch.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuData.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
