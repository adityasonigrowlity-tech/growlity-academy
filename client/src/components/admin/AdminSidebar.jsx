'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  LogOut,
  PlusCircle,
  GraduationCap,
  Grid,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Logo from '@/components/common/Logo';

const AdminSidebar = ({ isCollapsed, onToggle }) => {
  const pathname = usePathname();

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { title: 'Categories', icon: Grid, href: '/admin/categories' },
    { title: 'Add Course', icon: PlusCircle, href: '/admin/courses/new' },
    { title: 'Courses', icon: BookOpen, href: '/admin/courses' },
    { title: 'Users', icon: Users, href: '/admin/users' },
    { title: 'Subscriptions', icon: CreditCard, href: '/admin/subscriptions' },
    { title: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
    { title: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50 flex flex-col shadow-sm",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
        {!isCollapsed ? (
          <Logo size="sm" showText={true} />
        ) : (
          <div className="mx-auto">
             <Logo size="sm" showText={false} />
          </div>
        )}
        <button 
          onClick={() => onToggle(!isCollapsed)}
          className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
        >
          <ChevronLeft className={cn("h-5 w-5 transition-transform", isCollapsed && "rotate-180")} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center py-3 rounded-xl transition-all group",
                isCollapsed ? "justify-center" : "px-3 gap-3",
                isActive 
                  ? "bg-growlity-blue text-white shadow-lg shadow-growlity-blue/20" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-growlity-blue"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "group-hover:scale-110 transition-transform")} />
              
              {!isCollapsed ? (
                <span className="font-bold text-sm tracking-tight">{item.title}</span>
              ) : (
                /* Tooltip for Collapsed State */
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg 
                                opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 
                                transition-all duration-200 pointer-events-none whitespace-nowrap z-[100] shadow-xl font-bold">
                  {item.title}
                  <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>
              )}

              {isActive && !isCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <Link href="/">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full flex items-center hover:bg-red-50 hover:text-red-500 rounded-xl",
              isCollapsed ? "justify-center px-0" : "justify-start gap-3 px-3"
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!isCollapsed ? (
              <span className="font-bold text-sm">Exit Admin</span>
            ) : (
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg 
                                opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 
                                transition-all duration-200 pointer-events-none whitespace-nowrap z-[100] shadow-xl font-bold">
                Exit Admin
                <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
              </div>
            )}
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
