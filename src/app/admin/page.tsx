'use client';

import { useEffect, useState } from 'react';
import { LayoutDashboard, LogIn, LogOut, Package, Image as ImageIcon, Save, ArrowLeft, Palette, Type, Phone, Share2, Info, Truck } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'menu' | 'branding' | 'delivery'>('menu');
  const [items, setItems] = useState(menuData);
  const [siteSettings, setSiteSettings] = useState<any>(siteSettingsData);
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
      { style: { background: siteSettings.primaryColor, color: '#FFFBF2', fontWeight: 'bold' } }
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
        <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="bg-primary w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/20 rotate-3 text-accent">
            <LayoutDashboard size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Naija Admin</h1>
          <p className="text-gray-500 mb-10 font-medium leading-relaxed text-sm">
            Manage your brand identity and restaurant menu from a single autonomous dashboard.
          </p>
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-xl hover:bg-gray-900 transition-all font-bold text-lg shadow-xl shadow-primary/20"
          >
            <LogIn size={20} /> ACCESS PORTAL
          </button>
          <Link href="/" className="mt-8 flex items-center justify-center gap-2 text-primary font-bold hover:text-accent transition-colors text-sm">
            <ArrowLeft size={16} /> Back to Site
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
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary font-bold text-lg">NB</div>
          <div>
            <h2 className="text-lg font-bold tracking-tight leading-none">Management</h2>
            <p className="text-[10px] text-accent font-bold tracking-widest mt-1 opacity-70">ADMIN PORTAL</p>
          </div>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('menu')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all text-sm ${activeTab === 'menu' ? 'bg-white/10 text-accent' : 'text-white/60 hover:bg-white/5'}`}
          >
            <Package size={20} /> Menu Manager
          </button>
          <button 
            onClick={() => setActiveTab('branding')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all text-sm ${activeTab === 'branding' ? 'bg-white/10 text-accent' : 'text-white/60 hover:bg-white/5'}`}
          >
            <Palette size={20} /> Brand Settings
          </button>
          <button 
            onClick={() => setActiveTab('delivery')}
            className={`w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all text-sm ${activeTab === 'delivery' ? 'bg-white/10 text-accent' : 'text-white/60 hover:bg-white/5'}`}
          >
            <Truck size={20} /> Delivery Logic
          </button>
        </nav>
        <div className="p-6 mt-auto">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent font-bold border border-accent/20 text-xs">AD</div>
                <div className="overflow-hidden">
                   <p className="text-[10px] font-bold text-accent uppercase tracking-widest opacity-70">Active User</p>
                   <p className="text-xs font-bold truncate text-white/80">{user.email}</p>
                </div>
             </div>
             <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold text-xs"
            >
              <LogOut size={16} /> Logout Session
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-auto flex flex-col">
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 p-6 flex flex-col md:flex-row justify-between items-center sticky top-0 z-20 gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight capitalize">
              {activeTab === 'menu' ? 'Menu Items' : activeTab === 'branding' ? 'Brand Identity' : 'Delivery Settings'}
            </h1>
            <p className="text-gray-400 text-xs font-bold mt-1 uppercase tracking-widest">
              {activeTab === 'menu' ? 'Manage stock, prices & categories' : activeTab === 'branding' ? 'Control colors, socials & about content' : 'Configure how you charge for logistics'}
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={handleSave}
              className="flex-grow md:flex-none flex items-center justify-center gap-2 bg-primary text-accent px-8 py-4 rounded-xl hover:scale-105 transition-all font-bold shadow-lg shadow-primary/10 border border-primary text-sm"
            >
              <Save size={20} /> SAVE CHANGES
            </button>
          </div>
        </header>

        <div className="p-6 lg:p-10">
          {activeTab === 'menu' && (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Item Details</th>
                      <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Stock/Status</th>
                      <th className="px-6 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Pricing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {items.map((item: any) => (
                      <tr key={item.id} className="hover:bg-gray-50/40 transition-colors">
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                            <div>
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                                className="font-bold text-base text-gray-900 bg-transparent border-none focus:ring-0 p-0 block mb-0.5 tracking-tight"
                              />
                              <span className="text-[10px] font-bold text-accent bg-accent/5 px-2 py-0.5 rounded-full uppercase tracking-widest">{item.category}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                           <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  value={item.stock}
                                  onChange={(e) => handleUpdateItem(item.id, 'stock', parseInt(e.target.value))}
                                  className={`font-bold text-sm bg-gray-50 border-2 rounded-lg px-2 py-1 w-16 outline-none transition-all ${item.stock === 0 ? 'border-red-200 text-red-500' : 'border-transparent focus:border-primary'}`}
                                />
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${item.stock === 0 ? 'text-red-500' : 'text-gray-400'}`}>Units</span>
                              </div>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  checked={item.featured} 
                                  onChange={(e) => handleUpdateItem(item.id, 'featured', e.target.checked)}
                                  className="rounded text-primary focus:ring-primary w-4 h-4" 
                                />
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Featured</span>
                              </label>
                           </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-1">
                            <span className="text-gray-400 font-bold text-sm">₦</span>
                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) => handleUpdateItem(item.id, 'price', parseInt(e.target.value))}
                              className="text-primary font-bold text-xl bg-transparent border-none focus:ring-0 p-0 w-24 tracking-tight"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="max-w-4xl space-y-8 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
                  <Palette className="text-primary" size={24} />
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">Identity & Colors</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary Color</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                      <input 
                        type="color" 
                        value={siteSettings.primaryColor} 
                        onChange={(e) => handleUpdateSite('primaryColor', e.target.value)}
                        className="w-10 h-10 rounded-lg border-none p-0 bg-transparent cursor-pointer" 
                      />
                      <input 
                        type="text" 
                        value={siteSettings.primaryColor} 
                        onChange={(e) => handleUpdateSite('primaryColor', e.target.value)}
                        className="font-mono text-sm font-bold bg-transparent outline-none uppercase"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Accent Color</label>
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                      <input 
                        type="color" 
                        value={siteSettings.accentColor} 
                        onChange={(e) => handleUpdateSite('accentColor', e.target.value)}
                        className="w-10 h-10 rounded-lg border-none p-0 bg-transparent cursor-pointer" 
                      />
                      <input 
                        type="text" 
                        value={siteSettings.accentColor} 
                        onChange={(e) => handleUpdateSite('accentColor', e.target.value)}
                        className="font-mono text-sm font-bold bg-transparent outline-none uppercase"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
                  <Share2 className="text-primary" size={24} />
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">Social Media Links</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['instagram', 'facebook', 'twitter', 'tiktok'].map((social) => (
                    <div key={social} className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest capitalize">{social} URL</label>
                      <input 
                        type="text" 
                        value={siteSettings[social as keyof any] || ''} 
                        onChange={(e) => handleUpdateSite(social, e.target.value)}
                        placeholder={`https://${social}.com/...`}
                        className="w-full bg-gray-50 border border-transparent focus:border-primary px-4 py-3 rounded-xl font-medium outline-none transition-all text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
                  <Info className="text-primary" size={24} />
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">About Us Content</h3>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">About Title</label>
                    <input 
                      type="text" 
                      value={siteSettings.aboutTitle} 
                      onChange={(e) => handleUpdateSite('aboutTitle', e.target.value)}
                      className="w-full bg-gray-50 border border-transparent focus:border-primary px-4 py-3 rounded-xl font-bold outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">About Narrative</label>
                    <textarea 
                      value={siteSettings.aboutText} 
                      onChange={(e) => handleUpdateSite('aboutText', e.target.value)}
                      className="w-full bg-gray-50 border border-transparent focus:border-primary px-4 py-3 rounded-xl font-medium outline-none transition-all text-sm h-32 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="max-w-4xl space-y-8 animate-fade-in">
               <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-50">
                  <Truck className="text-primary" size={24} />
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">Delivery Mode</h3>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {label: 'Flat Fee', value: 'flat', desc: 'Charge a set amount'},
                      {label: 'Free', value: 'free', desc: 'No delivery charge'},
                      {label: 'Custom', value: 'custom', desc: 'Manual confirmation'}
                    ].map((mode) => (
                      <button
                        key={mode.value}
                        onClick={() => handleUpdateSite('deliveryMode', mode.value)}
                        className={`p-6 rounded-2xl border-2 transition-all text-left group ${siteSettings.deliveryMode === mode.value ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-primary/20'}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${siteSettings.deliveryMode === mode.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>
                          <Truck size={20} />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-1">{mode.label}</h4>
                        <p className="text-xs text-gray-500 font-medium">{mode.desc}</p>
                      </button>
                    ))}
                  </div>

                  {siteSettings.deliveryMode === 'flat' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 animate-fade-in">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Flat Delivery Fee (₦)</label>
                        <input 
                          type="number" 
                          value={siteSettings.deliveryFlatFee} 
                          onChange={(e) => handleUpdateSite('deliveryFlatFee', parseInt(e.target.value))}
                          className="w-full bg-gray-50 border border-transparent focus:border-primary px-4 py-3 rounded-xl font-bold outline-none transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Free Delivery Above (₦)</label>
                        <input 
                          type="number" 
                          value={siteSettings.deliveryFreeThreshold} 
                          onChange={(e) => handleUpdateSite('deliveryFreeThreshold', parseInt(e.target.value))}
                          placeholder="0 = disabled"
                          className="w-full bg-gray-50 border border-transparent focus:border-primary px-4 py-3 rounded-xl font-bold outline-none transition-all text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {siteSettings.deliveryMode === 'custom' && (
                    <div className="space-y-2 pt-6 animate-fade-in">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Custom Delivery Rules Text</label>
                      <textarea 
                        value={siteSettings.deliveryCustomText} 
                        onChange={(e) => handleUpdateSite('deliveryCustomText', e.target.value)}
                        placeholder="e.g. Within Lagos ₦1,000 | Outside ₦2,000 | Pickup Free"
                        className="w-full bg-gray-50 border border-transparent focus:border-primary px-4 py-3 rounded-xl font-medium outline-none transition-all text-sm h-32 resize-none"
                      />
                    </div>
                  )}

                  <div className="space-y-2 pt-6 border-t border-gray-50">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Covered Delivery Areas</label>
                    <input 
                      type="text" 
                      value={siteSettings.deliveryAreas} 
                      onChange={(e) => handleUpdateSite('deliveryAreas', e.target.value)}
                      placeholder="e.g. Yaba, Surulere, Ikeja, Lekki Phase 1"
                      className="w-full bg-gray-50 border border-transparent focus:border-primary px-4 py-3 rounded-xl font-bold outline-none transition-all text-sm"
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
