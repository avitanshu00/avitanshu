
import React from 'react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, onLogout }) => {
  return (
    <div className="flex flex-col h-full bg-[#F8F6FF] overflow-y-auto custom-scrollbar">
      <div className="bg-white px-8 pb-8 pt-12 rounded-b-[40px] shadow-sm">
        <div className="flex flex-col items-center">
            <div className="relative mb-6">
                <div className="w-32 h-32 rounded-[40px] bg-[#BFA7FF] overflow-hidden shadow-2xl rotate-3 flex items-center justify-center">
                    <img src={profile.dpUrl} className="w-full h-full object-cover -rotate-3" alt="Profile" />
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white shadow-lg rounded-2xl flex items-center justify-center text-[#9D7CFF]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{profile.displayName}</h2>
            <p className="text-[#9D7CFF] font-medium text-sm mt-1">{profile.userId}</p>
            <p className="text-gray-500 text-center mt-3 text-sm max-w-xs">{profile.bio || "No bio yet. Tell the world something amazing!"}</p>
        </div>
      </div>

      <div className="p-6 space-y-3 mt-4">
        <ProfileOption icon={<LockIcon />} label="Privacy & Security" color="text-blue-500" />
        <ProfileOption icon={<BellIcon />} label="Notifications" color="text-orange-500" />
        <ProfileOption icon={<PaletteIcon />} label="Theme & Personalization" color="text-purple-500" />
        <ProfileOption icon={<GlobeIcon />} label="Language (English/Hindi)" color="text-green-500" />
        
        <button 
          onClick={onLogout}
          className="w-full mt-8 p-4 bg-white border border-red-100 text-red-500 rounded-2xl font-bold flex items-center justify-center space-x-2 active:bg-red-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          <span>Sign Out</span>
        </button>
      </div>
      
      <div className="mt-auto p-8 text-center text-xs text-gray-400">
        Vaani v1.0.4 - Built for connection
      </div>
    </div>
  );
};

const ProfileOption: React.FC<{icon: React.ReactNode, label: string, color: string}> = ({ icon, label, color }) => (
  <button className="w-full p-4 bg-white rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all border border-transparent hover:border-[#F0E6FF]">
    <div className="flex items-center space-x-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 ${color}`}>
        {icon}
      </div>
      <span className="text-gray-700 font-medium">{label}</span>
    </div>
    <svg className="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
  </button>
);

const LockIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>;
const BellIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>;
const PaletteIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>;
const GlobeIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
