import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Download, RotateCcw, Moon, Sun, Home, Star, Shield, Layers } from 'lucide-react';
import { AdminDataProvider, useAdminData } from '../../context/AdminDataContext';
import { AdminGeneral } from './admin-sections/AdminGeneral';
import { AdminProjects } from './admin-sections/AdminProjects';
import { AdminAbout } from './admin-sections/AdminAbout';
import { AdminContact } from './admin-sections/AdminContact';
import { AdminDonate } from './admin-sections/AdminDonate';
import { AdminChat } from './admin-sections/AdminChat';

// ─── Auth Gate ────────────────────────────────────────────────────────────────

const SESSION_KEY = 'paperfolio_admin_auth';
const ENV_PASSWORD = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_ADMIN_PASSWORD) || 'admin123';

const LoginPage: React.FC<{ isDarkMode: boolean; onLogin: () => void }> = ({ isDarkMode, onLogin }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ENV_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setInput('');
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center py-8 px-4 font-hand ${isDarkMode ? 'bg-[#0f172a]' : 'bg-[#dbeafe]'}`}>
      <div className={`relative w-full max-w-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] ${isDarkMode ? 'bg-[#1e293b]' : 'bg-white'}`}
        style={{ transform: shake ? 'translateX(-6px)' : 'none', transition: 'transform 0.1s' }}>

        {/* Notebook lines */}
        <div className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: isDarkMode
              ? 'linear-gradient(transparent 1.95rem, #334155 2rem)'
              : 'linear-gradient(transparent 1.95rem, #94a3b8 2rem)',
            backgroundSize: '100% 2rem',
            backgroundPosition: '0 1.5rem',
          }}
        />
        {/* Red margin line */}
        <div className={`absolute top-0 bottom-0 left-10 w-0.5 z-0 ${isDarkMode ? 'bg-red-900/50' : 'bg-red-300'}`} />

        <div className="relative z-10 p-8 pl-16">
          {/* Star decoration */}
          <div className="absolute -left-8 top-8 text-yellow-500 transform -rotate-12">
            <Star size={28} fill="currentColor" />
          </div>

          <div className="flex items-center gap-3 mb-8">
            <Shield size={32} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
            <h1 className={`font-marker text-4xl ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Admin Login</h1>
          </div>

          <p className={`notebook-text text-xl mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            This area is restricted. Enter the admin password to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block notebook-text text-xl font-bold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Password:
              </label>
              <input
                type="password"
                value={input}
                onChange={e => { setInput(e.target.value); setError(false); }}
                className={`w-full bg-transparent border-0 border-b-2 px-1 py-1 font-hand text-2xl outline-none transition-colors ${
                  error
                    ? 'border-red-500 text-red-600'
                    : isDarkMode
                      ? 'border-slate-600 focus:border-blue-400 text-slate-200'
                      : 'border-slate-300 focus:border-blue-500 text-slate-800'
                } placeholder:text-slate-400 placeholder:italic`}
                placeholder="••••••••"
                autoFocus
              />
              {error && (
                <p className="mt-2 font-hand text-red-500 text-lg animate-pulse">
                  ❌ Wrong password. Try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-hand font-bold text-xl shadow-md border border-blue-700 transform hover:-rotate-1 transition-all"
            >
              <Lock size={18} /> Enter Admin Area
            </button>
          </form>

          <div className={`mt-8 pt-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <p className={`font-hand text-sm italic ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
              💡 Set <code>VITE_ADMIN_PASSWORD</code> in your <code>.env</code> file to change the password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Admin Shell ──────────────────────────────────────────────────────────────

type AdminSection = 'general' | 'projects' | 'about' | 'contact' | 'donate' | 'chat';

const NAV_ITEMS: { id: AdminSection; label: string; emoji: string }[] = [
  { id: 'general', label: 'General', emoji: '⚙️' },
  { id: 'projects', label: 'Projects', emoji: '🚀' },
  { id: 'about', label: 'About', emoji: '👤' },
  { id: 'contact', label: 'Contact', emoji: '📬' },
  { id: 'donate', label: 'Donate / Sponsor', emoji: '💰' },
  { id: 'chat', label: 'Chat Bot', emoji: '🪴' },
];

const AdminShell: React.FC<{
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  onGoHome: () => void;
}> = ({ isDarkMode, onToggleTheme, onLogout, onGoHome }) => {
  const [section, setSection] = useState<AdminSection>('general');
  const { exportJSON, resetAll, isDirty } = useAdminData();

  const handleResetAll = () => {
    if (confirm('⚠️ This will reset ALL portfolio data to defaults. Are you sure?')) {
      resetAll();
      alert('✅ All data reset to defaults.');
    }
  };

  return (
    <div className={`min-h-screen w-full flex font-hand transition-colors duration-500 ${isDarkMode ? 'bg-[#0f172a] text-slate-200' : 'bg-[#dbeafe] text-slate-800'}`}>

      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <aside className={`w-64 shrink-0 min-h-screen flex flex-col shadow-[4px_0_20px_-5px_rgba(0,0,0,0.2)] ${isDarkMode ? 'bg-[#1e293b]' : 'bg-white'}`}>

        {/* Notebook lines on sidebar */}
        <div className="absolute top-0 left-0 w-64 h-full pointer-events-none z-0"
          style={{
            backgroundImage: isDarkMode
              ? 'linear-gradient(transparent 1.95rem, #334155 2rem)'
              : 'linear-gradient(transparent 1.95rem, #e2e8f0 2rem)',
            backgroundSize: '100% 2rem',
            backgroundPosition: '0 1.5rem',
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className={`px-6 py-6 border-b-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Star size={24} fill="currentColor" className="text-yellow-500 -rotate-12" />
              </div>
              <div>
                <h2 className={`font-marker text-xl leading-none ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  Admin Panel
                </h2>
                <p className={`font-hand text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  Paperfolio Control Room
                </p>
              </div>
            </div>
          </div>

          {isDirty && (
            <div className={`mx-3 mt-3 px-3 py-2 border-l-4 border-orange-400 ${isDarkMode ? 'bg-orange-900/30' : 'bg-orange-50'}`}>
              <p className={`font-hand text-sm ${isDarkMode ? 'text-orange-300' : 'text-orange-700'}`}>
                ● Unsaved changes in localStorage
              </p>
            </div>
          )}

          {/* Nav */}
          <nav className="flex-1 py-4">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`w-full text-left flex items-center gap-3 px-6 py-3 font-hand text-lg font-bold transition-all ${
                  section === item.id
                    ? (isDarkMode
                        ? 'bg-blue-900/50 text-blue-300 border-r-4 border-blue-400'
                        : 'bg-blue-50 text-blue-600 border-r-4 border-blue-500')
                    : (isDarkMode
                        ? 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')
                }`}
              >
                <span className="text-xl">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className={`border-t-2 p-4 space-y-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
            <button
              onClick={exportJSON}
              className={`w-full flex items-center gap-2 px-3 py-2 font-hand font-bold text-sm border transform hover:-rotate-1 transition-all ${
                isDarkMode ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Download size={14} /> Export JSON
            </button>
            <button
              onClick={handleResetAll}
              className="w-full flex items-center gap-2 px-3 py-2 bg-red-200 hover:bg-red-300 text-red-900 border border-red-400 font-hand font-bold text-sm transform hover:rotate-1 transition-all"
            >
              <RotateCcw size={14} /> Reset All Data
            </button>
            <button
              onClick={onToggleTheme}
              className={`w-full flex items-center gap-2 px-3 py-2 font-hand font-bold text-sm border transform hover:rotate-1 transition-all ${
                isDarkMode ? 'border-yellow-600 text-yellow-300 hover:bg-slate-800' : 'border-slate-400 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
              {isDarkMode ? 'White Page' : 'Black Page'}
            </button>
            <button
              onClick={onGoHome}
              className={`w-full flex items-center gap-2 px-3 py-2 font-hand font-bold text-sm border transition-all ${
                isDarkMode ? 'border-slate-600 text-slate-400 hover:bg-slate-700' : 'border-slate-300 text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Home size={14} /> Back to Portfolio
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-3 py-2 font-hand font-bold text-sm text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <main className="flex-1 min-h-screen overflow-y-auto">
        <div className={`relative min-h-screen ${isDarkMode ? 'bg-[#1e293b]' : 'bg-white'} shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]`}>

          {/* Notebook lines on main area */}
          <div className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: isDarkMode
                ? 'linear-gradient(transparent 1.95rem, #334155 2rem)'
                : 'linear-gradient(transparent 1.95rem, #94a3b8 2rem)',
              backgroundSize: '100% 2rem',
              backgroundPosition: '0 1.5rem',
            }}
          />
          {/* Red margin line */}
          <div className={`absolute top-0 bottom-0 left-8 w-0.5 z-0 ${isDarkMode ? 'bg-red-900/50' : 'bg-red-300'}`} />

          <div className="relative z-10 px-12 py-8 max-w-5xl">
            {section === 'general' && <AdminGeneral isDarkMode={isDarkMode} />}
            {section === 'projects' && <AdminProjects isDarkMode={isDarkMode} />}
            {section === 'about' && <AdminAbout isDarkMode={isDarkMode} />}
            {section === 'contact' && <AdminContact isDarkMode={isDarkMode} />}
            {section === 'donate' && <AdminDonate isDarkMode={isDarkMode} />}
            {section === 'chat' && <AdminChat isDarkMode={isDarkMode} />}
          </div>
        </div>
      </main>
    </div>
  );
};

// ─── Public AdminPage export ──────────────────────────────────────────────────

interface AdminPageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onGoHome: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ isDarkMode, onToggleTheme, onGoHome }) => {
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
  };

  if (!isAuthed) {
    return <LoginPage isDarkMode={isDarkMode} onLogin={() => setIsAuthed(true)} />;
  }

  return (
    <AdminShell
      isDarkMode={isDarkMode}
      onToggleTheme={onToggleTheme}
      onLogout={handleLogout}
      onGoHome={onGoHome}
    />
  );
};
