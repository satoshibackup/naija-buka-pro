import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import FloatingCart from "@/components/FloatingCart";
import WhatsAppButton from "@/components/WhatsAppButton";
import siteSettings from "@/../data/site.json";
import { FaInstagram, FaFacebook, FaTwitter, FaTiktok } from 'react-icons/fa';

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700", "800"],
  variable: '--font-poppins'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: `${siteSettings.brandName} - Authentic Nigerian Cuisine`,
  description: siteSettings.heroSubtitle,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary: ${siteSettings.primaryColor};
            --accent: ${siteSettings.accentColor};
          }
        `}} />
      </head>
      <body className="bg-cream font-sans min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        
        <footer id="footer" className="bg-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-accent mb-6">
                {siteSettings.brandName}
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-sm mb-8">
                {siteSettings.heroSubtitle}
              </p>
              <div className="flex gap-4">
                {siteSettings.instagram && (
                  <a href={siteSettings.instagram} target="_blank" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-all text-white">
                    <FaInstagram size={20} />
                  </a>
                )}
                {siteSettings.facebook && (
                  <a href={siteSettings.facebook} target="_blank" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-all text-white">
                    <FaFacebook size={20} />
                  </a>
                )}
                {siteSettings.twitter && (
                  <a href={siteSettings.twitter} target="_blank" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-all text-white">
                    <FaTwitter size={20} />
                  </a>
                )}
                {siteSettings.tiktok && (
                  <a href={siteSettings.tiktok} target="_blank" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-all text-white">
                    <FaTiktok size={20} />
                  </a>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-4 text-gray-300 font-medium">
                <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
                <li><a href="/#menu" className="hover:text-accent transition-colors">Our Menu</a></li>
                <li><a href="/about" className="hover:text-accent transition-colors">Our Story</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
              <p className="text-gray-300 mb-2">{siteSettings.address}</p>
              <p className="text-accent font-bold mb-4">{siteSettings.whatsappNumber}</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
            © 2026 {siteSettings.brandName}. All rights reserved.
          </div>
        </footer>

        <FloatingCart />
        <WhatsAppButton />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
