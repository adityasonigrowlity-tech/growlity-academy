'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function AuthWrapper({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const shouldHideNav = isAuthPage || isAdminPage;

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideNav && <Navbar />}
      <main className={shouldHideNav ? "flex-1" : "flex-1 pt-16"}>
        {children}
      </main>
      {!shouldHideNav && <Footer />}
    </div>
  );
}
