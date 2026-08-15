"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PenTool, Search, Sparkles, ChevronRight } from 'lucide-react';

function PromptGeneratorContent() {
  const searchParams = useSearchParams();
  const [videoId, setVideoId] = useState('');
  const [prompt, setPrompt] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const vid = searchParams.get('videoId');
    if (vid) {
      setVideoId(vid);
    }
  }, [searchParams]);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!videoId) return;
    
    setLoading(true);
    setError('');
    setPrompt(null);
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${baseUrl}/api/generate-prompt/${videoId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: "trending" })
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Failed to generate prompt');
      }
      
      const data = await res.json();
      setPrompt(data.prompt);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center mb-8">
        <PenTool className="w-8 h-8 mr-3 text-purple-500" />
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2 tracking-tight">Prompt Generator</h1>
          <p className="text-gray-400">Generate viral scripts using AI based on analyzed videos.</p>
        </div>
      </div>
      
      <div className="glass-card p-8 mb-10 max-w-3xl animate-fade-in stagger-1">
        <form onSubmit={handleGenerate} className="flex gap-4">
          <div className="relative flex-1 group">
            <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="number"
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              placeholder="Enter Video ID (e.g. 1)"
              className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-inner"
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading || !videoId}
            className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold disabled:opacity-50 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)]"
          >
            {loading ? (
              <>
                <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate AI Prompt
              </>
            )}
          </button>
        </form>
        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center">
             <div className="w-2 h-2 rounded-full bg-red-400 mr-3 animate-pulse"></div>
             {error}
          </div>
        )}
      </div>

      {prompt && (
        <div className="glass-card p-8 max-w-4xl animate-fade-in">
          <div className="flex items-center mb-6 pb-6 border-b border-white/10">
            <div className="bg-purple-500/20 p-3 rounded-xl mr-4 shadow-lg shadow-purple-500/10">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Generated Concept: <span className="text-purple-400 font-medium">{prompt.title || 'Untitled'}</span></h2>
          </div>
          
          <div className="space-y-8">
            <div className="group">
              <h3 className="font-semibold text-gray-300 mb-3 flex items-center">
                <ChevronRight className="w-4 h-4 mr-1 text-purple-500 group-hover:translate-x-1 transition-transform" />
                Hook
              </h3>
              <p className="text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5 leading-relaxed">{prompt.hook}</p>
            </div>
            
            <div className="group">
              <h3 className="font-semibold text-gray-300 mb-3 flex items-center">
                <ChevronRight className="w-4 h-4 mr-1 text-purple-500 group-hover:translate-x-1 transition-transform" />
                Voiceover
              </h3>
              <p className="text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5 leading-relaxed">{prompt.voiceover}</p>
            </div>
            
            <div className="group">
              <h3 className="font-semibold text-gray-300 mb-3 flex items-center">
                <ChevronRight className="w-4 h-4 mr-1 text-purple-500 group-hover:translate-x-1 transition-transform" />
                Visuals & Transitions
              </h3>
              <p className="text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5 leading-relaxed">{prompt.transitions}</p>
            </div>
            
            <div className="pt-8 border-t border-white/10 mt-8">
              <h3 className="font-semibold text-gray-400 mb-4 text-sm uppercase tracking-wider">Raw Output Data</h3>
              <pre className="bg-black/60 p-6 rounded-xl overflow-x-auto text-xs text-purple-200/70 border border-white/5 font-mono shadow-inner">
                {JSON.stringify(prompt, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PromptsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Sparkles className="w-8 h-8 mb-4 animate-pulse text-purple-500/50" />
        Loading prompt generator...
      </div>
    }>
      <PromptGeneratorContent />
    </Suspense>
  );
}
