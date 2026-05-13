'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Search, 
  ShoppingCart, 
  Bell, 
  Heart, 
  Menu, 
  User, 
  BookOpen, 
  LogOut, 
  Settings,
  X,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Logo from '@/components/common/Logo';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Handle Scroll Appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };


  // Nav Links from config
  const navLinks = siteConfig.mainNav;
  const exploreLink = navLinks.find(l => l.title === "Explore");
  const subscribeLink = navLinks.find(l => l.title === "Subscribe");
  const businessLink = navLinks.find(l => l.title === "Growlity Business");
  const techLink = navLinks.find(l => l.title === "Tech on Growlity");

  const NavItem = ({ link, className }) => (
    <Link
      href={link?.href || '#'}
      className={cn(
        "text-sm font-semibold transition-colors hover:text-growlity-blue whitespace-nowrap",
        pathname === link?.href ? "text-growlity-blue" : "text-muted-foreground",
        className
      )}
    >
      {link?.title}
    </Link>
  );

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b h-16 flex items-center",
      scrolled 
        ? "bg-white/90 dark:bg-black/90 backdrop-blur-md border-border shadow-sm" 
        : "bg-white dark:bg-black border-border"
    )}>
      {/* FULL WIDTH CONTAINER */}
      <div className="w-full px-6">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* LEFT: LOGO */}
          <Logo />

          {/* DESKTOP NAV SEQUENCE (Explore | Subscribe | Search | Business | Tech | My learning | Wishlist | Cart | Notifications | Avatar) */}
          <div className="hidden lg:flex items-center flex-1 justify-between gap-2 xl:gap-6 ml-4 xl:ml-8">

            {/* 1. Explore & 2. Subscribe */}
            <div className="flex items-center gap-3 xl:gap-6 shrink-0">
              <NavItem link={exploreLink} />
              <NavItem link={subscribeLink} />
            </div>

            {/* 3. Search Bar - Expands to fill space */}
            <div className="flex-1 max-w-[600px] min-w-[200px] lg:min-w-[150px] mx-2">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-growlity-blue" />
                  <Input
                    type="search"
                    placeholder="Search courses..."
                    className="pl-10 h-10 w-full bg-muted/40 border-none transition-all focus:bg-muted focus:ring-1 focus:ring-growlity-blue/20 text-sm rounded-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </div>

            {/* RIGHT SIDE GROUP */}
            <div className="flex items-center gap-2 xl:gap-6 shrink-0 ml-auto">
              {/* 4. Business, 5. Tech, 6. Learning */}
              <div className="flex items-center gap-3 xl:gap-6 shrink-0">
                <NavItem link={businessLink} />
                <NavItem link={techLink} />
                {isAuthenticated && (
                  <NavItem link={{ title: "My learning", href: "/my-learning" }} />
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-2 xl:gap-3 shrink-0">
              {/* 7. Wishlist */}
              {isAuthenticated && (
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/80 transition-all">
                  <Heart className="h-5 w-5" />
                </Button>
              )}

              {/* 8. Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-muted/80 transition-all">
                  <ShoppingCart className="h-5 w-5" />
                  {user?.cart?.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-growlity-green text-white">
                      {user.cart.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* 9. Notifications */}
              {isAuthenticated && (
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/80 transition-all">
                  <Bell className="h-5 w-5" />
                </Button>
              )}

              {/* 10. Avatar / Auth */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" className="relative rounded-full p-0 overflow-hidden outline-none ring-offset-background transition-all hover:ring-2 hover:ring-growlity-blue/30" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                      <Avatar className="size-9 border border-border">
                        {user?.avatar && (
                          <AvatarImage src={user.avatar} alt={user.name || 'User'} />
                        )}
                        <AvatarFallback className="bg-gradient-to-br from-growlity-blue to-growlity-green text-white font-bold text-sm">
                          {user?.name?.charAt(0)?.toUpperCase() || <User className="size-5" />}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl border-border/50 backdrop-blur-xl" isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
                    <DropdownMenuLabel className="mb-2 p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10 border border-border shadow-sm">
                          {user?.avatar && (
                            <AvatarImage src={user.avatar} alt={user.name || 'User'} />
                          )}
                          <AvatarFallback className="bg-gradient-to-br from-growlity-blue to-growlity-green text-white font-bold text-base">
                            {user?.name?.charAt(0)?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-bold truncate">{user?.name}</span>
                          <span className="text-[10px] text-muted-foreground truncate">{user?.email}</span>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="rounded-md" onClick={() => router.push('/settings')}>
                      <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="rounded-md text-destructive focus:bg-destructive/10" onClick={() => logout(user?.role === 'admin' ? '/admin/login' : '/login')}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span className="font-medium">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button className="bg-growlity-green hover:bg-growlity-green-hover text-white font-bold text-sm px-5 h-10 shadow-lg shadow-growlity-green/20 rounded-lg">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="bg-growlity-blue hover:bg-growlity-blue-hover text-white font-bold text-sm px-5 h-10 shadow-lg shadow-growlity-blue/20 rounded-lg">
                      Signup
                    </Button>
                  </Link>
                </div>
              )}
              </div>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <button className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU (DRAWER) - FIXED OVERLAY */}
      <div className={cn(
        "fixed inset-0 z-[100] transition-all duration-300 lg:hidden",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {/* Backdrop overlay */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
        
        {/* Drawer content */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[300px] bg-white dark:bg-black shadow-2xl transition-transform duration-500 ease-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full p-8">
            <div className="flex items-center justify-between mb-10">
              <Logo className="mb-4" size="md" />
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex flex-col justify-between h-full py-2">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-4 mb-2">Main Menu</p>
                {[exploreLink, subscribeLink, businessLink, techLink].map((link, idx) => (
                  link && (
                    <Link
                      key={idx}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-4 rounded-xl transition-all font-bold text-lg",
                        pathname === link.href ? "bg-growlity-blue/10 text-growlity-blue" : "hover:bg-muted text-foreground"
                      )}
                    >
                      {link.title}
                    </Link>
                  )
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t">
                {!isAuthenticated ? (
                  <>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block">
                      <Button className="w-full h-14 rounded-2xl bg-growlity-green hover:bg-growlity-green-hover text-white font-bold text-lg shadow-xl shadow-growlity-green/20">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="block">
                      <Button className="w-full h-14 rounded-2xl bg-growlity-blue hover:bg-growlity-blue-hover text-white font-bold text-lg shadow-xl shadow-growlity-blue/20">
                        Signup
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button 
                    onClick={() => logout(user?.role === 'admin' ? '/admin/login' : '/login')}
                    variant="outline" 
                    className="w-full h-14 rounded-2xl font-bold text-lg text-destructive border-destructive/20 hover:bg-destructive/5"
                  >
                    Logout Account
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
