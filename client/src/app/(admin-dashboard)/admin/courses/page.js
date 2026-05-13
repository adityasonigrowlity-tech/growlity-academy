'use client';

import { 
  Plus, 
  Search, 
  Filter,
  Download
} from 'lucide-react';
import Link from 'next/link';
import CourseTable from '@/components/admin/CourseTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminCoursesPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Courses Catalog</h1>
          <p className="text-gray-500 font-medium">Manage your courses, curriculum, and enrollment status.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 px-5 rounded-xl gap-2 font-bold text-gray-600 border-gray-200">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Link href="/admin/courses/new">
            <Button className="bg-growlity-blue hover:bg-growlity-blue-hover text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-growlity-blue/20 gap-2">
              <Plus className="h-4 w-4" />
              Add New Course
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search courses by name, category or instructor..." 
            className="pl-10 h-12 bg-white border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-growlity-blue/10 transition-all font-medium"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-12 px-5 rounded-2xl gap-2 font-bold text-gray-600 border-gray-100 bg-white shadow-sm">
            <Filter className="h-4 w-4" />
            Category
          </Button>
          <Button variant="outline" className="h-12 px-5 rounded-2xl gap-2 font-bold text-gray-600 border-gray-100 bg-white shadow-sm">
            Status
          </Button>
        </div>
      </div>

      {/* Course List */}
      <CourseTable />
    </div>
  );
}
