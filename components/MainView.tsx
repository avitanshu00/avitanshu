
import React, { useState } from 'react';
import { UserProfile, Contact } from '../types';
import { ChatWindow } from './ChatWindow';
import { ContactsList } from './ContactsList';
import { RequestView } from './RequestView';
import { ProfileView } from './ProfileView';
import { CallOverlay } from './CallOverlay';

interface MainViewProps {
  user: any;
  profile: UserProfile;
  onLogout: () => void;
}

type Tab = 'chats' | 'requests' | 'calls' | 'profile';

export const MainView: React.FC<MainViewProps> = ({ user, profile, onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('chats');
  const [activeChat, setActiveChat] = useState<Contact | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [callType, setCallType] = useState<'voice' | 'video'>('voice');

  const startCall = (type: 'voice' | 'video') => {
    setCallType(type);
    setIsCalling(true);
  };

  const renderContent = () => {
    if (activeChat) {
      return (
        <ChatWindow 
          contact={activeChat} 
          onBack={() => setActiveChat(null)} 
          onCall={(type) => startCall(type)}
        />
      );
    }

    switch (activeTab) {
      case 'chats':
        return <ContactsList onSelectContact={setActiveChat} />;
      case 'requests':
        return <RequestView />;
      case 'calls':
        return <div className="p-8 text-center text-gray-400">Recent calls history will appear here.</div>;
      case 'profile':
        return <ProfileView profile={profile} onLogout={onLogout} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Dynamic Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      {/* Bottom Navigation (Hidden when in active chat) */}
      {!activeChat && (
        <div className="h-16 bg-white border-t border-[#F0E6FF] flex items-center justify-around px-2">
          <NavButton 
            active={activeTab === 'chats'} 
            onClick={() => setActiveTab('chats')}
            icon={<ChatIcon />}
            label="Chats"
          />
          <NavButton 
            active={activeTab === 'requests'} 
            onClick={() => setActiveTab('requests')}
            icon={<PeopleIcon />}
            label="Friends"
          />
          <NavButton 
            active={activeTab === 'calls'} 
            onClick={() => setActiveTab('calls')}
            icon={<CallIcon />}
            label="Calls"
          />
          <NavButton 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
            icon={<UserIcon />}
            label="Profile"
          />
        </div>
      )}

      {/* Call UI */}
      {isCalling && activeChat && (
          <CallOverlay 
            target={activeChat} 
            type={callType} 
            onClose={() => setIsCalling(false)} 
          />
      )}
    </div>
  );
};

const NavButton: React.FC<{active: boolean, onClick: () => void, icon: React.ReactNode, label: string}> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-1 w-16 transition-colors ${active ? 'text-[#9D7CFF]' : 'text-gray-400'}`}
  >
    <div className={`${active ? 'scale-110' : ''} transition-transform`}>
      {icon}
    </div>
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

// Minimal Icons
const ChatIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>;
const PeopleIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
const CallIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>;
const UserIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>;
