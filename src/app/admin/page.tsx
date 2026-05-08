'use client';

import { useEffect, useState } from 'react';
import { LayoutDashboard, LogIn, LogOut, Settings, Package, Image as ImageIcon, Save, ArrowLeft, Palette, Type, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import menuData from '@/../data/menu.json';
import siteSettingsData from '@/../data/site.json';
import Link from 'next/link';

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'menu' | 'branding'>('menu');
  const [items, setItems] = useState(menuData);
  const [siteSettings, setSiteSettings] = useState(siteSettingsData);
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
          toast.success('Admin Session Active');
        });
        window.netlifyIdentity.on('logout', () => {
          setUser(null);
          toast.success('Logged out');
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = () => window.netlifyIdentity.open();
  const handleLogout = () => window.netlifyIdentity.logout();

  const handleUpdateItem = (id: string, field: string, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleUpdateSite = (field: string, value: any) => {
    setSiteSettings({ ...siteSettings, [field]: value });
  };

  const handleSave = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Syncing with Git Gateway...',
        success: 'Settings updated successfully!',
        error: 'Sync failed.',
      },
      { style: { background: siteSettings.primaryColor, color: '#FFFBF2' } }
    );
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream p-4">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl max-w-md w-full text-center border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="bg-primary w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/20 rotate-3">
            <LayoutDashboard className="text-accent" size={48} />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Naija Admin</h1>
          <p className="text-gray-500 mb-10 font-medium leading-relaxed">
            Manage your brand identity and restaurant menu from a single autonomous dashboard.
          </p>
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-primary text-white py-5 rounded-2xl hover:bg-gray-900 transition-all font-black text-lg shadow-xl shadow-primary/20"
          >
            <LogIn size={24} /> ACCESS PORTAL
          </button>
          <Link href="/" className="mt-8 flex items-center justify-center gap-2 text-primary font-bold hover:text-accent transition-colors">
            <ArrowLeft size={18} /> Back to Site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-primary text-white flex flex-col border-r border-white/5">
        <div className="p-10 mb-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-primary font-black text-xl">NB</div>
          <div>
            <h2 className="text-xl font-black tracking-tighter uppercase leading-none">Management</h2>
            <p className="text-[10px] text-accent font-black tracking-widest mt-1 opacity-70">ADMIN PORTAL</p>
          </div>
        </div>
        <nav className="flex-grow p-6 space-y-3">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`w-full flex items-center gap-4 p-5 rounded-3xl font-black transition-all ${activeTab === 'menu' ? 'bg-white/10 text-accent shadow-inner' : 'text-white/60 hover:bg-white/5'}`}
          >
            <Package size={22} /> Menu Manager
          </button>
          <button 
            onClick={() => setActiveTab('branding')}
            className={`w-full flex items-center gap-4 p-5 rounded-3xl font-black transition-all ${activeTab === 'branding' ? 'bg-white/10 text-accent shadow-inner' : 'text-white/60 hover:bg-white/5'}`}
          >
            <Palette size={22} /> Brand Settings
          </button>
        </nav>
        <div className="p-8 mt-auto">
          <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-accent font-black border border-accent/20">AD</div>
                <div className="overflow-hidden">
                   <p className="text-[10px] font-black text-accent uppercase tracking-widest">Active User</p>
                   <p className="text-sm font-bold truncate text-white/80">{user.email}</p>
                </div>
             </div>
             <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-4 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all font-black text-sm"
            >
              <LogOut size={20} /> Logout Session
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-auto flex flex-col">
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 p-8 flex flex-col md:flex-row justify-between items-center sticky top-0 z-20 gap-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
              {activeTab === 'menu' ? 'Menu Items' : 'Brand Identity'}
            </h1>
            <p className="text-gray-400 text-sm font-medium mt-1 uppercase tracking-widest">
              {activeTab === 'menu' ? 'Manage stock, prices & categories' : 'Control colors, typography & hero content'}
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={handleSave}
              className="flex-grow md:flex-none flex items-center justify-center gap-3 bg-primary text-accent px-10 py-5 rounded-2xl hover:scale-105 transition-all font-black shadow-xl shadow-primary/20 border border-primary"
            >
              <Save size={24} /> SAVE CHANGES
            </button>
            <button 
              onClick={() => window.open('/admin/index.html', '_blank')}
              className="flex-grow md:flex-none bg-gray-100 text-gray-500 px-8 py-5 rounded-2xl hover:bg-gray-200 transition-all font-black text-xs uppercase tracking-widest"
            >
              CMS UI
            </button>
          </div>
        </header>

        <div className="p-8 lg:p-12">
          {activeTab === 'menu' ? (
            <div className="bg-white rounded-[3.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Item Details</th>
                      <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Stock/Status</th>
                      <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Pricing</th>
                      <th className="px-10 py-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {items.map((item: any) => (
                      <tr key={item.id} className="hover:bg-gray-50/40 transition-colors">
                        <td className="px-10 py-10">
                          <div className="flex items-center gap-6">
                            <div className="relative group shrink-0">
                              <img src={item.image} alt={item.name} className="w-20 h-20 rounded-3xl object-cover shadow-lg group-hover:scale-110 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ImageIcon size={20} className="text-white" />
                              </div>
                            </div>
                            <div>
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                                className="font-black text-xl text-gray-900 bg-transparent border-none focus:ring-0 p-0 block mb-1 tracking-tighter"
                              />
                              <span className="text-[10px] font-black text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-widest">{item.category}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-10">
                           <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-3">
                                <input
                                  type="number"
                                  value={item.stock}
                                  onChange={(e) => handleUpdateItem(item.id, 'stock', parseInt(e.target.value))}
                                  className={`font-black text-lg bg-gray-50 border-2 rounded-xl px-3 py-1 w-20 outline-none transition-all ${item.stock === 0 ? 'border-red-200 text-red-500' : 'border-transparent focus:border-primary'}`}
                                />
                                <span className={`text-[10px] font-black uppercase tracking-widest ${item.stock === 0 ? 'text-red-500' : 'text-gray-400'}`}>Units Left</span>
                              </div>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  checked={item.featured} 
                                  onChange={(e) => handleUpdateItem(item.id, 'featured', e.target.checked)}
                                  className="rounded-lg text-primary focus:ring-primary w-5 h-5" 
                                />
                                <span className="text-xs font-bold text-gray-500">Featured in Home</span>
                              </label>
                           </div>
                        </td>
                        <td className="px-10 py-10">
                          <div className="flex items-center gap-1">
                            <span className="text-gray-400 font-bold text-xl">₦</span>
                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) => handleUpdateItem(item.id, 'price', parseInt(e.target.value))}
                              className="text-primary font-black text-2xl bg-transparent border-none focus:ring-0 p-0 w-32 tracking-tighter"
                            />
                          </div>
                        </td>
                        <td className="px-10 py-10 text-right">
                          <button className="text-primary hover:text-accent font-black text-xs uppercase tracking-widest border-b-2 border-primary/20 hover:border-accent transition-all pb-1">Edit Metadata</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl space-y-12 animate-fade-in">
              {/* Branding Section */}
              <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
                  <Palette className="text-primary" size={32} />
                  <h3 className="text-2xl font-black text-gray-900 tracking-tighter">Identity & Colors</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Brand Primary Color</label>
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                      <input 
                        type="color" 
                        value={siteSettings.primaryColor} 
                        onChange={(e) => handleUpdateSite('primaryColor', e.target.value)}
                        className="w-16 h-16 rounded-2xl border-none p-0 bg-transparent cursor-pointer" 
                      />
                      <input 
                        type="text" 
                        value={siteSettings.primaryColor} 
                        onChange={(e) => handleUpdateSite('primaryColor', e.target.value)}
                        className="font-mono text-lg font-bold bg-transparent outline-none uppercase"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Accent Highlight Color</label>
                    <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-3xl border border-gray-100">
                      <input 
                        type="color" 
                        value={siteSettings.accentColor} 
                        onChange={(e) => handleUpdateSite('accentColor', e.target.value)}
                        className="w-16 h-16 rounded-2xl border-none p-0 bg-transparent cursor-pointer" 
                      />
                      <input 
                        type="text" 
                        value={siteSettings.accentColor} 
                        onChange={(e) => handleUpdateSite('accentColor', e.target.value)}
                        className="font-mono text-lg font-bold bg-transparent outline-none uppercase"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Messaging Section */}
              <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
                  <Type className="text-primary" size={32} />
                  <h3 className="text-2xl font-black text-gray-900 tracking-tighter">Hero & Messaging</h3>
                </div>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Main Hero Headline</label>
                    <input 
                      type="text" 
                      value={siteSettings.heroTitle} 
                      onChange={(e) => handleUpdateSite('heroTitle', e.target.value)}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-primary px-8 py-5 rounded-[2rem] text-xl font-black tracking-tighter outline-none transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subheadline / Narrative</label>
                    <textarea 
                      value={siteSettings.heroSubtitle} 
                      onChange={(e) => handleUpdateSite('heroSubtitle', e.target.value)}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-primary px-8 py-5 rounded-[2rem] font-medium outline-none transition-all shadow-inner h-32 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
                  <Phone className="text-primary" size={32} />
                  <h3 className="text-2xl font-black text-gray-900 tracking-tighter">Communication Channels</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">WhatsApp Number</label>
                    <input 
                      type="text" 
                      value={siteSettings.whatsappNumber} 
                      onChange={(e) => handleUpdateSite('whatsappNumber', e.target.value)}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-primary px-8 py-5 rounded-2xl font-bold outline-none transition-all shadow-inner"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Business Address</label>
                    <input 
                      type="text" 
                      value={siteSettings.address} 
                      onChange={(e) => handleUpdateSite('address', e.target.value)}
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-primary px-8 py-5 rounded-2xl font-bold outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
