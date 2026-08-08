export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-white">Application Configuration</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">API Endpoint</label>
            <input 
              type="text" 
              disabled 
              value="http://localhost:8000"
              className="w-full bg-gray-900 border border-gray-700 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Currently hardcoded for local development.</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Theme</label>
            <select disabled className="w-full bg-gray-900 border border-gray-700 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed">
              <option>Dark (Default)</option>
            </select>
          </div>
          
          <div className="pt-4 border-t border-gray-700">
            <button disabled className="bg-gray-700 text-gray-400 px-6 py-2 rounded-md font-medium cursor-not-allowed">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
