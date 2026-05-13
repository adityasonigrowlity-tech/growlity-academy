'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Loader2, ShieldPlus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/common/Logo";

export default function AdminSignupPage() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      // Note: Backend signup currently forbids role='admin' for security.
      // This page is for UI demonstration, or would need a secret code to work.
      const response = await signup({ name, email, password, role: 'admin' });
      toast.success("Admin request received. Welcome to the team!");
      router.push("/admin");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Admin registration failed. Please contact root admin.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[460px] animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-10">
        <Logo size="lg" className="mb-6" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 text-[10px] font-black uppercase tracking-widest mb-4">
          <ShieldPlus className="h-3 w-3" />
          New Administrator Request
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Create Admin</h1>
        <p className="text-gray-500 font-medium mt-2">Register as a new management team member</p>
      </div>

      <Card className="border-none shadow-2xl shadow-purple-500/5 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/20">
        <CardContent className="p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1">Full Name</Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="pl-11 h-14 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Work Email</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@growlity.com"
                  className="pl-11 h-14 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-bold text-gray-700 ml-1">Access Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-14 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gray-900 hover:bg-black text-white font-bold text-lg rounded-2xl transition-all shadow-xl shadow-gray-900/10 flex items-center justify-center gap-2 group active:scale-[0.98] mt-4"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>Request Board Access</>
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-gray-400 font-bold uppercase tracking-widest mt-8">
            Already have admin access? <Link href="/admin/login" className="text-purple-600 hover:underline">Log in</Link>
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 text-center flex items-center justify-center">
        <Link href="/admin/login" className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Admin Login
        </Link>
      </div>
    </div>
  );
}
