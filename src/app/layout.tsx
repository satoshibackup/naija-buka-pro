import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import FloatingCart from "@/components/FloatingCart";
import WhatsAppButton from "@/components/WhatsAppButton";
import siteSettings from "@/../data/site.json";

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
  title: `${siteSettings.brandName} - Order Nigerian Food Online | Lagos`,
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
      <body className="bg-cream font-sans min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="bg-primary text-white py-20 mt-20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-black text-accent mb-6 tracking-tighter">
                {siteSettings.brandName}
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-md">
                {siteSettings.heroSubtitle} Experience the authentic soul of Lagos in every bite.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest">Quick Links</h4>
              <ul className="space-y-4 text-gray-300 font-medium">
                <li><a href="#menu" className="hover:text-accent transition-colors">Menu</a></li>
                <li><a href="/cart" className="hover:text-accent transition-colors">Orders</a></li>
                <li><a href="/admin" className="hover:text-accent transition-colors">Admin Portal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-widest">Visit Us</h4>
              <p className="text-gray-300 mb-2">{siteSettings.address}</p>
              <p className="text-accent font-bold mb-4">{siteSettings.whatsappNumber}</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-accent transition-all text-white">IG</a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-accent transition-all text-white">FB</a>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 text-center text-gray-500 text-sm font-medium">
            © 2026 {siteSettings.brandName}. Built in Lagos.
          </div>
        </footer>
        <FloatingCart />
        <WhatsAppButton />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
