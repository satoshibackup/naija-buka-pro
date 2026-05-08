import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import FloatingCart from "@/components/FloatingCart";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  title: "Naija Buka Pro - Order Nigerian Food Online | Lagos",
  description: "Experience the taste of authentic Nigerian cuisine. Hot Amala, Smokey Jollof, and Correct Soup delivered to your door in Lagos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="bg-cream font-sans">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-accent mb-6 flex items-center gap-2">
                Naija Buka Pro
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Bringing the authentic taste of Lagos Bukas to your doorstep. Quality, spice, and soul in every bite.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-300">
                <li><a href="#menu" className="hover:text-accent transition-colors">Our Menu</a></li>
                <li><a href="/cart" className="hover:text-accent transition-colors">Checkout</a></li>
                <li><a href="/admin" className="hover:text-accent transition-colors">Admin Portal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Us</h4>
              <p className="text-gray-300 mb-2">Victoria Island, Lagos</p>
              <p className="text-gray-300 mb-4">+234 800 NAIJA BUKA</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-all text-white">IG</a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-all text-white">FB</a>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            © 2026 Naija Buka Pro. Built in Lagos.
          </div>
        </footer>
        <FloatingCart />
        <WhatsAppButton />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
