
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface SetupProfileProps {
  user: any;
  onComplete: (profile: UserProfile) => void;
}

export const SetupProfile: React.FC<SetupProfileProps> = ({ user, onComplete }) => {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [emoji, setEmoji] = useState('✨');

  const generateSVG = (content: string) => {
    const safeContent = content.substring(0, 10);
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
        <rect width='200' height='200' fill='#9D7CFF'/>
        <text x='50%' y='55%' font-size='80' text-anchor='middle' dominant-baseline='middle' fill='white'>
          ${safeContent}
        </text>
      </svg>
    `.trim();
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const handleFinish = () => {
    if (!displayName) return;
    
    const userId = `va-${Math.floor(1000 + Math.random() * 9000)}`;
    const dpUrl = generateSVG(emoji);
    
    const profile: UserProfile = {
      uid: user.uid,
      displayName,
      bio,
      emoji,
      userId,
      dpUrl,
      status: 'online',
      lastChanged: Date.now()
    };
    
    onComplete(profile);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F6FF] p-8 overflow-y-auto custom-scrollbar">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Setup Your Profile</h2>
        <p className="text-gray-500">How would you like to be seen?</p>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-3xl bg-[#BFA7FF] shadow-xl overflow-hidden mb-4 flex items-center justify-center">
            <img src={generateSVG(emoji)} alt="Preview" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-wrap justify-center gap-2 max-w-xs">
          {['✨', '🌊', '🌙', '💜', '🦄', '🍀', '🦋', '🎈', '🚀', '🎸'].map(e => (
            <button 
                key={e}
                onClick={() => setEmoji(e)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-xl transition-all ${emoji === e ? 'bg-white shadow-md scale-110' : 'hover:bg-white/50'}`}
            >
                {e}
            </button>
          ))}
          <input 
            type="text" 
            maxLength={2} 
            value={emoji} 
            onChange={(e) => setEmoji(e.target.value)}
            className="w-10 h-10 text-center rounded-lg border border-[#E9D5FF] focus:outline-none"
            placeholder="+"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
          <input
            maxLength={50}
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#BFA7FF]"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio (Optional)</label>
          <textarea
            maxLength={100}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#BFA7FF] h-24 resize-none"
            placeholder="Tell us a bit about yourself..."
          />
        </div>

        <button
          onClick={handleFinish}
          disabled={!displayName}
          className="w-full bg-[#9D7CFF] text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-purple-200 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          Enter Vaani
        </button>
      </div>
    </div>
  );
};
