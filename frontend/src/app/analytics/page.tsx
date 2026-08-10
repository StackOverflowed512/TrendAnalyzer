"use client";

import { useEffect, useState } from 'react';
import { BarChart2, Video, LayoutTemplate, Activity } from 'lucide-react';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState({ total_videos: 0, total_templates: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/analytics');
        if (res.ok) {
          const data = await res.json();
          setAnalytics(data);
        }
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center mb-8">
        <BarChart2 className="w-8 h-8 mr-3 text-amber-500" />
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2 tracking-tight">Analytics Overview</h1>
          <p className="text-gray-400">Deep dive into your viral content performance.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-8 animate-fade-in stagger-1 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Video className="w-32 h-32 text-blue-500" />
          </div>
          <div className="flex items-center mb-6 relative z-10">
            <div className="bg-blue-500/20 p-3 rounded-xl mr-4 shadow-lg shadow-blue-500/10">
              <Video className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-300">Total Analyzed Videos</h3>
          </div>
          <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 relative z-10">
            {loading ? "..." : analytics.total_videos}
          </p>
        </div>
        
        <div className="glass-card p-8 animate-fade-in stagger-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <LayoutTemplate className="w-32 h-32 text-emerald-500" />
          </div>
          <div className="flex items-center mb-6 relative z-10">
            <div className="bg-emerald-500/20 p-3 rounded-xl mr-4 shadow-lg shadow-emerald-500/10">
              <LayoutTemplate className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-300">Extracted Templates</h3>
          </div>
          <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 relative z-10">
            {loading ? "..." : analytics.total_templates}
          </p>
        </div>
      </div>
      
      <div className="glass-card p-12 text-center animate-fade-in stagger-3 border-dashed border-2 border-white/10 hover:border-white/20 transition-colors">
        <Activity className="w-12 h-12 text-gray-500 mx-auto mb-4 animate-pulse" />
        <h3 className="text-2xl font-bold text-gray-300 mb-3 tracking-tight">Advanced Analytics Coming Soon</h3>
        <p className="text-gray-500 max-w-lg mx-auto">
          We are currently gathering more data. Soon, you'll see deep-dive charts, pattern heatmaps, and retention curve estimations here.
        </p>
      </div>
    </div>
  );
}
