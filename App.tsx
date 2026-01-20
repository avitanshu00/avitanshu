
import React, { useState, useEffect } from 'react';
import { AuthView } from './components/AuthView';
import { MainView } from './components/MainView';
import { SetupProfile } from './components/SetupProfile';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Simplified auth mock for demonstration since real Firebase config is needed
  // In a real app, use onAuthStateChanged
  useEffect(() => {
    const savedUser = localStorage.getItem('vaani_user');
    const savedProfile = localStorage.getItem('vaani_profile');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    
    setLoading(false);
  }, []);

  const handleLogin = (u: any, p?: UserProfile) => {
    localStorage.setItem('vaani_user', JSON.stringify(u));
    setUser(u);
    if (p) {
        localStorage.setItem('vaani_profile', JSON.stringify(p));
        setProfile(p);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('vaani_user');
    localStorage.removeItem('vaani_profile');
    setUser(null);
    setProfile(null);
  };

  const handleProfileComplete = (p: UserProfile) => {
    localStorage.setItem('vaani_profile', JSON.stringify(p));
    setProfile(p);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#F8F6FF]">
        <div className="w-16 h-16 border-4 border-[#BFA7FF] border-t-transparent rounded-full animate-spin mb-4"></div>
        <h1 className="text-2xl font-bold text-[#9D7CFF]">Vaani</h1>
      </div>
    );
  }

  if (!user) {
    return <AuthView onLogin={handleLogin} />;
  }

  if (!profile) {
    return <SetupProfile user={user} onComplete={handleProfileComplete} />;
  }

  return <MainView user={user} profile={profile} onLogout={handleLogout} />;
};

export default App;
