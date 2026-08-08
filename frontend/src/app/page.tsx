"use client";

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [analytics, setAnalytics] = useState({ total_videos: 0, total_templates: 0 });
  const [topVideos, setTopVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsRes, videosRes] = await Promise.all([
          fetch('http://localhost:8000/api/analytics'),
          fetch('http://localhost:8000/api/videos/top')
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
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-lg font-medium text-gray-400">Total Videos</h3>
          <p className="text-3xl font-bold text-white mt-2">{loading ? "..." : analytics.total_videos}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-lg font-medium text-gray-400">Analyzed</h3>
          <p className="text-3xl font-bold text-white mt-2">{loading ? "..." : "0"}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-lg font-medium text-gray-400">Viral Templates</h3>
          <p className="text-3xl font-bold text-white mt-2">{loading ? "..." : analytics.total_templates}</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Recent Trending</h2>
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-700 border-b border-gray-600">
              <th className="p-4 text-sm font-semibold text-gray-300">Title</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Platform</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Views</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Trend Score</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">Loading...</td>
              </tr>
            ) : topVideos.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">No trending videos found.</td>
              </tr>
            ) : (
              topVideos.map((video: any) => (
                <tr key={video.id} className="border-b border-gray-700">
                  <td className="p-4">{video.title || 'Untitled'}</td>
                  <td className="p-4">{video.platform || 'Unknown'}</td>
                  <td className="p-4">{video.views || '0'}</td>
                  <td className="p-4">{video.trend_score || '0'}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-900 text-green-300 rounded text-xs">
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
