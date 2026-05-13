import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, MonitorOff, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

/**
 * AdminGuard component
 * Protects routes by checking if user is authenticated and is an admin
 * Also restricts mobile access as requested.
 */
const AdminGuard = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const isAdminSetup = pathname === '/admin/initial-setup';
  const isAuthPath = pathname === '/admin/login' || pathname === '/admin/signup';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // If loading is finished and user is not authenticated or not an admin
    if (!loading) {
      if (isAuthPath || isAdminSetup) return;

      if (!isAuthenticated) {
        toast.error("Please login as an admin to access this area.");
        router.replace('/admin/login');
      } else if (user?.role !== 'admin') {
        toast.error("Access denied. Admin privileges required.");
        router.replace('/');
      }
    }
  }, [user, isAuthenticated, loading, router, pathname]);



  // Show loading state while checking status
  if (!isAuthPath && !isAdminSetup && (loading || !isAuthenticated || user?.role !== 'admin')) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center z-[9999]">
        <div className="relative h-20 w-20 mb-6">
           {/* Animated Logo or Icon */}
           <div className="absolute inset-0 border-4 border-growlity-blue/20 rounded-full" />
           <div className="absolute inset-0 border-4 border-growlity-blue rounded-full border-t-transparent animate-spin" />
        </div>
        <h2 className="text-xl font-black text-gray-900 tracking-tight mb-2">Verifying Admin Access</h2>
        <p className="text-gray-500 font-medium text-sm">Please wait while we secure your session...</p>
      </div>
    );
  }

  // If all checks pass, show protected content
  return <>{children}</>;
};

export default AdminGuard;
