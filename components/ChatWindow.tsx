
import React, { useState, useRef, useEffect } from 'react';
import { Contact, ChatMessage } from '../types';

interface ChatWindowProps {
  contact: Contact;
  onBack: () => void;
  onCall: (type: 'voice' | 'video') => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ contact, onBack, onCall }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock initial messages
    setMessages([
      { id: '1', senderId: contact.uid, text: `Hey! How's it going?`, timestamp: Date.now() - 100000, type: 'text' },
      { id: '2', senderId: 'me', text: `Doing great, love the new purple theme in Vaani!`, timestamp: Date.now() - 50000, type: 'text' },
      { id: '3', senderId: contact.uid, text: `It's so smooth, right? 💜`, timestamp: Date.now() - 20000, type: 'text' },
    ]);
  }, [contact]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: ChatMessage = {
      id: Math.random().toString(),
      senderId: 'me',
      text: inputText,
      timestamp: Date.now(),
      type: 'text'
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full bg-[#FBF9FF]">
      {/* Header */}
      <div className="h-16 px-4 flex items-center bg-white border-b border-[#F0E6FF] shadow-sm z-10">
        <button onClick={onBack} className="p-2 mr-1 text-[#9D7CFF]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <div className="relative">
            <img src={contact.dpUrl} className="w-10 h-10 rounded-full" alt="" />
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${contact.status === 'online' ? 'bg-green-400' : 'bg-gray-300'}`}></div>
        </div>
        <div className="ml-3 flex-1 overflow-hidden">
          <h3 className="font-semibold text-gray-800 truncate">{contact.displayName}</h3>
          <p className="text-[11px] text-[#9D7CFF]">{contact.status === 'online' ? 'Active now' : 'Last seen recently'}</p>
        </div>
        <div className="flex space-x-1">
          <button onClick={() => onCall('voice')} className="p-2 text-[#9D7CFF] hover:bg-purple-50 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          </button>
          <button onClick={() => onCall('video')} className="p-2 text-[#9D7CFF] hover:bg-purple-50 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {messages.map((msg) => {
          const isMe = msg.senderId === 'me';
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2 ${
                isMe ? 'bg-[#9D7CFF] text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-[#F0E6FF]'
              }`}>
                {msg.text}
                <div className={`text-[10px] mt-1 ${isMe ? 'text-purple-100' : 'text-gray-400'} text-right`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-[#F0E6FF] flex items-end space-x-2">
        <button className="p-2 text-gray-400 hover:text-[#9D7CFF]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5"></path></svg>
        </button>
        <div className="flex-1 bg-[#F8F6FF] rounded-2xl px-4 py-2 max-h-32 overflow-y-auto">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-transparent border-none focus:outline-none text-sm resize-none py-1"
            rows={1}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            }}
          />
        </div>
        <button 
          onClick={handleSend}
          disabled={!inputText.trim()}
          className={`p-2.5 rounded-full shadow-md transition-all active:scale-95 ${inputText.trim() ? 'bg-[#9D7CFF] text-white' : 'bg-gray-200 text-gray-400'}`}
        >
          <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
        </button>
      </div>
    </div>
  );
};
