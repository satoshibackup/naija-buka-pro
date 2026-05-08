import Link from 'next/link';
import { ChevronRight, Zap, ShieldCheck, CreditCard } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-[85vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Authentic Nigerian Jollof Rice"
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="max-w-3xl text-white">
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-md border border-accent/30 text-accent px-4 py-2 rounded-full text-sm font-bold mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            #1 IN LAGOS DELIVERY
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 drop-shadow-2xl">
            Hot Amala & <br />
            <span className="text-accent">Correct Soup</span> <br />
            in Lagos
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-xl font-medium opacity-90">
            Order authentic Naija dishes prepared by top local chefs. Delivered piping hot to your doorstep in 30 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#menu"
              className="bg-accent text-primary px-10 py-5 rounded-2xl text-lg font-extrabold flex items-center justify-center gap-2 hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl"
            >
              Order Now <ChevronRight size={24} />
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="absolute bottom-[-50px] left-4 right-4 max-w-5xl mx-auto hidden md:grid grid-cols-3 gap-6 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
              <Zap size={32} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">30min Delivery</h4>
              <p className="text-gray-500 text-sm">Express service across VI & Lekki</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-x border-gray-100 px-6">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">100% Fresh</h4>
              <p className="text-gray-500 text-sm">Made to order with local ingredients</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <CreditCard size={32} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">Card Payments</h4>
              <p className="text-gray-500 text-sm">Secure checkout via Paystack</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
