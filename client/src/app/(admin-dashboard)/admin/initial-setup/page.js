'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ShieldAlert, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";
import Logo from "@/components/common/Logo";

export default function InitialAdminSetupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required for setup");
      return;
    }

    setIsLoading(true);

    try {
      // Direct call to our new initialization endpoint
      const response = await axios.post("http://localhost:5000/api/auth/initial-setup", formData);
      toast.success("Root Admin initialized! You can now log in.");
      setTimeout(() => router.push("/admin/login"), 2000);
    } catch (error) {
      const msg = error.response?.data?.message || "Setup failed. An admin might already exist.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[480px] animate-in fade-in zoom-in duration-1000">
      <div className="text-center mb-10">
        <Logo size="lg" className="mb-6 mx-auto" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-4">
          <ShieldAlert className="h-4 w-4" />
          First-Run Initialization
        </div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">Root Configuration</h1>
        <p className="text-gray-500 font-medium mt-3 px-4">Create the master administrator account to unlock your platform management suite.</p>
      </div>

      <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[40px] overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/20">
        <CardContent className="p-10 sm:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700 ml-1">Master Name</Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  placeholder="e.g. John Doe"
                  className="pl-12 h-14 bg-gray-50 border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700 ml-1">Administrator Email</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  type="email"
                  placeholder="admin@growlity.com"
                  className="pl-12 h-14 bg-gray-50 border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-bold text-gray-700 ml-1">Security Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-12 h-14 bg-gray-50 border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 bg-gray-900 hover:bg-black text-white font-black text-lg rounded-3xl transition-all shadow-2xl shadow-gray-900/10 flex items-center justify-center gap-3 active:scale-[0.97] group mt-4 overflow-hidden"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  Initialize System
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100 italic">
            <Sparkles className="h-4 w-4 text-orange-500" />
            <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-widest text-center">
              Account will be granted root privileges
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
