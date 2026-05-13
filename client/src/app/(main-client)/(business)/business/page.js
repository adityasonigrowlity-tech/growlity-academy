'use client';

export default function BusinessDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl shadow-gray-200 text-center border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="h-20 w-20 bg-blue-50 border border-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
           <span className="text-4xl">🏢</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight mb-4">Business Dashboard</h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm bg-gray-50 py-3 rounded-2xl border border-gray-100">
          This is the business page
        </p>
        <div className="mt-12 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
           <div className="h-full w-1/3 bg-growlity-blue rounded-full" />
        </div>
      </div>
    </div>
  );
}
