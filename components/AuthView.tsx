
import React, { useState } from 'react';

interface AuthViewProps {
  onLogin: (user: any) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login/signup
    onLogin({ uid: 'mock-uid-' + Math.random().toString(36).substr(2, 9), email });
  };

  return (
    <div className="flex flex-col h-full bg-white p-8">
      <div className="mt-12 mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#9D7CFF] mb-2">Vaani</h1>
        <p className="text-gray-500">Your modern space for conversation</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#BFA7FF] transition-all"
            placeholder="hello@vaani.app"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#E9D5FF] focus:outline-none focus:ring-2 focus:ring-[#BFA7FF] transition-all"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#BFA7FF] to-[#9D7CFF] text-white py-3 rounded-xl font-semibold shadow-lg shadow-purple-100 hover:opacity-90 transition-opacity active:scale-[0.98]"
        >
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-[#9D7CFF] font-medium hover:underline"
        >
          {isLogin ? "New to Vaani? Sign Up" : "Already have an account? Sign In"}
        </button>
      </div>

      <div className="mt-auto text-xs text-center text-gray-400">
        By continuing, you agree to Vaani's Terms & Privacy
      </div>
    </div>
  );
};
