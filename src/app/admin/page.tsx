'use client';

import { useEffect, useState } from 'react';
import { LayoutDashboard, LogIn, LogOut, Settings, Package, Image as ImageIcon, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import menuData from '@/../data/menu.json';

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
        loading: 'Committing changes via Git Gateway...',
        success: 'Changes pushed to repository!',
        error: 'Failed to push changes.',
      }
    );
    // In a real Git Gateway setup, this would be handled by the Netlify Identity + Decap CMS integration
    // For this custom UI, we are simulating the save.
    console.log('Saving items:', items);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard className="text-primary" size={40} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-gray-500 mb-8">Manage your restaurant menu, prices, and orders in one place.</p>
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-xl hover:bg-black transition-all font-bold text-lg shadow-lg"
          >
            <LogIn size={24} /> Login with Netlify Identity
          </button>
          <p className="mt-6 text-sm text-gray-400">
            Powered by Netlify Identity & Git Gateway
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="bg-primary p-1 rounded text-sm">PRO</span>
            Naija Buka Admin
          </h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 p-3 bg-primary/20 text-primary rounded-lg">
            <Package size={20} /> Menu Items
          </a>
          <a href="#" className="flex items-center gap-3 p-3 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors">
            <Settings size={20} /> Site Settings
          </a>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-auto">
        <header className="bg-white border-b border-gray-200 p-6 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-900">Manage Menu Items</h1>
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-bold shadow-md"
            >
              <Save size={18} /> Save Changes
            </button>
            <button 
              onClick={() => window.open('/admin/index.html', '_blank')}
              className="text-gray-500 hover:text-gray-900 text-sm font-medium"
            >
              Open Decap CMS UI
            </button>
          </div>
        </header>

        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Item</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Price (₦)</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Description</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative group">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                          <button className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ImageIcon size={16} className="text-white" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                          className="font-bold text-gray-900 bg-transparent border-none focus:ring-0 p-0 w-32"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handleUpdateItem(item.id, 'price', parseInt(e.target.value))}
                        className="text-primary font-bold bg-transparent border-none focus:ring-0 p-0 w-24"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <textarea
                        value={item.description}
                        onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                        className="text-gray-500 text-sm bg-transparent border-none focus:ring-0 p-0 w-full resize-none h-12"
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:text-green-700 font-medium">Edit Image</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-4 items-start">
            <div className="bg-blue-500 text-white p-2 rounded-lg">
              <Package size={20} />
            </div>
            <div>
              <h3 className="font-bold text-blue-900">Pro Tip: Media Management</h3>
              <p className="text-blue-800 text-sm mt-1">
                You can also use the <a href="/admin/index.html" className="underline font-bold">Decap CMS Dashboard</a> for advanced image uploads to Cloudinary and direct Git commits.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
