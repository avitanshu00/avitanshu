
import React, { useEffect, useState, useRef } from 'react';
import { Contact } from '../types';

interface CallOverlayProps {
  target: Contact;
  type: 'voice' | 'video';
  onClose: () => void;
}

declare const Tone: any;

export const CallOverlay: React.FC<CallOverlayProps> = ({ target, type, onClose }) => {
  const [callStatus, setCallStatus] = useState<'calling' | 'connected' | 'ended'>('calling');
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const synthRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    // Start Ringtone simulation using Tone.js
    if (callStatus === 'calling') {
      const synth = new Tone.PolySynth().toDestination();
      synthRef.current = synth;
      
      const loop = new Tone.Loop((time: any) => {
        synth.triggerAttackRelease(["C5", "E5"], "8n", time);
      }, "1n").start(0);
      
      Tone.Transport.start();

      // Simulate connection after 3 seconds
      const timeout = setTimeout(() => {
        setCallStatus('connected');
        Tone.Transport.stop();
        Tone.Transport.cancel();
      }, 4000);

      return () => {
        clearTimeout(timeout);
        Tone.Transport.stop();
        Tone.Transport.cancel();
      };
    }
  }, [callStatus]);

  useEffect(() => {
    if (callStatus === 'connected') {
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [callStatus]);

  const formatDuration = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-between py-16 px-8 animate-in fade-in zoom-in duration-300">
      {/* Background/Video Area */}
      {type === 'video' && callStatus === 'connected' ? (
        <div className="absolute inset-0 bg-[#1A1A1A]">
            <div className="w-full h-full flex items-center justify-center text-white/10 italic">
                Remote Video Stream Simulation
            </div>
            {/* Small local video preview */}
            <div className="absolute top-8 right-8 w-28 h-40 bg-gray-800 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-xs text-white/30">Local View</div>
            </div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#9D7CFF]/30 to-black/80"></div>
      )}

      {/* User Info */}
      <div className="relative z-10 flex flex-col items-center mt-8">
        <div className={`w-32 h-32 rounded-full border-4 border-[#BFA7FF]/50 p-1 mb-6 transition-all duration-700 ${callStatus === 'calling' ? 'animate-pulse scale-110' : ''}`}>
          <img src={target.dpUrl} className="w-full h-full rounded-full object-cover shadow-2xl" alt="" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{target.displayName}</h2>
        <p className="text-[#BFA7FF] font-medium tracking-widest uppercase text-sm">
          {callStatus === 'calling' ? `Ringing...` : `On ${type} call • ${formatDuration(duration)}`}
        </p>
      </div>

      {/* Controls */}
      <div className="relative z-10 flex flex-col items-center space-y-8 mb-8">
        <div className="flex items-center space-x-8">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-white text-gray-800' : 'bg-white/20 text-white backdrop-blur-sm'}`}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          </button>
          
          <button 
            onClick={onClose}
            className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-red-500/30 hover:bg-red-600 transition-all active:scale-90"
          >
            <svg className="w-10 h-10 transform rotate-[135deg]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
          </button>

          <button className="w-16 h-16 bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
