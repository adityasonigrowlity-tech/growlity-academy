'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Settings, 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Globe, 
  Save,
  Camera,
  Mail,
  Smartphone,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // toast.success("Settings saved successfully!");
    }, 1000);
  };

  if (loading || !user) {
    return (
      <div className="h-[70vh] flex items-center justify-center bg-gray-50/50">
        <Loader2 className="h-10 w-10 text-growlity-blue animate-spin" />
      </div>
    );
  }

  // Get initials for Avatar fallback
  const initials = user.name
    ? user.name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().substring(0, 2)
    : 'A';

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 animate-in fade-in duration-500 max-w-5xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">System Settings</h1>
        <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">Manage your administrator account, platform preferences, and security.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-5 sm:space-y-8">
        <TabsList className="bg-gray-100 p-1 rounded-xl sm:rounded-2xl h-11 sm:h-14 border border-gray-200 shadow-sm grid grid-cols-3 w-full">
          <TabsTrigger value="profile" className="rounded-lg sm:rounded-xl px-1 sm:px-8 font-black text-[10px] sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg sm:rounded-xl px-1 sm:px-8 font-black text-[10px] sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Bell className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Notify
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg sm:rounded-xl px-1 sm:px-8 font-black text-[10px] sm:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 sm:space-y-6">
          <Card className="border-none shadow-xl shadow-gray-200/50 rounded-xl sm:rounded-[40px] overflow-hidden bg-white p-4 sm:p-8 transition-all">
            <CardContent className="p-0 space-y-6 sm:space-y-10">
              <div className="flex flex-col md:flex-row gap-4 sm:gap-10 items-center md:items-center text-center md:text-left">
                <div className="relative group">
                   <Avatar className="h-20 w-20 sm:h-32 sm:w-32 border-4 border-white shadow-2xl transition-all">
                      <AvatarImage src={user.profile_image || `https://i.pravatar.cc/150?u=${user.id}`} />
                      <AvatarFallback className="bg-growlity-blue text-white font-black text-2xl sm:text-4xl">{initials}</AvatarFallback>
                   </Avatar>
                   <button className="absolute bottom-1 right-1 h-7 w-7 sm:h-10 sm:w-10 bg-gray-900 text-white rounded-full flex items-center justify-center border-2 sm:border-4 border-white shadow-xl hover:bg-black transition-all">
                      <Camera className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                   </button>
                </div>
                <div className="flex-1">
                   <h3 className="text-lg sm:text-2xl font-black text-gray-900 leading-tight">{user.name || 'Administrator'}</h3>
                   <p className="text-[11px] sm:text-base text-gray-500 font-medium mt-1">Manage account details.</p>
                   <div className="flex justify-center md:justify-start gap-3 mt-4 sm:mt-6">
                      <Button variant="outline" className="h-9 sm:h-10 rounded-lg sm:rounded-xl border-gray-100 font-bold px-3 text-[10px] sm:text-sm">Change Photo</Button>
                      <Button variant="ghost" className="h-9 sm:h-10 rounded-lg sm:rounded-xl text-red-500 font-bold text-[10px] sm:text-sm">Remove</Button>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-[11px] sm:text-sm font-bold text-gray-700 ml-1">Full Name</Label>
                  <Input defaultValue={user.name} className="h-11 sm:h-14 bg-gray-50 border-none rounded-xl sm:rounded-2xl font-medium px-4 sm:px-5 focus:ring-4 focus:ring-growlity-blue/10 text-xs sm:text-base" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-[11px] sm:text-sm font-bold text-gray-700 ml-1">Work Email</Label>
                  <Input defaultValue={user.email} className="h-11 sm:h-14 bg-gray-50 border-none rounded-xl sm:rounded-2xl font-medium px-4 sm:px-5 focus:ring-4 focus:ring-growlity-blue/10 text-xs sm:text-base" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-[11px] sm:text-sm font-bold text-gray-700 ml-1">System Role</Label>
                  <Input defaultValue={user.role || 'Admin'} disabled className="h-11 sm:h-14 bg-gray-50 border-none rounded-xl sm:rounded-2xl font-black text-growlity-blue px-4 sm:px-5 uppercase tracking-widest text-[9px] sm:text-[10px]" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label className="text-[11px] sm:text-sm font-bold text-gray-700 ml-1">Language</Label>
                  <Input defaultValue="English (US)" className="h-11 sm:h-14 bg-gray-50 border-none rounded-xl sm:rounded-2xl font-medium px-4 sm:px-5 focus:ring-4 focus:ring-growlity-blue/10 text-xs sm:text-base" />
                </div>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-gray-50 flex justify-end">
                <Button onClick={handleSave} className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white font-black rounded-xl sm:rounded-2xl h-11 sm:h-14 px-10 shadow-xl shadow-gray-900/10 flex gap-2 justify-center transition-all">
                  <Save className="h-5 w-5" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-5">
           <Card className="border-none shadow-xl shadow-gray-200/50 rounded-xl sm:rounded-[40px] overflow-hidden bg-white p-4 sm:p-8">
              <CardContent className="p-0 space-y-3 sm:space-y-8">
                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 sm:p-6 bg-gray-50 rounded-2xl sm:rounded-[32px] border border-gray-100 gap-3">
                    <div className="flex items-center gap-3 text-left">
                       <div className="h-9 w-9 sm:h-12 sm:w-12 bg-white rounded-lg sm:rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                          <Mail className="h-4.5 w-4.5 sm:h-6 sm:w-6 text-growlity-blue" />
                       </div>
                       <div>
                          <p className="text-xs sm:text-base font-black text-gray-900 tracking-tight">Email Alerts</p>
                          <p className="text-[9px] sm:text-xs text-gray-500 font-medium">Updates via email</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-[9px] font-bold text-gray-400 sm:hidden uppercase tracking-wider">Enable</span>
                      <Switch defaultChecked className="scale-75 sm:scale-100" />
                    </div>
                 </div>
                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 sm:p-6 bg-gray-50 rounded-2xl sm:rounded-[32px] border border-gray-100 opacity-60 gap-3">
                    <div className="flex items-center gap-3 text-left">
                       <div className="h-9 w-9 sm:h-12 sm:w-12 bg-white rounded-lg sm:rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                          <Smartphone className="h-4.5 w-4.5 sm:h-6 sm:w-6 text-purple-600" />
                       </div>
                       <div>
                          <p className="text-xs sm:text-base font-black text-gray-900 tracking-tight">Push Alerts</p>
                          <p className="text-[9px] sm:text-xs text-gray-500 font-medium">Desktop notifications</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-[9px] font-bold text-gray-400 sm:hidden uppercase tracking-wider">Enable</span>
                      <Switch className="scale-75 sm:scale-100" />
                    </div>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}
