"use client";

import { useEffect, useState } from 'react';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/templates');
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
    <div>
      <h1 className="text-3xl font-bold mb-6">Viral Templates</h1>
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
        {loading ? (
          <p className="text-gray-400">Loading templates...</p>
        ) : templates.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-medium text-gray-300 mb-2">No templates found</h3>
            <p className="text-gray-500">Viral templates will appear here once videos are analyzed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template: any, i) => (
              <div key={i} className="bg-gray-700 p-4 rounded-md border border-gray-600">
                <h4 className="font-semibold text-lg">{template.name || `Template ${i + 1}`}</h4>
                <p className="text-sm text-gray-400 mt-2">{template.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
