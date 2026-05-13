'use client';

import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart as PieChartIcon,
  Activity,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";

export default function AnalyticsPage() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Analytics Dashboard</h1>
          <p className="text-gray-500 font-medium mt-1">Real-time performance metrics and growth insights for your academy.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 rounded-xl border-gray-100 font-bold px-6 flex gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button className="bg-gray-900 hover:bg-black text-white font-bold rounded-xl h-12 px-6 shadow-xl shadow-gray-900/10">
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatItem 
          title="Total Revenue" 
          value="$128,430" 
          change="+12.5%" 
          isPositive={true} 
          icon={DollarSign} 
          color="blue"
        />
        <StatItem 
          title="Course Enrollments" 
          value="45,210" 
          change="+8.2%" 
          isPositive={true} 
          icon={TrendingUp} 
          color="green"
        />
        <StatItem 
          title="Active Students" 
          value="12,845" 
          change="-2.4%" 
          isPositive={false} 
          icon={Users} 
          color="purple"
        />
        <StatItem 
          title="Avg. Engagement" 
          value="84%" 
          change="+5.1%" 
          isPositive={true} 
          icon={Activity} 
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Placeholder */}
        <Card className="lg:col-span-2 border-none shadow-xl shadow-gray-200/50 rounded-[40px] overflow-hidden bg-white">
          <CardHeader className="p-8 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black text-gray-900">Revenue Growth</CardTitle>
                <CardDescription className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Monthly performance</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-blue-50 text-growlity-blue border-blue-100 font-black h-7 px-3">Revenue</Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-400 border-gray-100 font-black h-7 px-3">Expenses</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-12 h-[400px] flex items-end justify-between gap-4">
             {/* Mock Chart Bars */}
             {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 100].map((h, i) => (
               <div key={i} className="flex-1 group relative">
                 <div 
                  className="w-full bg-growlity-blue/10 rounded-t-xl group-hover:bg-growlity-blue transition-all duration-500 cursor-pointer"
                  style={{ height: `${h}%` }}
                 />
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] font-black px-2 py-1 rounded-lg">
                   ${h}k
                 </div>
               </div>
             ))}
          </CardContent>
        </Card>

        {/* Secondary Info */}
        <Card className="border-none shadow-xl shadow-gray-200/50 rounded-[40px] overflow-hidden bg-white">
           <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black text-gray-900">Popular Categories</CardTitle>
              <CardDescription className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Enrollment distribution</CardDescription>
           </CardHeader>
           <CardContent className="p-8 pt-0 space-y-6">
              <CategoryItem label="Design Thinking" value={45} color="bg-blue-500" />
              <CategoryItem label="Business Strategy" value={32} color="bg-green-500" />
              <CategoryItem label="Leadership" value={18} color="bg-purple-500" />
              <CategoryItem label="Tech Innovation" value={5} color="bg-orange-500" />
              
              <div className="pt-6 border-t border-gray-50 flex flex-col items-center">
                 <div className="h-32 w-32 border-[12px] border-gray-50 rounded-full relative flex items-center justify-center">
                    <div className="absolute inset-[-12px] border-[12px] border-growlity-blue rounded-full border-t-transparent -rotate-45" />
                    <span className="text-2xl font-black text-gray-900">82%</span>
                 </div>
                 <p className="mt-4 text-xs font-black text-gray-400 uppercase tracking-widest">Target Completion</p>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatItem({ title, value, change, isPositive, icon: Icon, color }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:shadow-gray-200/40 relative overflow-hidden group">
      <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110", colorMap[color])}>
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">{title}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <p className="text-3xl font-black text-gray-900 tracking-tight">{value}</p>
        <span className={cn(
          "text-xs font-black flex items-center gap-0.5",
          isPositive ? "text-green-500" : "text-red-500"
        )}>
          {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {change}
        </span>
      </div>
    </div>
  );
}

function CategoryItem({ label, value, color }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="font-black text-gray-900">{label}</span>
        <span className="font-bold text-gray-400">{value}%</span>
      </div>
      <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-1000", color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
