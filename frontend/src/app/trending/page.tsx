"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      const res = await fetch('http://localhost:8000/api/discover', { method: 'POST' });
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
      const res = await fetch('http://localhost:8000/api/videos/save-trend', {
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trending Videos</h1>
        <button 
          onClick={handleDiscover}
          disabled={loading || savingId !== null}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
        >
          {loading ? 'Discovering...' : 'Discover New Trends'}
        </button>
      </div>

      {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-md mb-6">{error}</div>}

      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-700 border-b border-gray-600">
              <th className="p-4 text-sm font-semibold text-gray-300">Title</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Platform</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Description</th>
              <th className="p-4 text-sm font-semibold text-gray-300 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {trends.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-400">
                  {loading ? 'Fetching trends from YouTube and Reddit...' : 'Click "Discover New Trends" to find viral content.'}
                </td>
              </tr>
            ) : (
              trends.map((trend: any) => (
                <tr key={trend.id} className="border-b border-gray-700">
                  <td className="p-4 font-medium">{trend.title}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${trend.platform === 'youtube' ? 'bg-red-900 text-red-300' : 'bg-orange-900 text-orange-300'}`}>
                      {trend.platform}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 max-w-md truncate">{trend.description}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleGeneratePrompt(trend)}
                      disabled={savingId === trend.id}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium disabled:opacity-50 whitespace-nowrap"
                    >
                      {savingId === trend.id ? 'Processing...' : 'Generate Prompt'}
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
