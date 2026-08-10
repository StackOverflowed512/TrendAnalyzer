import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between h-20 px-8 glass-nav border-b border-white/5 sticky top-0 z-10 backdrop-blur-xl">
      <div className="flex items-center relative w-96 group">
        <Search className="w-4 h-4 text-gray-400 absolute left-4 group-focus-within:text-blue-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Search trends, templates..." 
          className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-11 pr-4 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all focus:bg-white/10 shadow-inner"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
          <Bell className="w-5 h-5" />
        </button>
        <button className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all hover:scale-105 active:scale-95 shadow-lg">
          Discover Now
        </button>
      </div>
    </header>
  );
}
