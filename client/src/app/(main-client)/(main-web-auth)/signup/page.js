"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, User, Github, ChevronRight, Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/common/Logo";

export default function SignupPage() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student"); // student, instructor, corporate_hr
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (role === 'admin') {
      toast.error("Admin registration is not allowed from this page.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await signup({ name, email, password, role });
      toast.success(response.message || "Account created successfully!");
      if (role === 'corporate_hr') {
        router.push("/business");
      } else if (role === 'instructor') {
        router.push("/instructor");
      } else {
        router.push("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong";
      toast.error(
        typeof errorMessage === "string" ? errorMessage : "Registration failed",
      );
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    {
      id: "student",
      title: "Student",
      icon: User,
      description: "Learn new skills",
    },
    {
      id: "instructor",
      title: "Instructor",
      icon: Github,
      description: "Share knowledge",
    }, // Using Github as placeholder for instructor icon or similar
    {
      id: "corporate_hr",
      title: "Business",
      icon: Mail,
      description: "Train your team",
    }, // Placeholder for business icon
  ];

  return (
    <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row font-sans bg-white lg:overflow-hidden">
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
        
        <div className="relative z-10 text-center space-y-6 sm:space-y-8 animate-in fade-in zoom-in duration-1000">
          <div className="relative h-60 w-60 sm:h-80 sm:w-80 mx-auto animate-float">
            <Image
              src="/Assets/images/chart.png"
              alt="Growth Chart"
              fill
              className="object-contain"
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Join the Future
            </h2>
            <p className="text-blue-50/80 text-lg sm:text-xl font-medium max-w-sm mx-auto">
              Start your journey with the most advanced learning ecosystem
              designed for growth.
            </p>
          </div>

          <div className="flex justify-center items-center gap-8 sm:gap-12 text-white pt-4">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold">24/7</span>
              <span className="text-[10px] sm:text-sm text-white/60 uppercase tracking-widest font-bold">
                Support
              </span>
            </div>
            <div className="w-px h-10 sm:h-12 bg-white/20" />
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold">100+</span>
              <span className="text-[10px] sm:text-sm text-white/60 uppercase tracking-widest font-bold">
                Courses
              </span>
            </div>
          </div>
        </div>

        {/* Brand Decoration */}
        <div className="absolute bottom-12 left-12 flex items-center gap-2 opacity-50">
          <div className="h-2 w-12 bg-white rounded-full" />
          <div className="h-2 w-2 bg-white rounded-full" />
          <div className="h-2 w-2 bg-white rounded-full" />
        </div>
      </div>

      {/* Right Column: High-Fidelity Form */}
      <div className="w-full lg:w-[55%] bg-white flex flex-col items-center justify-center min-h-screen lg:min-h-0 p-6 sm:p-10 lg:p-12 lg:overflow-y-auto relative">
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
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Create your account</h1>
            <p className="text-sm sm:text-base text-gray-500 font-medium">Please select your role to get started</p>
          </div>

          {/* Role Toggle */}
          <div className="mb-4 sm:mb-6 p-1 bg-gray-50 rounded-2xl border border-gray-100">
            <Tabs value={role} onValueChange={setRole} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-transparent h-10 sm:h-12">
                <TabsTrigger value="student" className="rounded-xl font-bold text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-growlity-blue transition-all">
                  Student
                </TabsTrigger>
                <TabsTrigger value="instructor" className="rounded-xl font-bold text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-growlity-blue transition-all">
                  Instructor
                </TabsTrigger>
                <TabsTrigger value="corporate_hr" className="rounded-xl font-bold text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-growlity-blue transition-all">
                  Business
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1">Full Name</Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-growlity-blue transition-colors" />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="pl-11 sm:pl-12 h-12 sm:h-14 bg-gray-50/50 border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-growlity-blue/10 focus:border-growlity-blue font-medium transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Work Email</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-growlity-blue transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="pl-11 sm:pl-12 h-12 sm:h-14 bg-gray-50/50 border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-growlity-blue/10 focus:border-growlity-blue font-medium transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-bold text-gray-700 ml-1">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-growlity-blue transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="pl-11 pr-11 sm:pl-12 sm:pr-12 h-12 sm:h-14 bg-gray-50/50 border-gray-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-growlity-blue/10 focus:border-growlity-blue font-medium transition-all"
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
                  Create Account
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm sm:text-base text-gray-500 font-medium mt-6 sm:mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-growlity-blue hover:text-growlity-blue-hover font-black underline underline-offset-4 decoration-2 transition-colors"
            >
              Log in now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
