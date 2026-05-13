"use client";

import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import NewCourseForm from '@/components/admin/NewCourseForm';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function CreateCoursePage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-8 group">
        <Link href="/admin/courses">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-[22px] border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all group active:scale-95 border-2">
              <ArrowLeft className="h-6 w-6 text-gray-400 group-hover:text-growlity-blue transition-colors" />
            </Button>
          </motion.div>
        </Link>
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-none uppercase">Architect New Course</h1>
            <div className="h-2 w-2 rounded-full bg-growlity-blue animate-pulse hidden md:block" />
          </div>
          <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-growlity-blue" />
            Initialize course intelligence and deploy to global catalog
          </p>
        </div>
      </div>

      {/* Form Area with Perspective Entry */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
      >
        <NewCourseForm />
      </motion.div>
    </div>
  );
}
