import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Naija Buka Pro - Order Nigerian Food Online | Lagos",
  description: "Authentic Nigerian restaurant template with professional ordering system. Order Jollof, Egusi, Suya and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-xl font-bold mb-2">Naija Buka Pro</h3>
            <p className="text-gray-400 mb-4">The #1 Professional Nigerian Food Ordering Platform.</p>
            <div className="flex justify-center gap-4 mb-4">
              <a href="#" className="hover:text-primary">Terms</a>
              <a href="#" className="hover:text-primary">Privacy</a>
              <a href="#" className="hover:text-primary">Contact</a>
            </div>
            <p className="text-xs text-gray-500">© 2026 Naija Buka Pro. All rights reserved.</p>
          </div>
        </footer>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
