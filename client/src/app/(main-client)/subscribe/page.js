"use client";

import { useState, useEffect } from 'react';
import { 
  Check, 
  ArrowRight, 
  CreditCard, 
  Zap, 
  Star, 
  ShieldCheck, 
  Clock, 
  Users,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getPublicSubscriptionPlans } from '@/services/subscription.service';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function SubscribePage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const res = await getPublicSubscriptionPlans();
        if (res.success) {
          setPlans(res.data);
        }
      } catch (error) {
        toast.error('Failed to load subscription plans');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleSubscribe = (planId) => {
    if (!isAuthenticated) {
      toast.info('Please login to subscribe');
      router.push('/login?redirect=/subscribe');
      return;
    }
    // Redirect to checkout or handle payment logic
    toast.success('Redirecting to checkout...');
    // router.push(`/checkout?planId=${planId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-growlity-blue animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Loading Plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-growlity-blue/5 to-transparent -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-growlity-green/10 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-growlity-blue/10 rounded-full blur-[100px] -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-growlity-blue/10 text-growlity-blue font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border-none">
            Membership Plans
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-growlity-blue to-growlity-green">Professional Potential</span>
          </h1>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Choose the membership that fits your goals. Get unlimited access to premium courses, expert mentorship, and career-boosting resources.
          </p>
        </div>

        {/* Billing Switch */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <span className={cn("text-sm font-bold transition-colors", billingCycle === 'monthly' ? "text-growlity-blue" : "text-gray-400")}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-16 h-8 bg-gray-100 rounded-full p-1 relative transition-all shadow-inner"
          >
            <div className={cn(
              "w-6 h-6 bg-white rounded-full shadow-lg transition-all flex items-center justify-center",
              billingCycle === 'yearly' ? "translate-x-8" : "translate-x-0"
            )}>
              <div className="w-1.5 h-1.5 rounded-full bg-growlity-blue" />
            </div>
          </button>
          <div className="flex items-center gap-2">
            <span className={cn("text-sm font-bold transition-colors", billingCycle === 'yearly' ? "text-growlity-blue" : "text-gray-400")}>Yearly</span>
            <Badge className="bg-growlity-green/20 text-growlity-green border-none font-black text-[10px] py-0 px-2 uppercase tracking-tighter">Save 20%</Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.filter(p => p.billing_cycle === billingCycle).length === 0 ? (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
               <span className="text-gray-400 font-bold">No {billingCycle} plans available at the moment.</span>
            </div>
          ) : (
            plans.filter(p => p.billing_cycle === billingCycle).map((plan) => (
              <div 
                key={plan.id} 
                className={cn(
                  "relative bg-white rounded-[48px] p-10 border transition-all duration-500 flex flex-col group hover:-translate-y-2",
                  plan.name.toLowerCase().includes('pro') || plan.name.toLowerCase().includes('premium') 
                    ? "border-growlity-blue shadow-2xl shadow-growlity-blue/10 scale-105 z-10" 
                    : "border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl"
                )}
              >
                {/* Popular Badge */}
                {(plan.name.toLowerCase().includes('pro') || plan.name.toLowerCase().includes('premium')) && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-growlity-blue text-white font-black uppercase tracking-widest text-[10px] px-6 py-2 rounded-full shadow-xl">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed min-h-[40px]">
                    {plan.description || "Everything you need to master your craft."}
                  </p>
                </div>

                <div className="mb-10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-gray-900">${parseFloat(plan.price).toFixed(0)}</span>
                    <span className="text-gray-400 font-bold">/{plan.billing_cycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-5 w-5 rounded-full bg-growlity-blue/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-growlity-blue" />
                    </div>
                    <span className="text-gray-700 font-bold text-sm">
                      {plan.course_access_type === 'all_courses' ? 'Full access to all courses' : `Access up to ${plan.max_courses} courses`}
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-5 w-5 rounded-full bg-growlity-blue/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-growlity-blue" />
                    </div>
                    <span className="text-gray-700 font-bold text-sm">Offline viewing on mobile</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-5 w-5 rounded-full bg-growlity-blue/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-growlity-blue" />
                    </div>
                    <span className="text-gray-700 font-bold text-sm">Course Completion Certificates</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-5 w-5 rounded-full bg-growlity-blue/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-growlity-blue" />
                    </div>
                    <span className="text-gray-700 font-bold text-sm">Direct Instructor Support</span>
                  </div>
                </div>

                <Button 
                  onClick={() => handleSubscribe(plan.id)}
                  className={cn(
                    "w-full h-16 rounded-[24px] font-black text-lg transition-all group-hover:scale-[1.02]",
                    plan.name.toLowerCase().includes('pro') || plan.name.toLowerCase().includes('premium')
                      ? "bg-growlity-blue hover:bg-growlity-blue-hover text-white shadow-xl shadow-growlity-blue/20"
                      : "bg-gray-900 hover:bg-gray-800 text-white shadow-xl shadow-gray-900/10"
                  )}
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Social Proof */}
        <div className="mt-32 text-center">
          <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] mb-12">Trusted by students worldwide</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="h-6 w-6 text-growlity-blue" />
                <span className="font-black text-xl italic tracking-tighter">SECURE+</span>
             </div>
             <div className="flex items-center justify-center gap-2">
                <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
                <span className="font-black text-xl italic tracking-tighter text-gray-700">4.9/5 RATING</span>
             </div>
             <div className="flex items-center justify-center gap-2">
                <Users className="h-6 w-6 text-growlity-green" />
                <span className="font-black text-xl italic tracking-tighter text-gray-700">10k+ LEARNERS</span>
             </div>
             <div className="flex items-center justify-center gap-2">
                <Zap className="h-6 w-6 text-growlity-blue" />
                <span className="font-black text-xl italic tracking-tighter text-gray-700">GROWLITY PRO</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
