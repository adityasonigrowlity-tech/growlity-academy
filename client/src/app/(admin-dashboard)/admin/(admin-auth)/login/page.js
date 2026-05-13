'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/common/Logo";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      // We pass role: 'admin' explicitly for the admin login page
      const response = await login({ email, password, role: 'admin' });
      toast.success("Welcome back, Commander!");
      router.push("/admin");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Invalid admin credentials";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-10">
        <Logo size="lg" className="mb-6" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-growlity-blue/10 border border-growlity-blue/20 text-growlity-blue text-[10px] font-black uppercase tracking-widest mb-4">
          <ShieldCheck className="h-3 w-3" />
          Administrative Portal
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Login</h1>
        <p className="text-gray-500 font-medium mt-2">Access the Growlity management suite</p>
      </div>

      <Card className="border-none shadow-2xl shadow-growlity-blue/5 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/20">
        <CardContent className="p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Work Email</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-growlity-blue transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@growlity.com"
                  className="pl-11 h-14 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-growlity-blue/10 transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-sm font-bold text-gray-700">Security Key</Label>
                <Link href="#" className="text-xs font-bold text-growlity-blue hover:underline">Reset access?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-growlity-blue transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-11 pr-11 h-14 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-growlity-blue/10 transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-growlity-blue transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gray-900 hover:bg-black text-white font-bold text-lg rounded-2xl transition-all shadow-xl shadow-gray-900/10 flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>Authorize Session</>
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-gray-400 font-bold uppercase tracking-widest mt-8">
            Restricted access only. <Link href="/admin/signup" className="text-growlity-blue hover:underline">Request Account</Link>
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <Link href="/" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors">
          Return to public site
        </Link>
      </div>
    </div>
  );
}
