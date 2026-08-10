import { Settings as SettingsIcon, Server, Palette, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center mb-8">
        <SettingsIcon className="w-8 h-8 mr-3 text-slate-400" />
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2 tracking-tight">Settings</h1>
          <p className="text-gray-400">Manage your Viral Reel Intelligence preferences.</p>
        </div>
      </div>
      
      <div className="glass-card p-8 max-w-2xl animate-fade-in stagger-1">
        <h2 className="text-xl font-semibold mb-6 text-white flex items-center border-b border-white/10 pb-4">
          <Server className="w-5 h-5 mr-2 text-blue-400" />
          Application Configuration
        </h2>
        
        <div className="space-y-6">
          <div className="group">
            <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-blue-400 transition-colors">API Endpoint</label>
            <div className="relative">
              <input 
                type="text" 
                disabled 
                value="http://localhost:8000"
                className="w-full bg-white/5 border border-white/10 text-gray-400 px-4 py-3 rounded-xl cursor-not-allowed shadow-inner focus:outline-none"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-emerald-500">Connected</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 ml-1">Currently hardcoded for local development environment.</p>
          </div>
          
          <div className="group">
            <label className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-purple-400 transition-colors flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              Theme
            </label>
            <select disabled className="w-full bg-white/5 border border-white/10 text-gray-400 px-4 py-3 rounded-xl cursor-not-allowed shadow-inner focus:outline-none appearance-none">
              <option>Dark Glass (Default)</option>
            </select>
          </div>
          
          <div className="pt-8 mt-8 border-t border-white/10 flex justify-end">
            <button disabled className="flex items-center bg-white/5 text-gray-500 px-6 py-3 rounded-full font-medium cursor-not-allowed transition-all border border-white/5">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
