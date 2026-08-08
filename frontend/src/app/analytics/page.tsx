"use client";

import { useEffect, useState } from 'react';

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
    <div>
      <h1 className="text-3xl font-bold mb-6">Analytics Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-lg font-medium text-gray-400">Total Analyzed Videos</h3>
          <p className="text-4xl font-bold text-blue-400 mt-4">{loading ? "..." : analytics.total_videos}</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-lg font-medium text-gray-400">Extracted Templates</h3>
          <p className="text-4xl font-bold text-green-400 mt-4">{loading ? "..." : analytics.total_templates}</p>
        </div>
      </div>
      
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 text-center">
        <h3 className="text-xl font-medium text-gray-300 mb-2">More Analytics Coming Soon</h3>
        <p className="text-gray-500">Charts and deeper insights into viral patterns will be displayed here.</p>
      </div>
    </div>
  );
}
