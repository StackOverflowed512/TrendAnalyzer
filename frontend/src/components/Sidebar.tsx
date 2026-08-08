import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-800">
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <span className="text-xl font-bold text-white">Viral Reel Intel</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          <Link href="/" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">
            Dashboard
          </Link>
          <Link href="/trending" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">
            Trending Videos
          </Link>
          <Link href="/templates" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">
            Viral Templates
          </Link>
          <Link href="/prompts" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">
            Prompt Generator
          </Link>
          <Link href="/analytics" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">
            Analytics
          </Link>
          <Link href="/settings" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md">
            Settings
          </Link>
        </nav>
      </div>
    </div>
  );
}
