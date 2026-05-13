import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-24 text-center">
      <div className="relative mb-8">
        <div className="absolute -inset-4 bg-growlity-green/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>
        <div className="relative bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800">
          <AlertCircle className="w-16 h-16 text-growlity-green" />
        </div>
      </div>
      
      <h1 className="text-7xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-growlity-green to-growlity-blue bg-clip-text text-transparent">
        404
      </h1>
      
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
        Oops! Page Not Found
      </h2>
      
      <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mb-12 text-lg leading-relaxed">
        The page you're looking for seems to have vanished into the digital void. 
        Don't worry, even the best explorers get lost sometimes!
      </p>
      
      <Link 
        href="/"
        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-growlity-green hover:bg-growlity-green-hover text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-growlity-green/25 hover:-translate-y-0.5"
      >
        <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
        Back to Academy Home
      </Link>
      
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl">
        <div className="p-4 rounded-lg border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/50">
          <span className="block text-growlity-green font-bold text-xl mb-1">Check URL</span>
          <span className="text-sm text-zinc-500">Double check the spelling</span>
        </div>
        <div className="p-4 rounded-lg border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/50">
          <span className="block text-growlity-blue font-bold text-xl mb-1">Navigation</span>
          <span className="text-sm text-zinc-500">Use the menu above</span>
        </div>
        <div className="p-4 rounded-lg border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/50">
          <span className="block text-destructive font-bold text-xl mb-1">Support</span>
          <span className="text-sm text-zinc-500">Contact our help desk</span>
        </div>
      </div>
    </div>
  );
}
