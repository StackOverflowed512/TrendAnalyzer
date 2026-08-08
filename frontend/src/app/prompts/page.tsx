"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

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
      const res = await fetch(`http://localhost:8000/api/generate-prompt/${videoId}`, {
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
    <div>
      <h1 className="text-3xl font-bold mb-6">Prompt Generator</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-8">
        <form onSubmit={handleGenerate} className="flex gap-4">
          <input
            type="number"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            placeholder="Enter Video ID (e.g. 1)"
            className="flex-1 bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
          <button 
            type="submit"
            disabled={loading || !videoId}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate AI Prompt'}
          </button>
        </form>
        {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
      </div>

      {prompt && (
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Generated Concept: {prompt.title || 'Untitled'}</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-300">Hook</h3>
              <p className="text-gray-400">{prompt.hook}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-300">Voiceover</h3>
              <p className="text-gray-400">{prompt.voiceover}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-300">Visuals & Transitions</h3>
              <p className="text-gray-400">{prompt.transitions}</p>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <h3 className="font-semibold text-gray-300 mb-2">Raw JSON</h3>
              <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-xs text-gray-400">
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
    <Suspense fallback={<div className="p-8 text-gray-400">Loading prompt generator...</div>}>
      <PromptGeneratorContent />
    </Suspense>
  );
}
