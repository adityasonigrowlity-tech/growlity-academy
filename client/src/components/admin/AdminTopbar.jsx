'use client';

import { 
  Search, 
  Bell, 
  User, 
  ChevronRight,
  Home,
  Menu,
  X
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const AdminTopbar = ({ isSidebarCollapsed, onToggleSidebar }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  // Simple Breadcrumbs logic
  const paths = pathname.split('/').filter(p => p && p !== 'admin');
  
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggleSidebar}
          className="hidden lg:flex h-10 w-10 rounded-xl hover:bg-gray-100 items-center justify-center"
        >
          {isSidebarCollapsed ? (
            <Menu className="h-6 w-6 text-gray-600" />
          ) : (
            <X className="h-6 w-6 text-gray-600" />
          )}
        </Button>

        {/* Breadcrumbs - Hide on small mobile */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500 hidden sm:flex">
          <Home className="h-4 w-4" />
          <ChevronRight className="h-4 w-4 text-gray-300" />
          <span className="text-gray-900 font-bold">Admin</span>
          {paths.map((path, index) => (
            <div key={path} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-gray-300" />
              <span className={cn(
                "capitalize",
                index === paths.length - 1 ? "text-growlity-blue font-black" : "text-gray-500"
              )}>
                {path.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search dashboard..." 
            className="pl-10 h-10 w-64 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-growlity-blue/10 transition-all font-medium"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-gray-50">
          <Bell className="h-5 w-5 text-gray-500" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
        </Button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-bold text-gray-900 leading-tight">{user?.name || 'Admin'}</span>
            <span className="text-[10px] font-bold text-growlity-blue uppercase tracking-wider">Super Admin</span>
          </div>
          <Avatar className="h-9 w-9 border border-gray-100 shadow-sm ring-2 ring-gray-50 ring-offset-2">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-growlity-blue text-white text-xs font-bold">
              {user?.name?.charAt(0) || 'A'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
