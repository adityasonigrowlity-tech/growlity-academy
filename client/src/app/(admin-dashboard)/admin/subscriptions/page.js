"use client";

import { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Users, 
  CheckCircle2, 
  XCircle,
  Clock,
  Loader2,
  Calendar,
  DollarSign
} from 'lucide-react';
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  getAdminSubscriptionPlans, 
  createAdminSubscriptionPlan, 
  updateAdminSubscriptionPlan, 
  deleteAdminSubscriptionPlan,
  getAdminUserSubscriptions 
} from '@/services/admin.service';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState('plans');
  const [plans, setPlans] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    billing_cycle: 'monthly',
    course_access_type: 'all_courses',
    max_courses: '',
    status: 'active'
  });

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await getAdminSubscriptionPlans();
      if (res.success) {
        setPlans(res.data);
      }
    } catch (error) {
      toast.error('Failed to fetch subscription plans');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserSubscriptions = async (search = '') => {
    try {
      setLoading(true);
      const res = await getAdminUserSubscriptions({ search });
      if (res.success) {
        setUserSubscriptions(res.data);
      }
    } catch (error) {
      toast.error('Failed to fetch user subscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'plans') {
      fetchPlans();
    } else {
      fetchUserSubscriptions(searchTerm);
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'subscribers') {
      const delayDebounceFn = setTimeout(() => {
        fetchUserSubscriptions(searchTerm);
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  const handleOpenDialog = (plan = null) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        name: plan.name,
        description: plan.description || '',
        price: plan.price.toString(),
        billing_cycle: plan.billing_cycle,
        course_access_type: plan.course_access_type,
        max_courses: plan.max_courses ? plan.max_courses.toString() : '',
        status: plan.status
      });
    } else {
      setEditingPlan(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        billing_cycle: 'monthly',
        course_access_type: 'all_courses',
        max_courses: '',
        status: 'active'
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        max_courses: formData.max_courses ? parseInt(formData.max_courses) : null
      };

      if (editingPlan) {
        const res = await updateAdminSubscriptionPlan(editingPlan.id, data);
        if (res.success) {
          toast.success('Plan updated successfully');
          fetchPlans();
        }
      } else {
        const res = await createAdminSubscriptionPlan(data);
        if (res.success) {
          toast.success('Plan created successfully');
          fetchPlans();
        }
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save plan');
    }
  };

  const handleDeletePlan = async (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        const res = await deleteAdminSubscriptionPlan(id);
        if (res.success) {
          toast.success('Plan deleted successfully');
          fetchPlans();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete plan');
      }
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Subscriptions</h1>
          <p className="text-gray-500 font-medium mt-1">Manage plans and monitor your subscriber base.</p>
        </div>
        {activeTab === 'plans' && (
          <Button 
            onClick={() => handleOpenDialog()}
            className="bg-growlity-blue hover:bg-growlity-blue-hover text-white font-bold rounded-xl h-12 px-6 shadow-lg shadow-growlity-blue/20 flex gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Plan
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-100/50 p-1 rounded-2xl mb-8">
          <TabsTrigger value="plans" className="rounded-xl font-bold py-2 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Subscription Plans
          </TabsTrigger>
          <TabsTrigger value="subscribers" className="rounded-xl font-bold py-2 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Active Subscribers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {loading ? (
               <div className="col-span-full flex justify-center py-20">
                 <Loader2 className="h-8 w-8 text-growlity-blue animate-spin" />
               </div>
             ) : plans.length === 0 ? (
               <div className="col-span-full text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
                 <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                 <p className="text-gray-500 font-bold">No plans found. Create your first plan!</p>
               </div>
             ) : plans.map((plan) => (
               <div key={plan.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all p-6 flex flex-col group">
                 <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-blue-50 text-growlity-blue rounded-2xl group-hover:scale-110 transition-transform">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <Badge className={cn(
                      "font-black uppercase tracking-widest text-[9px]",
                      plan.status === 'active' ? "bg-green-500" : "bg-gray-400"
                    )}>
                      {plan.status}
                    </Badge>
                 </div>
                 <h3 className="text-xl font-black text-gray-900 mb-2">{plan.name}</h3>
                 <p className="text-gray-500 text-sm font-medium mb-6 flex-1">{plan.description || 'No description provided.'}</p>
                 
                 <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-bold">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span>${parseFloat(plan.price).toFixed(2)} / {plan.billing_cycle}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-bold">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{plan._count?.user_subscriptions || 0} active subscribers</span>
                    </div>
                 </div>

                 <div className="flex gap-2 pt-6 border-t border-gray-50">
                    <Button 
                      variant="outline" 
                      className="flex-1 rounded-xl font-bold h-10 border-gray-100 hover:bg-gray-50"
                      onClick={() => handleOpenDialog(plan)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      className="rounded-xl p-2 h-10 w-10 border-gray-100 text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleDeletePlan(plan.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                 </div>
               </div>
             ))}
          </div>
        </TabsContent>

        <TabsContent value="subscribers">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search subscribers..." 
                  className="pl-11 h-12 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-growlity-blue/10 transition-all font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="relative min-h-[400px]">
              {loading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10">
                  <Loader2 className="h-8 w-8 text-growlity-blue animate-spin" />
                </div>
              )}
              
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-gray-100 uppercase tracking-widest text-[10px] font-black">
                    <TableHead className="w-[300px] pl-8">Subscriber</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right pr-8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userSubscriptions.length === 0 && !loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-gray-500 font-medium">
                        No active subscribers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    userSubscriptions.map((sub) => (
                      <TableRow key={sub.id} className="hover:bg-gray-50/50 border-gray-100 transition-colors">
                        <TableCell className="pl-8 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                              <AvatarImage src={sub.user.profile_image} />
                              <AvatarFallback className="bg-gray-100 font-bold text-gray-400">{sub.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-black text-gray-900">{sub.user.name}</span>
                              <span className="text-xs text-gray-400 font-medium">{sub.user.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-gray-700">
                          {sub.plan.name}
                        </TableCell>
                        <TableCell className="text-gray-500 font-medium">
                          {new Date(sub.start_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-gray-500 font-medium">
                          {new Date(sub.end_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "font-black uppercase tracking-widest text-[9px]",
                            sub.status === 'active' ? "bg-green-500" : "bg-red-500"
                          )}>
                            {sub.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-gray-100">
                            <MoreHorizontal className="h-5 w-5 text-gray-400" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create/Edit dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl p-8 border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-900">{editingPlan ? 'Edit Plan' : 'Create New Plan'}</DialogTitle>
            <DialogDescription className="font-medium text-gray-500">
              {editingPlan ? 'Modify the existing subscription plan details.' : 'Define a new subscription model for your students.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold text-gray-700">Plan Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Monthly Premium"
                className="h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-growlity-blue/10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-bold text-gray-700">Description</Label>
              <Input 
                id="description" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="What is included in this plan?"
                className="h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-growlity-blue/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="font-bold text-gray-700">Price ($)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  step="0.01"
                  value={formData.price} 
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="29.99"
                  className="h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-growlity-blue/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-gray-700">Billing Cycle</Label>
                <Select 
                  value={formData.billing_cycle} 
                  onValueChange={(v) => setFormData({...formData, billing_cycle: v})}
                >
                  <SelectTrigger className="h-12 bg-gray-50 border-none rounded-xl">
                    <SelectValue placeholder="Cycle" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                    <SelectItem value="monthly" className="rounded-lg">Monthly</SelectItem>
                    <SelectItem value="yearly" className="rounded-lg">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-bold text-gray-700">Access Type</Label>
                <Select 
                  value={formData.course_access_type} 
                  onValueChange={(v) => setFormData({...formData, course_access_type: v})}
                >
                  <SelectTrigger className="h-12 bg-gray-50 border-none rounded-xl">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                    <SelectItem value="all_courses" className="rounded-lg">All Courses</SelectItem>
                    <SelectItem value="selected_courses" className="rounded-lg">Selected Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-gray-700">Max Courses (Optional)</Label>
                <Input 
                  id="max_courses" 
                  type="number"
                  value={formData.max_courses} 
                  onChange={(e) => setFormData({...formData, max_courses: e.target.value})}
                  placeholder="Empty for unlimited"
                  className="h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-growlity-blue/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(v) => setFormData({...formData, status: v})}
              >
                <SelectTrigger className="h-12 bg-gray-50 border-none rounded-xl">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                  <SelectItem value="active" className="rounded-lg">Active</SelectItem>
                  <SelectItem value="inactive" className="rounded-lg">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="pt-6">
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
              <Button type="submit" className="bg-growlity-blue hover:bg-growlity-blue-hover text-white font-bold rounded-xl h-12 px-8">
                {editingPlan ? 'Update Plan' : 'Create Plan'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
