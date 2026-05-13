"use client";

import { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check,
  Plus,
  Trash2,
  Video,
  Image as ImageIcon,
  BookOpen,
  DollarSign,
  GraduationCap,
  Loader2,
  Sparkles,
  Layout,
  Layers,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getAdminCategories, 
  getAdminCourseById, 
  createAdminCourse, 
  updateAdminCourse 
} from '@/services/admin.service';

const steps = [
  { id: 1, title: 'Foundations', subtitle: 'Basic Details', icon: BookOpen, color: 'blue' },
  { id: 2, title: 'Curriculum', subtitle: 'Course Content', icon: Layers, color: 'purple' },
  { id: 3, title: 'Visibility', subtitle: 'Pricing & Media', icon: Rocket, color: 'emerald' },
];

const NewCourseForm = ({ courseId }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(courseId ? true : false);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category_id: '',
    level: 'Beginner',
    price: '',
    thumbnail_url: '',
    status: 'draft',
    instructor_id: user?.id || ''
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAdminCategories();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error) {
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (courseId) {
      const fetchCourse = async () => {
        try {
          const response = await getAdminCourseById(courseId);
          if (response.success) {
            const course = response.data;
            setFormData({
              title: course.title,
              subtitle: '',
              description: course.description,
              category_id: course.category_id,
              level: course.level,
              price: course.price.toString(),
              thumbnail_url: course.thumbnail_url || '',
              status: course.status,
              instructor_id: course.instructor_id
            });
          }
        } catch (error) {
          toast.error('Failed to load course details');
        } finally {
          setLoading(false);
        }
      };
      fetchCourse();
    }
  }, [courseId]);

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.title || !formData.category_id || !formData.description) {
        toast.error('Please fill in all required fields');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!formData.price) {
      toast.error('Please set a course price');
      return;
    }

    try {
      setSubmitting(true);
      const dataToSubmit = {
        ...formData,
        price: parseFloat(formData.price),
        instructor_id: formData.instructor_id || user?.id
      };

      let response;
      if (courseId) {
        response = await updateAdminCourse(courseId, dataToSubmit);
      } else {
        response = await createAdminCourse(dataToSubmit);
      }

      if (response.success) {
        toast.success(courseId ? 'Course updated successfully' : 'Course published successfully');
        router.push('/admin/courses');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save course');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center bg-white/50 backdrop-blur-xl rounded-[40px] border border-gray-100 shadow-sm transition-all duration-700">
        <div className="relative mb-6">
          <Loader2 className="h-12 w-12 text-growlity-blue animate-spin" />
          <div className="absolute inset-0 blur-2xl bg-growlity-blue/20 rounded-full animate-pulse" />
        </div>
        <p className="text-gray-500 font-bold tracking-tight">Syncing Course Intelligence...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Premium Stepper */}
      <div className="relative mb-16">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full overflow-hidden">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
             className="h-full bg-growlity-blue shadow-[0_0_15px_rgba(24,63,152,0.4)] transition-all duration-700"
           />
        </div>
        
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex flex-col items-center group">
                <motion.div 
                  initial={false}
                  animate={{ 
                    scale: isActive ? 1.15 : 1,
                    backgroundColor: isActive ? '#183f98' : isCompleted ? '#10b981' : '#ffffff',
                    borderColor: isActive ? '#183f98' : isCompleted ? '#10b981' : '#f3f4f6'
                  }}
                  className={cn(
                    "w-14 h-14 rounded-2xl border-2 flex items-center justify-center z-10 transition-all duration-500 shadow-xl",
                    isActive ? "shadow-growlity-blue/20 text-white" : isCompleted ? "shadow-emerald-500/20 text-white" : "text-gray-400"
                  )}
                >
                  {isCompleted ? <Check className="h-6 w-6 stroke-[3]" /> : <step.icon className="h-6 w-6" />}
                </motion.div>
                
                <div className="absolute mt-16 text-center whitespace-nowrap hidden md:block">
                  <span className={cn(
                    "block text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500",
                    isActive ? "text-growlity-blue" : "text-gray-400"
                  )}>Step {step.id}</span>
                  <span className={cn(
                    "block text-sm font-black tracking-tight transition-colors duration-500",
                    isActive ? "text-gray-900" : "text-gray-400"
                  )}>{step.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Luxury Form Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20, rotateY: 5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: -20, rotateY: -5 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="perspective-1000"
        >
          <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] rounded-[48px] overflow-hidden bg-white relative">
            {/* Design Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-growlity-blue/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -ml-32 -mb-32" />
            
            <CardContent className="p-8 md:p-16 relative z-10">
              {currentStep === 1 && (
                <div className="space-y-10">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                      Essential Intelligence
                      <Sparkles className="h-6 w-6 text-growlity-blue" />
                    </h2>
                    <p className="text-gray-500 font-medium">Define the core identity of your educational masterpiece.</p>
                  </div>

                  <div className="grid gap-8">
                    <div className="space-y-3 group">
                       <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-growlity-blue transition-colors">Course Master Title *</Label>
                       <Input 
                         placeholder="The Art of Modern Problem Solving..." 
                         className="h-16 bg-gray-50/50 border-2 border-transparent rounded-[24px] focus:bg-white focus:border-growlity-blue/20 focus:ring-8 focus:ring-growlity-blue/5 transition-all font-bold text-lg tracking-tight shadow-sm"
                         value={formData.title}
                         onChange={(e) => setFormData({...formData, title: e.target.value})}
                       />
                    </div>

                    <div className="space-y-3 group">
                       <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 group-focus-within:text-growlity-blue transition-colors">Strategic Description *</Label>
                       <textarea 
                         placeholder="A compelling overview that inspires students to enroll..." 
                         className="w-full min-h-[160px] p-6 bg-gray-50/50 border-2 border-transparent rounded-[32px] focus:bg-white focus:border-growlity-blue/20 focus:ring-8 focus:ring-growlity-blue/5 transition-all font-medium outline-none text-base shadow-sm resize-none"
                         value={formData.description}
                         onChange={(e) => setFormData({...formData, description: e.target.value})}
                       />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Learning Category</Label>
                         <div className="relative">
                            <Layout className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                            <select 
                              className="w-full h-16 pl-14 pr-6 bg-gray-50/50 border-2 border-transparent rounded-[24px] focus:bg-white focus:border-growlity-blue/20 focus:ring-8 focus:ring-growlity-blue/5 transition-all font-bold outline-none appearance-none shadow-sm cursor-pointer"
                              value={formData.category_id}
                              onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                            >
                              <option value="" disabled>Choose Category</option>
                              {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </select>
                         </div>
                      </div>
                      <div className="space-y-3">
                         <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Challenge Level</Label>
                         <select 
                           className="w-full h-16 px-6 bg-gray-50/50 border-2 border-transparent rounded-[24px] focus:bg-white focus:border-growlity-blue/20 focus:ring-8 focus:ring-growlity-blue/5 transition-all font-bold outline-none appearance-none shadow-sm cursor-pointer"
                           value={formData.level}
                           onChange={(e) => setFormData({...formData, level: e.target.value})}
                         >
                           <option value="Beginner">Beginner Level</option>
                           <option value="Intermediate">Intermediate Level</option>
                           <option value="Advanced">Advanced Mastery</option>
                         </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-10">
                   <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-3xl font-black text-gray-900 tracking-tight">Curriculum Architecture</h2>
                      <p className="text-gray-500 font-medium">Build the step-by-step roadmap for your students' success.</p>
                   </div>
                   
                   <div className="p-16 border-4 border-dashed border-gray-50 rounded-[48px] flex flex-col items-center justify-center bg-gray-50/20 group hover:bg-gray-50/40 transition-all duration-500">
                      <div className="relative mb-8">
                         <div className="h-24 w-24 rounded-[32px] bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                            <Layers className="h-10 w-10 text-growlity-blue" />
                         </div>
                         <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg">
                            <Check className="h-4 w-4 stroke-[3]" />
                         </div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Architect Mode Active</h3>
                      <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px] text-center max-w-sm leading-relaxed">The curriculum engine is currently undergoing a performance optimization upgrade.</p>
                      
                      <div className="mt-10 flex gap-4">
                         <Button variant="outline" className="rounded-2xl h-12 px-8 border-gray-100 font-bold opacity-50 cursor-not-allowed">
                            Draft Mode
                         </Button>
                         <Button className="bg-growlity-blue/10 text-growlity-blue hover:bg-growlity-blue/20 rounded-2xl h-12 px-8 font-black uppercase tracking-widest text-[10px] border-none shadow-none" disabled>
                            Upcoming: AI Assist
                         </Button>
                      </div>
                   </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-10">
                   <div className="space-y-2">
                      <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                         Market Launch
                         <Rocket className="h-7 w-7 text-emerald-500" />
                      </h2>
                      <p className="text-gray-500 font-medium">Configure your commercial metrics and visual presence.</p>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div className="space-y-3 group">
                          <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-growlity-blue">Premium Enrollment Fee (USD) *</Label>
                          <div className="relative">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                               <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                  <DollarSign className="h-4 w-4 stroke-[3]" />
                               </div>
                            </div>
                            <Input 
                              placeholder="199.00" 
                              type="number"
                              step="0.01"
                              className="pl-20 h-16 bg-gray-50/50 border-2 border-transparent rounded-[24px] focus:bg-white focus:border-growlity-blue/20 focus:ring-8 focus:ring-growlity-blue/5 transition-all font-black text-2xl tracking-tight shadow-sm"
                              value={formData.price}
                              onChange={(e) => setFormData({...formData, price: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                           <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Marketplace Status</Label>
                           <select 
                             className="w-full h-16 px-6 bg-gray-50/50 border-2 border-transparent rounded-[24px] focus:bg-white focus:border-growlity-blue/20 focus:ring-8 focus:ring-growlity-blue/5 transition-all font-bold outline-none appearance-none shadow-sm cursor-pointer"
                             value={formData.status}
                             onChange={(e) => setFormData({...formData, status: e.target.value})}
                           >
                             <option value="draft">Save as Draft</option>
                             <option value="published">Ready for Publication</option>
                             <option value="archived">Secure Archive</option>
                           </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Hero Asset URL</Label>
                        <Input 
                          placeholder="Link to high-resolution course cover..." 
                          className="h-14 bg-gray-50/50 border-2 border-transparent rounded-[20px] focus:bg-white focus:border-growlity-blue/20 focus:ring-8 focus:ring-growlity-blue/5 transition-all font-bold shadow-sm"
                          value={formData.thumbnail_url}
                          onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
                        />
                        <div className="aspect-video bg-gray-50 rounded-[32px] border-4 border-white shadow-inner flex flex-col items-center justify-center overflow-hidden transition-all duration-700 relative group">
                           {formData.thumbnail_url ? (
                             <>
                               <img src={formData.thumbnail_url} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                  <span className="text-white font-black uppercase tracking-widest text-[10px] border-2 border-white/40 px-4 py-2 rounded-full">Asset Preview</span>
                               </div>
                             </>
                           ) : (
                             <div className="flex flex-col items-center">
                               <div className="h-16 w-16 rounded-[22px] bg-white shadow-xl flex items-center justify-center mb-4">
                                  <ImageIcon className="h-7 w-7 text-gray-200" />
                               </div>
                               <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Awaiting Asset Intelligence</span>
                             </div>
                           )}
                        </div>
                      </div>
                   </div>
                </div>
              )}

              {/* Action Luxury Bar */}
              <div className="flex items-center justify-between mt-20 pt-10 border-t border-gray-50">
                <Button 
                  variant="ghost" 
                  onClick={prevStep} 
                  disabled={currentStep === 1 || submitting}
                  className="h-14 px-8 rounded-[22px] font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all hover:bg-gray-50 disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" /> Back to {steps[currentStep-2]?.title || 'Source'}
                </Button>
                
                <Button 
                  onClick={currentStep === 3 ? handleSubmit : nextStep}
                  disabled={submitting}
                  className={cn(
                    "h-14 px-10 rounded-[22px] font-black uppercase tracking-widest text-[11px] shadow-2xl transition-all hover:scale-[1.05] active:scale-95 flex items-center gap-3 group overflow-hidden relative",
                    currentStep === 3 
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20" 
                      : "bg-growlity-blue hover:bg-growlity-blue-hover text-white shadow-growlity-blue/20"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {submitting ? (
                      <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                        <Loader2 className="h-4 w-4 animate-spin" /> Finalizing...
                      </motion.div>
                    ) : (
                      <motion.div key="normal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 relative z-10">
                        {currentStep === 3 ? (courseId ? 'Update Intelligence' : 'Deploy Course') : 'Proceed to ' + steps[currentStep]?.title} 
                        {currentStep !== 3 && <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NewCourseForm;
