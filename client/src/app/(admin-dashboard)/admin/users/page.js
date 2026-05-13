"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Mail, 
  UserMinus, 
  CheckCircle2,
  Clock,
  Loader2,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  ChevronRight,
  UserCheck,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import { getAdminStudents, getAdminStudentStats } from '@/services/admin.service';
import { toast } from 'sonner';

const ROLES = [
  { id: 'student', label: 'Students', icon: GraduationCap, color: '#183f98', bgColor: 'bg-blue-50', textColor: 'text-blue-600', ringColor: 'ring-blue-100' },
  { id: 'corporate_hr', label: 'Business', icon: Briefcase, color: '#f97316', bgColor: 'bg-orange-50', textColor: 'text-orange-600', ringColor: 'ring-orange-100' },
  { id: 'instructor', label: 'Instructors', icon: Users, color: '#a855f7', bgColor: 'bg-purple-50', textColor: 'text-purple-600', ringColor: 'ring-purple-100' },
  { id: 'admin', label: 'Admins', icon: ShieldCheck, color: '#ef4444', bgColor: 'bg-red-50', textColor: 'text-red-600', ringColor: 'ring-red-100' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

export default function UsersManagementPage() {
  const [activeRole, setActiveRole] = useState('student');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    newStudentsToday: 0
  });
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });

  const fetchData = useCallback(async (role, page = 1, search = '') => {
    try {
      setLoading(true);
      const [usersRes, statsRes] = await Promise.all([
        getAdminStudents({ role, page, limit: 10, search }),
        getAdminStudentStats(role)
      ]);

      if (usersRes.success) {
        setUsers(usersRes.data);
        setPagination(usersRes.pagination);
      }
      if (statsRes.success) {
        setStats(statsRes.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(`Failed to fetch ${role} data`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData(activeRole, 1, searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [activeRole, searchTerm, fetchData]);

  const handlePageChange = (newPage) => {
    fetchData(activeRole, newPage, searchTerm);
  };

  const activeRoleData = ROLES.find(r => r.id === activeRole);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header & Breadcrumbs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
           <span className="hover:text-growlity-blue cursor-pointer transition-colors">Admin</span>
           <ChevronRight className="h-3 w-3" />
           <span className="text-gray-900">Users Management</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              Manage Users
              <div className={cn("h-2 w-2 rounded-full", activeRoleData.bgColor.replace('bg-', 'bg-').split('-')[1] + '-500')} style={{ backgroundColor: activeRoleData.color }} />
            </h1>
            <p className="text-sm sm:text-base text-gray-500 font-medium">
              Oversee and control all platform <span className={cn("font-black", activeRoleData.textColor)}>{activeRoleData.label.toLowerCase()}</span>.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-2xl h-12 px-6 border-gray-100 font-bold text-gray-600 hover:bg-gray-50 transition-all flex gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="bg-growlity-blue hover:bg-growlity-blue-hover text-white font-bold rounded-2xl h-12 px-8 shadow-xl shadow-growlity-blue/20 transition-all hover:scale-[1.02] active:scale-100 flex gap-2">
                <Users className="h-4 w-4" />
                Add User
            </Button>
          </div>
        </div>
      </div>

      {/* Role Navigation Tabs */}
      <div className="relative">
        <Tabs value={activeRole} onValueChange={setActiveRole} className="w-full">
          <TabsList className="flex w-full h-auto bg-gray-100/40 p-1.5 rounded-[24px] border border-gray-100/50 backdrop-blur-xl overflow-x-auto no-scrollbar">
            {ROLES.map((role) => (
              <TabsTrigger 
                key={role.id} 
                value={role.id}
                className={cn(
                  "flex-1 min-w-[100px] h-11 sm:h-12 rounded-[18px] font-black uppercase tracking-widest text-[10px] sm:text-xs transition-all flex items-center justify-center gap-2 px-4 shadow-none",
                  "data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-lg data-[state=active]:shadow-gray-200/50",
                  "text-gray-400 hover:text-gray-600"
                )}
              >
                <div className={cn(
                  "h-6 w-6 rounded-lg flex items-center justify-center transition-colors",
                  activeRole === role.id ? role.bgColor : "bg-transparent"
                )}>
                  <role.icon className={cn("h-3.5 w-3.5", activeRole === role.id ? role.textColor : "text-current")} />
                </div>
                {role.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <motion.div 
        key={activeRole}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: `Total ${activeRoleData.label}`, value: stats.totalStudents, icon: activeRoleData.icon, color: activeRoleData.color, bg: activeRoleData.bgColor, text: activeRoleData.textColor, trend: '+12%' },
            { label: 'Active Status', value: stats.activeStudents, icon: UserCheck, color: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-600', trend: 'Live' },
            { label: 'New Today', value: stats.newStudentsToday, icon: TrendingUp, color: '#6366f1', bg: 'bg-indigo-50', text: 'text-indigo-600', trend: 'Fresh' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100/50 transition-all group relative overflow-hidden"
            >
              <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-3xl opacity-20", stat.bg)} />
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", stat.bg)}>
                  <stat.icon className={cn("h-7 w-7", stat.text)} />
                </div>
                <Badge variant="outline" className={cn("rounded-lg border-none font-black text-[10px] h-6 px-2 shadow-none", stat.bg, stat.text)}>
                  {stat.trend}
                </Badge>
              </div>
              
              <div className="relative z-10">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900 tracking-tight">{stat.value.toLocaleString()}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data Table Container */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-gray-200/40 overflow-hidden"
        >
          {/* Table Toolbar */}
          <div className="p-6 sm:p-8 border-b border-gray-50 flex flex-col md:flex-row gap-6 justify-between items-center bg-gray-50/10">
            <div className="relative w-full md:w-[450px] group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300 group-focus-within:text-growlity-blue transition-colors" />
              <Input 
                placeholder={`Search ${activeRoleData.label.toLowerCase()} by name or email...`} 
                className="pl-14 h-14 bg-white border-2 border-gray-50 rounded-[22px] focus:border-growlity-blue/20 focus:ring-8 focus:ring-growlity-blue/5 transition-all font-bold text-gray-900 placeholder:text-gray-300 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Button variant="outline" className="h-14 rounded-[22px] border-gray-100 font-black uppercase tracking-widest text-[10px] px-8 flex gap-3 text-gray-500 transition-all hover:bg-white hover:border-gray-200 flex-1 md:flex-none">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
          </div>

          {/* Table Content */}
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 gap-4"
                >
                  <div className="relative">
                    <Loader2 className="h-10 w-10 text-growlity-blue animate-spin" />
                    <div className="absolute inset-0 blur-xl bg-growlity-blue/20 animate-pulse rounded-full" />
                  </div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] animate-pulse">Syncing Database...</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
            
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-gray-50 bg-gray-50/30">
                  <TableHead className="pl-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">{activeRole.replace('corporate_hr', 'Business')} Information</TableHead>
                  <TableHead className="hidden lg:table-cell text-[10px] font-black uppercase tracking-widest text-gray-400">Join Date</TableHead>
                  {(activeRole === 'student' || activeRole === 'instructor') && (
                    <TableHead className="hidden md:table-cell text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">
                      {activeRole === 'student' ? 'Enrollments' : 'Catalog'}
                    </TableHead>
                  )}
                  <TableHead className="hidden sm:table-cell text-[10px] font-black uppercase tracking-widest text-gray-400">Account Status</TableHead>
                  <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest text-gray-400">Manage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 && !loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-32 text-gray-300">
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-6">
                         <div className={cn("h-24 w-24 rounded-[32px] flex items-center justify-center shadow-inner", activeRoleData.bgColor)}>
                            <activeRoleData.icon className={cn("h-10 w-10 opacity-40", activeRoleData.textColor)} />
                         </div>
                         <div className="space-y-1">
                           <p className="text-lg font-black text-gray-900 tracking-tight">No {activeRoleData.label.toLowerCase()} found</p>
                           <p className="text-sm font-medium text-gray-400 max-w-[300px] mx-auto">We couldn't find any records for this role. Try adjusting your search or filters.</p>
                         </div>
                      </motion.div>
                    </TableCell>
                  </TableRow>
                ) : (
                  users
                    .filter(user => user.role === activeRole)
                    .map((user, idx) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group border-gray-50 hover:bg-gray-50/50 transition-all relative"
                    >
                      <TableCell className="pl-8 py-6">
                        <div className="flex items-center gap-5">
                          <div className={cn("p-1 rounded-full ring-2 transition-all group-hover:ring-4 duration-500", activeRoleData.ringColor)}>
                            <Avatar className="h-11 w-11 sm:h-12 sm:w-12 shadow-sm">
                              <AvatarImage src={user.profile_image} />
                              <AvatarFallback className={cn("font-black text-sm", activeRoleData.bgColor, activeRoleData.textColor)}>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-black text-gray-900 text-sm sm:text-base tracking-tight truncate group-hover:text-growlity-blue transition-colors underline decoration-transparent group-hover:decoration-growlity-blue/20">{user.name}</span>
                            <span className="text-[11px] text-gray-400 font-bold truncate opacity-80 group-hover:opacity-100 transition-opacity">{user.email}</span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-black text-gray-700 text-xs sm:text-sm">
                            {new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{new Date(user.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </TableCell>
                      
                      {(activeRole === 'student' || activeRole === 'instructor') && (
                        <TableCell className="hidden md:table-cell text-center">
                          <div className={cn("inline-flex flex-col items-center justify-center min-w-[80px] h-12 rounded-2xl border-2 transition-all duration-500 group-hover:scale-110", activeRoleData.ringColor.replace('ring-', 'bg-').split('-')[0] + '-50/50', activeRoleData.ringColor.replace('ring-', 'border-'))}>
                             <span className={cn("text-base font-black leading-none", activeRoleData.textColor)}>
                               {activeRole === 'student' ? user._count?.enrollments || 0 : user._count?.courses_taught || 0}
                             </span>
                             <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400 mt-1">
                               {activeRole === 'student' ? 'Courses' : 'Taught'}
                             </span>
                          </div>
                        </TableCell>
                      )}

                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                           <div className={cn("h-2 w-2 rounded-full animate-pulse", user.status === 'active' ? "bg-emerald-500" : "bg-red-500")} />
                           <span className={cn(
                             "font-black uppercase tracking-[0.1em] text-[10px]",
                             user.status === 'active' ? "text-emerald-600" : "text-red-600"
                           )}>
                             {user.status}
                           </span>
                        </div>
                      </TableCell>

                      <TableCell className="text-right pr-8">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-lg hover:shadow-gray-200/50 transition-all border border-transparent hover:border-gray-100">
                              <MoreHorizontal className="h-5 w-5 text-gray-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-64 p-2.5 rounded-[24px] shadow-2xl border-gray-100/50 backdrop-blur-xl bg-white/90 mt-2">
                             <div className="px-3 py-2 border-b border-gray-50 mb-1">
                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Account Management</p>
                             </div>
                            <DropdownMenuItem className="rounded-[16px] flex gap-3 font-bold p-3 transition-all cursor-pointer group/item hover:bg-blue-50 hover:text-blue-600">
                              <Mail className="h-4 w-4 text-gray-400 group-hover/item:text-blue-600 transition-colors" /> 
                              Send Notification
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-[16px] flex gap-3 font-bold p-3 transition-all cursor-pointer group/item hover:bg-purple-50 hover:text-purple-600">
                              <ShieldCheck className="h-4 w-4 text-gray-400 group-hover/item:text-purple-600 transition-colors" /> 
                              Change Permission
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-[16px] flex gap-3 font-bold p-3 text-red-500 hover:bg-red-50 transition-all cursor-pointer mt-1">
                              <UserMinus className="h-4 w-4" /> 
                              Suspend Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Luxury Pagination UI */}
          <div className="p-6 sm:p-8 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gray-50/10">
             <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center font-black text-gray-900 shadow-sm">
                  {pagination.page}
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                  Page <span className="text-gray-900">{pagination.page}</span> <span className="mx-1">/</span> {pagination.pages}
                </p>
             </div>
             
             <div className="flex gap-4 w-full sm:w-auto">
               <Button 
                 variant="outline" 
                 size="sm" 
                 className="flex-1 sm:flex-none rounded-2xl font-black uppercase tracking-widest text-[9px] h-12 px-8 disabled:opacity-20 border-gray-100 shadow-sm transition-all hover:bg-white active:scale-95"
                 disabled={pagination.page <= 1 || loading}
                 onClick={() => handlePageChange(pagination.page - 1)}
               >
                 Previous
               </Button>
               <Button 
                 variant="outline" 
                 size="sm" 
                 className="flex-1 sm:flex-none rounded-2xl font-black uppercase tracking-widest text-[9px] h-12 px-8 disabled:opacity-20 border-gray-100 shadow-sm transition-all hover:bg-white active:scale-95"
                 disabled={pagination.page >= pagination.pages || loading}
                 onClick={() => handlePageChange(pagination.page + 1)}
               >
                 Next Page
               </Button>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
