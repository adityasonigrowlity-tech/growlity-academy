'use client';

import { 
  BookOpen, 
  Users, 
  DollarSign, 
  PlayCircle,
  ArrowRight,
  Plus,
  BarChart3,
  Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatCard from '@/components/admin/StatCard';
import { Button } from '@/components/ui/button';
import adminService from '@/services/admin.service';
import { formatDistanceToNow } from 'date-fns';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState([]);
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, enrollmentsRes] = await Promise.all([
          adminService.getAdminStats(),
          adminService.getRecentEnrollments()
        ]);
        
        setStats(statsRes.data);
        setRecentEnrollments(enrollmentsRes.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Map icon strings from API to Lucide components
  const getIcon = (iconName) => {
    const icons = {
      BookOpen,
      Users,
      DollarSign,
      PlayCircle
    };
    return icons[iconName] || BookOpen;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 text-growlity-blue animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 p-8 rounded-3xl text-center">
        <p className="text-red-600 font-bold">{error}</p>
        <Button 
          variant="outline" 
          className="mt-4" 
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm sm:text-base text-gray-500 font-medium mt-0.5">Welcome back, Admin.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/courses/new" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-growlity-blue hover:bg-growlity-blue-hover text-white font-bold h-10 sm:h-11 px-6 rounded-xl shadow-lg shadow-growlity-blue/20 gap-2 text-sm">
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard 
            key={idx} 
            {...stat} 
            icon={getIcon(stat.icon)}
          />
        ))}
      </div>

      {/* Recent Activity area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-sm flex flex-col justify-center items-center min-h-[300px] sm:min-h-[400px]">
          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl sm:rounded-3xl bg-gray-50 flex items-center justify-center mb-4 sm:mb-6">
             <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-gray-300" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Revenue Analytics Coming Soon</h3>
          <p className="text-xs sm:text-base text-gray-500 max-w-sm text-center font-medium">
            Detailed revenue tracking and engagement charts will be available soon.
          </p>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Recent Enrolments</h3>
            <Link href="/admin/students" className="text-xs sm:text-sm font-bold text-growlity-blue hover:text-growlity-blue-hover transition-colors flex items-center gap-1 group">
              View All
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {recentEnrollments.length > 0 ? (
              recentEnrollments.map((en) => (
                <div key={en.id} className="flex items-center gap-3 sm:gap-4">
                  {en.image ? (
                    <img src={en.image} alt={en.studentName} className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl object-cover" />
                  ) : (
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-sm">
                      {en.studentName.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{en.studentName}</p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{en.courseTitle}</p>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 shrink-0">
                    {formatDistanceToNow(new Date(en.enrolledAt), { addSuffix: false })}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs sm:text-sm text-gray-500 text-center py-6 sm:py-8 font-medium">No recent enrolments found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
