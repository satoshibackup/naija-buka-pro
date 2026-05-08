'use client';

import { useEffect, useState } from 'react';
import { LayoutDashboard, LogIn, LogOut, Settings, Package, Image as ImageIcon, Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import menuData from '@/../data/menu.json';
import Link from 'next/link';

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [items, setItems] = useState(menuData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on('init', (user: any) => {
          setUser(user);
          setLoading(false);
        });
        window.netlifyIdentity.on('login', (user: any) => {
          setUser(user);
          window.netlifyIdentity.close();
          toast.success('Welcome back, Admin!');
        });
        window.netlifyIdentity.on('logout', () => {
          setUser(null);
          toast.success('Logged out successfully');
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = () => {
    window.netlifyIdentity.open();
  };

  const handleLogout = () => {
    window.netlifyIdentity.logout();
  };

  const handleUpdateItem = (id: string, field: string, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSave = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Syncing with Git Gateway...',
        success: 'CMS updated successfully!',
        error: 'Sync failed.',
      },
      {
        style: { background: '#0B4D2A', color: '#FFFBF2' }
      }
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream p-4">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center border border-gray-100 relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="bg-primary w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/20 rotate-3">
            <LayoutDashboard className="text-accent" size={48} />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Admin Portal</h1>
          <p className="text-gray-500 mb-10 font-medium leading-relaxed">
            Authorized personnel only. Manage your premium restaurant operations here.
          </p>
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-primary text-white py-5 rounded-2xl hover:bg-gray-900 transition-all font-black text-lg shadow-xl shadow-primary/20 group"
          >
            <LogIn size={24} className="group-hover:translate-x-1 transition-transform" /> START SESSION
          </button>
          
          <Link href="/" className="mt-8 flex items-center justify-center gap-2 text-primary font-bold hover:text-accent transition-colors">
            <ArrowLeft size={18} /> Back to Site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="w-72 bg-primary text-white hidden lg:flex flex-col border-r border-white/5">
        <div className="p-8 mb-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary font-black">NB</div>
             <h2 className="text-xl font-black tracking-tighter">MANAGEMENT</h2>
          </div>
        </div>
        <nav className="flex-grow p-6 space-y-4">
          <a href="#" className="flex items-center gap-4 p-4 bg-white/10 text-accent rounded-2xl font-bold shadow-inner">
            <Package size={22} /> Menu Manager
          </a>
          <a href="#" className="flex items-center gap-4 p-4 text-white/60 hover:bg-white/5 rounded-2xl font-bold transition-all">
            <Settings size={22} /> Operations
          </a>
        </nav>
        <div className="p-6 mt-auto">
          <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                <div>
                   <p className="text-xs font-bold text-accent uppercase tracking-widest">Admin</p>
                   <p className="text-sm font-bold truncate max-w-[120px]">{user.email}</p>
                </div>
             </div>
             <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold text-sm"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-auto">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 p-8 flex flex-col md:flex-row justify-between items-center sticky top-0 z-20 gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Menu Items</h1>
            <p className="text-gray-400 text-sm font-medium">Update prices, stock and descriptions in real-time.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={handleSave}
              className="flex-grow md:flex-none flex items-center justify-center gap-2 bg-primary text-accent px-8 py-4 rounded-2xl hover:scale-105 transition-all font-black shadow-xl shadow-primary/10"
            >
              <Save size={20} /> SYNC CHANGES
            </button>
            <button 
              onClick={() => window.open('/admin/index.html', '_blank')}
              className="flex-grow md:flex-none bg-gray-100 text-gray-600 px-8 py-4 rounded-2xl hover:bg-gray-200 transition-all font-bold text-sm"
            >
              FULL CMS
            </button>
          </div>
        </header>

        <div className="p-8 lg:p-12">
          <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Product</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Price (₦)</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Details</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Media</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {items.map((item: any) => (
                    <tr key={item.id} className="hover:bg-gray-50/30 transition-colors group">
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-6">
                          <div className="relative shrink-0">
                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                            <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full border-2 border-white ${item.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          </div>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                            className="font-black text-lg text-gray-900 bg-transparent border-none focus:ring-0 p-0 w-48"
                          />
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2 border border-transparent focus-within:border-accent transition-all">
                          <span className="text-gray-400 font-bold mr-1">₦</span>
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => handleUpdateItem(item.id, 'price', parseInt(e.target.value))}
                            className="text-primary font-black bg-transparent border-none focus:ring-0 p-0 w-24"
                          />
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <textarea
                          value={item.description}
                          onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                          className="text-gray-500 text-sm bg-transparent border-none focus:ring-0 p-0 w-full resize-none h-16 font-medium leading-relaxed"
                        />
                      </td>
                      <td className="px-8 py-8 text-right">
                        <button className="bg-primary/5 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl text-xs font-black transition-all">
                          REPLACE IMAGE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
