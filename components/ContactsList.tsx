
import React from 'react';
import { Contact } from '../types';

interface ContactsListProps {
  onSelectContact: (contact: Contact) => void;
}

export const ContactsList: React.FC<ContactsListProps> = ({ onSelectContact }) => {
  // Mock contacts
  const contacts: Contact[] = [
    { uid: 'u1', displayName: 'Aarav', status: 'online', dpUrl: generateMockSVG('🔥'), lastMessage: 'See you there!' },
    { uid: 'u2', displayName: 'Isha', status: 'offline', dpUrl: generateMockSVG('🦄'), lastMessage: 'That sounds great' },
    { uid: 'u3', displayName: 'Kabir', status: 'online', dpUrl: generateMockSVG('🎮'), lastMessage: 'Did you see the news?' },
    { uid: 'u4', displayName: 'Maya', status: 'offline', dpUrl: generateMockSVG('🌊'), lastMessage: 'Let me check on that' },
    { uid: 'u5', displayName: 'Rohan', status: 'online', dpUrl: generateMockSVG('🚀'), lastMessage: 'Vaani is awesome!' },
  ];

  function generateMockSVG(emoji: string) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='#9D7CFF'/><text x='50%' y='55%' font-size='50' text-anchor='middle' dominant-baseline='middle' fill='white'>${emoji}</text></svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-[#F0E6FF]">
        <h2 className="text-xl font-bold text-gray-800">Messages</h2>
        <div className="mt-3 bg-[#F8F6FF] rounded-xl flex items-center px-3 py-2">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" placeholder="Search chats..." className="bg-transparent border-none text-sm focus:outline-none w-full" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {contacts.map(contact => (
          <button 
            key={contact.uid}
            onClick={() => onSelectContact(contact)}
            className="w-full px-4 py-3 flex items-center hover:bg-[#FBF9FF] transition-colors group active:bg-[#F0E6FF]"
          >
            <div className="relative flex-shrink-0">
                <img src={contact.dpUrl} className="w-14 h-14 rounded-2xl shadow-sm" alt="" />
                {contact.status === 'online' && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                )}
            </div>
            <div className="ml-4 flex-1 text-left border-b border-gray-50 pb-3 group-last:border-none">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-semibold text-gray-800">{contact.displayName}</span>
                <span className="text-[10px] text-gray-400">12:45 PM</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
