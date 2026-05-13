'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import NewCourseForm from '@/components/admin/NewCourseForm';
import { Button } from '@/components/ui/button';

export default function EditCoursePage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center gap-6">
        <Link href="/admin/courses">
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-gray-200 bg-white shadow-sm hover:shadow-md transition-all group active:scale-95">
            <ArrowLeft className="h-5 w-5 text-gray-500 group-hover:text-growlity-blue transition-colors" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">Edit Course</h1>
          <p className="text-gray-500 font-medium">Update the course details, content, and pricing.</p>
        </div>
      </div>

      {/* Form Area */}
      <NewCourseForm courseId={id} />
    </div>
  );
}
