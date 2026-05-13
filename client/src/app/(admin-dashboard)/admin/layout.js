'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminGuard from '@/components/auth/AdminGuard';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  // Auto-collapse sidebar on mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isAuthPath = pathname === '/admin/login' || pathname === '/admin/signup' || pathname === '/admin/initial-setup';

  if (isAuthPath) {
    return (
      <AdminGuard>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-gray-900 font-sans">
          {children}
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50/50 flex overflow-hidden">
        {/* Sidebar - fixed width for container offset */}
        <AdminSidebar isCollapsed={isSidebarCollapsed} onToggle={setIsSidebarCollapsed} />
        
        {/* Main Content Area */}
        <div className={cn(
          "flex-1 flex flex-col transition-all duration-300 w-full min-w-0 font-sans",
          isSidebarCollapsed ? "pl-20" : "pl-64"
        )}>
          <AdminTopbar 
            isSidebarCollapsed={isSidebarCollapsed} 
            onToggleSidebar={() => {
              if (window.innerWidth >= 1024) {
                setIsSidebarCollapsed(!isSidebarCollapsed);
              }
            }} 
          />
          <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-50/50">
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-gray-900">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
