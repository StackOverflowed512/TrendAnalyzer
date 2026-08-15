"use client";

import { useEffect, useState } from 'react';
import { Video, LayoutTemplate, Activity, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [analytics, setAnalytics] = useState({ total_videos: 0, total_templates: 0 });
  const [topVideos, setTopVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const [analyticsRes, videosRes] = await Promise.all([
          fetch(`${baseUrl}/api/analytics`),
          fetch(`${baseUrl}/api/videos/top`)
        ]);
        
        if (analyticsRes.ok) {
          const analyticsData = await analyticsRes.json();
          setAnalytics(analyticsData);
        }
        
        if (videosRes.ok) {
          const videosData = await videosRes.json();
          setTopVideos(videosData);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2 tracking-tight">Dashboard</h1>
          <p className="text-gray-400">Overview of your viral intelligence data.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-card p-6 animate-fade-in stagger-1 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Video className="w-16 h-16 text-blue-500" />
          </div>
          <div className="flex items-center mb-4">
            <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
              <Video className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-300">Total Videos</h3>
          </div>
          <p className="text-4xl font-bold text-white mt-2">{loading ? "..." : analytics.total_videos}</p>
        </div>
        
        <div className="glass-card p-6 animate-fade-in stagger-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-16 h-16 text-purple-500" />
          </div>
          <div className="flex items-center mb-4">
            <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-300">Analyzed</h3>
          </div>
          <p className="text-4xl font-bold text-white mt-2">{loading ? "..." : "0"}</p>
        </div>
        
        <div className="glass-card p-6 animate-fade-in stagger-3 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <LayoutTemplate className="w-16 h-16 text-emerald-500" />
          </div>
          <div className="flex items-center mb-4">
            <div className="bg-emerald-500/20 p-2 rounded-lg mr-3">
              <LayoutTemplate className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-300">Viral Templates</h3>
          </div>
          <p className="text-4xl font-bold text-white mt-2">{loading ? "..." : analytics.total_templates}</p>
        </div>
      </div>
      
      <div className="flex items-center mb-6">
        <TrendingUp className="w-6 h-6 mr-3 text-blue-400" />
        <h2 className="text-2xl font-bold tracking-tight">Recent Trending</h2>
      </div>
      
      <div className="glass-card overflow-hidden animate-fade-in stagger-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="p-5 text-sm font-semibold text-gray-400">Title</th>
              <th className="p-5 text-sm font-semibold text-gray-400">Platform</th>
              <th className="p-5 text-sm font-semibold text-gray-400">Views</th>
              <th className="p-5 text-sm font-semibold text-gray-400">Trend Score</th>
              <th className="p-5 text-sm font-semibold text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">Loading data...</td>
              </tr>
            ) : topVideos.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">No trending videos found. Discover some to see them here.</td>
              </tr>
            ) : (
              topVideos.map((video: any) => (
                <tr key={video.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 font-medium">{video.title || 'Untitled'}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      video.platform?.toLowerCase() === 'youtube' 
                        ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                        : video.platform?.toLowerCase() === 'tiktok'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                        : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {video.platform || 'Unknown'}
                    </span>
                  </td>
                  <td className="p-5 text-gray-300">{video.views || '0'}</td>
                  <td className="p-5 text-blue-400 font-medium">{video.trend_score || '0'}</td>
                  <td className="p-5">
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium flex items-center inline-flex">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></div>
                      Analyzed
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
