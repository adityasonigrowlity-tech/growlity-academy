"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock, Github, ArrowRight, Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/common/Logo";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
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
      const response = await login({ email, password, role });
      toast.success(response.message || "Welcome back to Growlity!");
      const userRole = response.data.user.role;
      if (userRole === 'corporate_hr') {
        router.push("/business");
      } else if (userRole === 'instructor') {
        router.push("/instructor");
      } else {
        router.push("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Invalid credentials";
      toast.error(
        typeof errorMessage === "string" ? errorMessage : "Login failed",
      );
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row font-sans lg:overflow-hidden">
      {/* Left Column: Brand & Inspiration (hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-growlity-blue via-growlity-blue-hover to-growlity-green items-center justify-center p-12 relative overflow-hidden">
        {/* Back to Home Button */}
        <Link 
          href="/" 
          className="absolute top-8 left-8 z-20 flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-bold transition-all hover:scale-105 group"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-growlity-green/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="relative z-10 max-w-md text-white text-center">
          <div className="mb-12 inline-block p-4 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-growlity-blue bg-gray-200 flex items-center justify-center overflow-hidden">
                    <Image src={`https://i.pravatar.cc/150?u=${i}`} alt="user" width={40} height={40} />
                  </div>
                ))}
              </div>
              <p className="text-sm font-semibold text-white/90">Trusted by Experts</p>
            </div>
            <p className="text-2xl font-bold">Over 10,000+ professionals certified</p>
          </div>
          
          <h2 className="text-5xl font-black mb-6 leading-tight">Empower Your Career with Growlity</h2>
          <p className="text-xl text-blue-50/80 leading-relaxed font-medium">
            Join the world's most innovative learning platform and unlock your full potential with industry-leading courses.
          </p>
        </div>

        {/* Brand Decoration */}
        <div className="absolute bottom-12 left-12 flex items-center gap-2 opacity-50">
          <div className="h-2 w-12 bg-white rounded-full" />
          <div className="h-2 w-2 bg-white rounded-full" />
          <div className="h-2 w-2 bg-white rounded-full" />
        </div>
      </div>

      {/* Right Column: Clean Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center min-h-screen lg:min-h-0 p-6 sm:p-10 lg:p-12 lg:overflow-y-auto relative">
        {/* Mobile Back to Home */}
        <Link 
          href="/" 
          className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-growlity-blue font-bold text-sm transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Home
        </Link>

        <div className="w-full max-w-[440px] flex flex-col justify-center animate-in fade-in slide-in-from-right-8 duration-700 auth-form-wrapper">
          {/* Logo & Header */}
          <div className="mb-4 sm:mb-8 text-center">
            <Logo size="lg" className="mb-2" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Member Login</h1>
            <p className="text-sm sm:text-base text-gray-500 font-medium">Access your learning dashboard</p>
          </div>



          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Email address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-growlity-blue" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-11 sm:pl-12 h-12 sm:h-14 bg-gray-50/50 border-gray-200 rounded-2xl transition-all focus:bg-white focus:ring-4 focus:ring-growlity-blue/10 focus:border-growlity-blue font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-sm font-bold text-gray-700">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs sm:text-sm font-bold text-growlity-blue hover:text-growlity-blue-hover transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-growlity-blue" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-11 pr-11 sm:pl-12 sm:pr-12 h-12 sm:h-14 bg-gray-50/50 border-gray-200 rounded-2xl transition-all focus:bg-white focus:ring-4 focus:ring-growlity-blue/10 focus:border-growlity-blue font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-growlity-blue transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 sm:h-14 bg-growlity-blue hover:bg-growlity-blue-hover text-white font-bold text-lg rounded-2xl transition-all active:scale-[0.98] shadow-xl shadow-growlity-blue/20 flex items-center justify-center gap-2 group"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
              ) : (
                <>
                  Sign In 
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          {/* Social Login Separator */}
          <div className="relative my-6 sm:my-8">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">or</span>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm sm:text-base text-gray-500 font-medium">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-growlity-blue hover:text-growlity-blue-hover font-black underline underline-offset-4 decoration-2"
              >
                Join for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
