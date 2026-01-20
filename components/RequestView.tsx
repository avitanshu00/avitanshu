
import React, { useState } from 'react';
import { FriendRequest } from '../types';

export const RequestView: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [requests, setRequests] = useState<FriendRequest[]>([
    { id: 'r1', fromUid: 'u99', fromDisplayName: 'Sarah', fromDpUrl: generateMockSVG('🌸'), timestamp: Date.now() - 3600000 },
  ]);

  function generateMockSVG(emoji: string) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='#9D7CFF'/><text x='50%' y='55%' font-size='50' text-anchor='middle' dominant-baseline='middle' fill='white'>${emoji}</text></svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  const handleAccept = (id: string) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  const handleDecline = (id: string) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-white p-4 overflow-y-auto custom-scrollbar">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add Friends</h2>
      
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">Search by Vaani ID (e.g., va-1234)</p>
        <div className="flex space-x-2">
            <input 
              type="text" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="va-xxxx" 
              className="flex-1 bg-[#F8F6FF] border border-[#E9D5FF] rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#BFA7FF] text-sm" 
            />
            <button className="bg-[#9D7CFF] text-white px-6 py-2 rounded-xl font-semibold shadow-md active:scale-95 transition-all">
                Add
            </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[#9D7CFF] uppercase tracking-wider">Friend Requests ({requests.length})</h3>
        {requests.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-sm italic">No pending requests</p>
          </div>
        ) : (
          requests.map(req => (
            <div key={req.id} className="bg-[#FBF9FF] rounded-2xl p-4 border border-[#F0E6FF] flex items-center animate-in slide-in-from-right duration-300">
              <img src={req.fromDpUrl} className="w-12 h-12 rounded-xl shadow-sm" alt="" />
              <div className="ml-4 flex-1">
                <h4 className="font-semibold text-gray-800">{req.fromDisplayName}</h4>
                <p className="text-[11px] text-gray-400">Wants to be your friend</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleAccept(req.id)}
                  className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </button>
                <button 
                  onClick={() => handleDecline(req.id)}
                  className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
