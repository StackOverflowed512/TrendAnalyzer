"use client";

import { useEffect, useState } from 'react';
import { LayoutTemplate, Sparkles } from 'lucide-react';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${baseUrl}/api/templates`);
        if (res.ok) {
          const data = await res.json();
          setTemplates(data);
        }
      } catch (error) {
        console.error("Failed to fetch templates", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center mb-8">
        <LayoutTemplate className="w-8 h-8 mr-3 text-emerald-500" />
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2 tracking-tight">Viral Templates</h1>
          <p className="text-gray-400">Reusable structures extracted from trending videos.</p>
        </div>
      </div>
      
      <div className="glass-card p-8 animate-fade-in stagger-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-emerald-500/50">
            <Sparkles className="w-8 h-8 mb-4 animate-pulse" />
            <p className="text-gray-400">Loading your viral templates...</p>
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-2xl hover:border-white/20 transition-colors">
            <LayoutTemplate className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-2xl font-bold text-gray-300 mb-2">No templates found</h3>
            <p className="text-gray-500 max-w-md mx-auto">Viral templates will automatically appear here once new videos are thoroughly analyzed by the AI pipeline.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template: any, i) => (
              <div key={i} className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/10 cursor-pointer overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <h4 className="font-bold text-xl text-white mb-2 flex items-center tracking-tight">
                  <LayoutTemplate className="w-4 h-4 mr-2 text-emerald-400" />
                  {template.name || `Template ${i + 1}`}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{template.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
