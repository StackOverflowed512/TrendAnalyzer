import Link from 'next/link';
import { Home, TrendingUp, LayoutTemplate, PenTool, BarChart2, Settings, Video } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 glass-nav border-r border-white/5 shadow-2xl z-20">
      <div className="flex items-center justify-center h-20 border-b border-white/5 px-6 gap-3">
        <div className="bg-blue-600 p-2 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.5)]">
          <Video className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 tracking-tight">Viral Intel</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto pt-6">
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/" className="flex items-center px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-300 group">
            <Home className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all" />
            <span className="font-medium tracking-wide text-sm">Dashboard</span>
          </Link>
          <Link href="/trending" className="flex items-center px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-300 group">
            <TrendingUp className="w-5 h-5 mr-3 text-gray-400 group-hover:text-red-400 group-hover:scale-110 transition-all" />
            <span className="font-medium tracking-wide text-sm">Trending Videos</span>
          </Link>
          <Link href="/templates" className="flex items-center px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-300 group">
            <LayoutTemplate className="w-5 h-5 mr-3 text-gray-400 group-hover:text-emerald-400 group-hover:scale-110 transition-all" />
            <span className="font-medium tracking-wide text-sm">Viral Templates</span>
          </Link>
          <Link href="/prompts" className="flex items-center px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-300 group">
            <PenTool className="w-5 h-5 mr-3 text-gray-400 group-hover:text-purple-400 group-hover:scale-110 transition-all" />
            <span className="font-medium tracking-wide text-sm">Prompt Generator</span>
          </Link>
          <Link href="/analytics" className="flex items-center px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-300 group">
            <BarChart2 className="w-5 h-5 mr-3 text-gray-400 group-hover:text-amber-400 group-hover:scale-110 transition-all" />
            <span className="font-medium tracking-wide text-sm">Analytics</span>
          </Link>
          <Link href="/settings" className="flex items-center px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-300 group">
            <Settings className="w-5 h-5 mr-3 text-gray-400 group-hover:text-slate-300 group-hover:scale-110 transition-all" />
            <span className="font-medium tracking-wide text-sm">Settings</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
