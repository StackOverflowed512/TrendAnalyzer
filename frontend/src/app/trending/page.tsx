"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, RefreshCw, ChevronRight, Play } from 'lucide-react';

export default function TrendingPage() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleDiscover = async () => {
    setLoading(true);
    setError('');
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${baseUrl}/api/discover`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to discover trends');
      const data = await res.json();
      setTrends(data.trends || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePrompt = async (trend: any) => {
    setSavingId(trend.id);
    setError('');
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${baseUrl}/api/videos/save-trend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: trend.id,
          title: trend.title || 'Untitled',
          description: trend.description || '',
          platform: trend.platform,
          viewCount: String(trend.viewCount || '0'),
          likeCount: String(trend.likeCount || '0')
        })
      });
      
      if (!res.ok) throw new Error('Failed to save trend for analysis');
      const data = await res.json();
      
      // Redirect to prompts page with the internal video ID
      router.push(`/prompts?videoId=${data.video_id}`);
    } catch (err: any) {
      setError(err.message);
      setSavingId(null);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2 tracking-tight flex items-center">
            <TrendingUp className="w-8 h-8 mr-3 text-red-500" />
            Trending Videos
          </h1>
          <p className="text-gray-400">Discover what is currently going viral across platforms.</p>
        </div>
        <button 
          onClick={handleDiscover}
          disabled={loading || savingId !== null}
          className="flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Discovering...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Discover New Trends
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl mb-8 flex items-center shadow-lg backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-red-400 mr-3 animate-pulse"></div>
          {error}
        </div>
      )}

      <div className="glass-card overflow-hidden animate-fade-in stagger-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="p-5 text-sm font-semibold text-gray-400 w-1/3">Title</th>
              <th className="p-5 text-sm font-semibold text-gray-400">Platform</th>
              <th className="p-5 text-sm font-semibold text-gray-400">Description</th>
              <th className="p-5 text-sm font-semibold text-gray-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {trends.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <TrendingUp className="w-12 h-12 text-gray-600 mb-4" />
                    <p>{loading ? 'Fetching live trends from YouTube and Reddit...' : 'Click "Discover New Trends" to find viral content.'}</p>
                  </div>
                </td>
              </tr>
            ) : (
              trends.map((trend: any) => (
                <tr key={trend.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5 font-medium">
                    <div className="flex items-start">
                      <Play className="w-4 h-4 text-gray-500 mt-1 mr-3 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                      <span className="line-clamp-2">{trend.title}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      trend.platform?.toLowerCase() === 'youtube' 
                        ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                        : trend.platform?.toLowerCase() === 'tiktok'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                        : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {trend.platform}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-gray-400 max-w-md">
                    <p className="line-clamp-2">{trend.description}</p>
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => handleGeneratePrompt(trend)}
                      disabled={savingId === trend.id}
                      className="inline-flex items-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium disabled:opacity-50 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                      {savingId === trend.id ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Generate Prompt
                          <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
                        </>
                      )}
                    </button>
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
