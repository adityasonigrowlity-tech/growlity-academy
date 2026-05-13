'use client';

import { 
  TrendingUp, 
  TrendingDown,
  LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = "blue" 
}) => {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    green: "text-green-600 bg-green-50 border-green-100",
    purple: "text-purple-600 bg-purple-50 border-purple-100",
    orange: "text-orange-600 bg-orange-50 border-orange-100",
  };

  const selectedColor = colorMap[color] || colorMap.blue;

  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border bg-opacity-10", selectedColor)}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full",
              trend === 'up' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            )}>
              {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {trendValue}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-[10px] sm:text-sm font-bold text-gray-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-xl sm:text-3xl font-black text-gray-900 leading-tight">{value}</h3>
        </div>
        
        {/* Decorative mini-chart placeholder or accent */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live statistics</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={cn("w-1 rounded-full bg-growlity-blue bg-opacity-20", i === 4 ? "h-4" : i === 3 ? "h-3" : "h-2")} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
