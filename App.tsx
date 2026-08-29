
import React, { useState, useEffect } from 'react';
import usePageTracking from './src/hooks/usePageTracking';
import { Moon, Sun, Star, ArrowLeft, Pencil, Coffee, Sparkles, Check, QrCode, Megaphone, Trophy, Briefcase, Mail, X } from 'lucide-react';
import { StickyNoteChat } from './components/StickyNoteChat';
import { Project } from './types';
import { NotebookPage } from './src/pages/NotebookPage';
import { AboutDetailPage } from './src/pages/AboutDetailPage';
import { ProjectsListPage } from './src/pages/ProjectsListPage';
import { ProjectDetailPage } from './src/pages/ProjectDetailPage';
import { DonatePage } from './src/pages/DonatePage';
import { SponsorPage } from './src/pages/SponsorPage';
import { AdminPage } from './src/pages/admin/AdminPage';
import { AdminDataProvider, useAdminData } from './src/context/AdminDataContext';

// ── Handcrafted Crumpled ("Scrummbled") Paper Icon ─────────────────────────
const CrumpledPaperIcon: React.FC<{ className?: string; size?: number }> = ({ className = "w-6 h-6", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M4.5 7.5L8 3.5L14.5 4.5L19.5 7L20.5 13.5L17.5 19.5L11.5 21L5 18L3 12.5L4.5 7.5Z"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M8 3.5L11.5 10.5L4.5 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.5 4.5L11.5 10.5L16 11.5L19.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.5 10.5L13 16.5L20.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 16.5L17.5 19.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 16.5L11.5 21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11.5 10.5L7.5 14L5 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.5 14L13 16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12.5L7.5 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AppContent: React.FC = () => {
  usePageTracking();
  const { data } = useAdminData();
  type ViewType = 'notebook' | 'donate' | 'sponsor' | 'project-detail' | 'about-detail' | 'projects-list' | 'admin';

  const pathToView = (path: string): ViewType => {
    switch (path) {
      case '/projects': return 'projects-list';
      case '/about':    return 'about-detail';
      case '/donate':   return 'donate';
      case '/sponsor':  return 'sponsor';
      case '/admin':    return 'admin';
      default:          return 'notebook';
    }
  };

  const viewToPath: Record<ViewType, string> = {
    'notebook':       '/',
    'projects-list':  '/projects',
    'about-detail':   '/about',
    'donate':         '/donate',
    'sponsor':        '/sponsor',
    'project-detail': '/projects',   // project detail keeps /projects in URL
    'admin':          '/admin',
  };

  const [view, setView] = useState<ViewType>(() => {
    if (typeof window === 'undefined') return 'notebook';
    if (window.location.search.includes('admin')) return 'admin';
    return pathToView(window.location.pathname);
  });

  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmailInput, setPartnerEmailInput] = useState('');
  const [partnerMessage, setPartnerMessage] = useState('');
  const [partnerSent, setPartnerSent] = useState(false);

  // Mobile crumpled paper overlay for sticky notes
  const [isMobileNotesOpen, setIsMobileNotesOpen] = useState(false);

  // Scroll to Top Button Logic
  useEffect(() => {
    const handleScroll = () => {
      if (!isFlying) {
        setShowScrollTop(window.scrollY > 300);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFlying]);

  // Scroll Reveal Animation Logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [view]); // Re-run when view changes to observe new elements

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // ── History API: navigate pushes a browser history entry ──────────────
  const navigate = (newView: ViewType, project?: Project) => {
    const path = viewToPath[newView];
    history.pushState({ view: newView, projectId: project?.id ?? null }, '', path);
    if (project) setCurrentProject(project);
    setView(newView);
    window.scrollTo(0, 0);
  };

  // ── History API: listen to back/forward button ────────────────────────
  useEffect(() => {
    // Always seed/replace the current entry with app state on mount.
    // This overwrites any stale or cached pre-app entry so the old design
    // never appears when clicking back.
    history.replaceState({ view, projectId: currentProject?.id ?? null }, '', viewToPath[view]);

    const onPop = (e: PopStateEvent) => {
      const state = e.state as { view?: ViewType; projectId?: string | null } | null;
      if (state?.view) {
        // Restore project reference when popping back to project-detail
        if (state.view === 'project-detail' && state.projectId) {
          const found = data.projects.find(p => p.id === state.projectId);
          if (found) setCurrentProject(found);
        }
        setView(state.view);
        window.scrollTo(0, 0);
      } else {
        // No app state on this history entry — go back to home notebook
        history.replaceState({ view: 'notebook', projectId: null }, '', '/');
        setView('notebook');
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.projects]);

  const scrollTo = (id: string) => {
    if (view !== 'notebook') {
      navigate('notebook');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    setIsFlying(true);

    // Custom smooth scroll animation (1s duration for faster scroll)
    const duration = 1000;
    const start = window.scrollY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Cubic easing out for a smooth "landing" at the top
      const ease = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, start - (start * ease));

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);

    setTimeout(() => {
      setIsFlying(false);
      setShowScrollTop(false);
    }, 1000);
  };

  const handleDonateClick = () => {
    navigate('donate');
    setSelectedTier(null);
  };

  const handleSponsorClick = () => {
    navigate('sponsor');
    setSelectedTier(null);
  };

  const handleAboutClick = () => navigate('about-detail');

  const handleProjectClick = (project: Project) => navigate('project-detail', project);

  const handleProjectsListClick = () => navigate('projects-list');

  const handleTierSelect = (tier: string) => {
    if (selectedTier === tier) {
      // deselect when clicking the already-selected tier
      setSelectedTier(null);
    } else {
      setSelectedTier(tier);
      setTimeout(() => {
        document.getElementById('action-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) return;

    setPartnerSent(false);
    try {
      const resp = await fetch('/api/send-partner-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: partnerName,
          email: partnerEmailInput,
          message: partnerMessage,
          tier: selectedTier,
        }),
      });

      const data = await resp.json();
      if (resp.ok) {
        setPartnerSent(true);
        setPartnerName('');
        setPartnerEmailInput('');
        setPartnerMessage('');
      } else {
        console.error('Send failed', data);
        alert('Failed to send message. Please try again or email directly.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error sending message.');
    }
  };

  // Helper Components
  const PolaroidImage = ({ src, alt, rotate = 'rotate-2', caption, imgHeight = "h-24 sm:h-32", className = "w-32 sm:w-40 mx-auto md:mx-0" }: { src: string, alt: string, rotate?: string, caption?: string, imgHeight?: string, className?: string }) => (
    <div className={`relative shrink-0 z-10 group ${rotate} hover:rotate-0 transition-transform duration-300 ${className} cursor-pointer`}>
      <div className="bg-white p-1.5 sm:p-2 shadow-md border border-gray-200 flex flex-col">
        <img
          src={src}
          alt={alt}
          className={`w-full ${imgHeight} object-cover filter sepia-[.2] border border-gray-100`}
        />
        {caption && <div className="font-hand text-center mt-1 sm:mt-2 text-gray-600 leading-tight text-xs sm:text-sm pb-0.5">{caption}</div>}
      </div>
      <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-4 sm:h-6 bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm opacity-80 tape-serrated" />
    </div>
  );

  const SectionStar = () => (
    <div className="absolute -left-8 sm:-left-20 top-2 text-yellow-500 transform -rotate-12">
      <Star size={32} fill="currentColor" strokeWidth={2} className="drop-shadow-sm" />
    </div>
  );

  return (
    <>
      {/* === ADMIN PANEL (full-screen, outside notebook wrapper) === */}
      {view === 'admin' && (
        <AdminPage
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onGoHome={() => {
            setView('notebook');
            window.history.replaceState(null, '', window.location.pathname);
          }}
        />
      )}

      {view !== 'admin' && (
        <div className={`min-h-screen w-full flex justify-center py-8 px-2 sm:px-8 font-hand transition-colors duration-500 cursor-default ${isDarkMode ? 'bg-[#0f172a] text-slate-200' : 'bg-[#dbeafe] text-slate-800'}`}>

          <div className={`relative w-full max-w-5xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] min-h-[95vh] flex flex-col transition-all duration-500 ${isDarkMode ? 'bg-[#1e293b]' : 'bg-white'}`}>

            {/* ── MOBILE CRUMPLED PAPER BUTTON (< xl screens) ── */}
            <div className="xl:hidden">
              {/* Left Crumpled Paper Icon: Open Sticky Notes with Shiny #1 Badge */}
              <button
                onClick={() => setIsMobileNotesOpen(true)}
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                className="fixed top-2.5 left-2.5 sm:top-3 sm:left-3 z-40 flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-yellow-200 text-yellow-900 border-2 border-yellow-400 shadow-lg font-marker text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer transform -rotate-3 pointer-events-auto group"
                aria-label="Open Sticky Notes"
              >
                <CrumpledPaperIcon className="w-4 h-4 text-yellow-800 shrink-0" />
                <span className="tracking-wider">NOTES 📌</span>

                {/* Shiny #1 Badge on the right side */}
                <div className="relative shrink-0 flex items-center justify-center -mr-1">
                  <img
                    src="/number-1- badge.png"
                    alt="#1 Badge"
                    className="w-6 h-6 sm:w-7 sm:h-7 object-contain drop-shadow-[0_0_8px_rgba(250,204,21,0.95)] filter brightness-110 contrast-125 animate-pulse"
                  />
                  <span className="absolute -top-1 -right-1 text-[10px] animate-pulse">✨</span>
                </div>
              </button>
            </div>

            {/* ── MOBILE MODAL: UNFOLDED STICKY NOTES ── */}
            {isMobileNotesOpen && (
              <div 
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                onClick={() => setIsMobileNotesOpen(false)}
              >
                <div 
                  className={`relative w-full max-w-md max-h-[85vh] overflow-y-auto p-5 sm:p-6 rounded-sm shadow-2xl border-4 border-dashed border-amber-300 transform rotate-1 ${
                    isDarkMode ? 'bg-[#1e293b] text-slate-200' : 'bg-[#fffdf0] text-slate-900'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm tape-serrated" />
                  
                  <div className="flex items-center justify-between border-b-2 border-slate-300 dark:border-slate-700 pb-3 mb-5">
                    <div className="flex items-center gap-2">
                      <CrumpledPaperIcon className="w-6 h-6 text-yellow-600" />
                      <h2 className="font-marker text-xl sm:text-2xl text-yellow-800 dark:text-yellow-400">
                        SCRUMBLED NOTES 📌
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsMobileNotesOpen(false)}
                      style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                      title="Close Notes"
                      aria-label="Close Notes"
                      className={`flex items-center justify-center p-1.5 sm:p-2 border-[2px] sm:border-[3px] transform -rotate-2 hover:rotate-0 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md ${
                        isDarkMode
                          ? 'border-yellow-400 text-yellow-300 hover:bg-slate-800 bg-slate-900 shadow-yellow-900/20'
                          : 'border-slate-600 text-slate-700 hover:bg-white bg-white shadow-slate-400/20'
                      }`}
                    >
                      <X size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  <div className="space-y-5">
                    {/* Note #1 Badge */}
                    <div className="relative bg-yellow-200 text-yellow-900 p-4 rounded shadow-md border border-yellow-300 transform -rotate-1">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="/number-1- badge.png" alt="#1 Badge" className="w-9 h-9 object-contain shrink-0" />
                        <div>
                          <p className="font-marker text-yellow-800 text-sm tracking-wider leading-tight">#1 WORLD'S ONLY</p>
                          <p className="font-marker text-yellow-700 text-xs tracking-widest leading-tight">PAPER UI PLATFORM</p>
                        </div>
                      </div>
                      <p className="font-hand text-yellow-950 text-sm leading-snug">
                        World's only Paper UI — MIT Licensed. Created by Rajnikant Gaurav.
                      </p>
                    </div>

                    {/* Note 4: Future Goal */}
                    <div className="relative bg-yellow-200 text-yellow-900 p-4 rounded shadow-md border border-yellow-300 transform rotate-1">
                      <p className="font-marker text-yellow-800 text-sm tracking-wider mb-1">FUTURE GOAL 🎯</p>
                      <p className="font-hand text-yellow-950 text-sm leading-snug">
                        Not looking for a job title.<br/>Building toward something of my own.
                      </p>
                    </div>

                    {/* Note 3: Curiosity */}
                    <div className="relative bg-yellow-200 text-yellow-900 p-4 rounded shadow-md border border-yellow-300 transform -rotate-1">
                      <p className="font-marker text-yellow-800 text-sm tracking-wider mb-1">CURIOSITY 🔧</p>
                      <p className="font-hand text-yellow-950 text-sm leading-snug">
                        If I don't know how it works,<br/>I'll probably build it to find out.
                      </p>
                    </div>

                    {/* Note 1: Builder */}
                    <div className="relative bg-yellow-200 text-yellow-900 p-4 rounded shadow-md border border-yellow-300 transform rotate-1">
                      <p className="font-marker text-yellow-800 text-sm tracking-wider mb-1">BUILDER 🚀</p>
                      <p className="font-hand text-yellow-950 text-sm leading-snug">
                        I don't just learn technology.<br/>I build with it.
                      </p>
                    </div>

                    {/* Note 2: Startup Mindset */}
                    <div className="relative bg-yellow-200 text-yellow-900 p-4 rounded shadow-md border border-yellow-300 transform -rotate-1">
                      <p className="font-marker text-yellow-800 text-sm tracking-wider mb-1">STARTUP MINDSET 💡</p>
                      <p className="font-hand text-yellow-950 text-sm leading-snug">
                        Currently building ideas<br/>that I hope become businesses.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── DESKTOP-ONLY FIXED STICKY NOTES (hidden on < xl screens) ── */}
            <div className="hidden xl:block">
              {/* Top-Left Fixed Sticky Note Badge */}
              <div className="fixed top-10 left-1 sm:top-14 sm:left-2 md:left-3 lg:left-4 z-50 transform -rotate-6 hover:rotate-0 transition-transform duration-300 pointer-events-auto">
                <div className="relative group">
                  <div className="absolute inset-0 bg-yellow-400 -rotate-2 rounded shadow-md group-hover:rotate-0 transition-transform" />
                  <div className="relative bg-yellow-200 text-yellow-900 p-3.5 sm:p-4 rounded shadow-lg border border-yellow-300 w-44 sm:w-52 font-hand leading-snug">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-yellow-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm tape-serrated" />
                    {/* #1 Award Badge */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <img
                        src="/number-1- badge.png"
                        alt="#1 Badge"
                        className="w-10 h-10 object-contain drop-shadow-sm flex-shrink-0"
                      />
                      <div className="flex flex-col">
                        <p className="font-marker text-yellow-800 text-xs sm:text-sm tracking-wider leading-tight">#1 WORLD'S ONLY</p>
                        <p className="font-marker text-yellow-700 text-[10px] tracking-widest leading-tight">PAPER UI PLATFORM</p>
                      </div>
                    </div>
                    <p className="font-hand text-yellow-950 text-sm sm:text-sm leading-snug">
                      World's only Paper UI — MIT Licensed. Created by Rajnikant Gaurav.
                    </p>
                  </div>
                </div>
              </div>

              {/* NOTE 4: Future Goal — below badge on left */}
              <div className="fixed top-[270px] sm:top-[315px] left-1 sm:left-2 md:left-3 lg:left-4 z-50 transform rotate-3 hover:rotate-0 transition-transform duration-300 pointer-events-auto">
                <div className="relative group">
                  <div className="absolute inset-0 bg-yellow-400 rotate-2 rounded shadow-md group-hover:rotate-1 transition-transform" />
                  <div className="relative bg-yellow-200 text-yellow-900 p-3.5 sm:p-4 rounded shadow-lg border border-yellow-300 w-44 sm:w-52 font-hand leading-snug">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-yellow-900/20 -rotate-1 backdrop-blur-sm drop-shadow-sm tape-serrated" />
                    <p className="font-marker text-yellow-800 text-xs sm:text-sm tracking-wider mb-1.5">FUTURE GOAL 🎯</p>
                    <p className="font-hand text-yellow-950 text-sm sm:text-base leading-snug">
                      Not looking for a job title.<br/>Building toward something of my own.
                    </p>
                  </div>
                </div>
              </div>

              {/* NOTE 3: Curiosity — below Future Goal on left */}
              <div className="fixed top-[450px] sm:top-[510px] left-1 sm:left-2 md:left-3 lg:left-4 z-50 transform -rotate-4 hover:rotate-0 transition-transform duration-300 pointer-events-auto">
                <div className="relative group">
                  <div className="absolute inset-0 bg-yellow-400 rotate-3 rounded shadow-md group-hover:rotate-1 transition-transform" />
                  <div className="relative bg-yellow-200 text-yellow-900 p-3.5 sm:p-4 rounded shadow-lg border border-yellow-300 w-44 sm:w-52 font-hand leading-snug">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-yellow-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm tape-serrated" />
                    <p className="font-marker text-yellow-800 text-xs sm:text-sm tracking-wider mb-1.5">CURIOSITY 🔧</p>
                    <p className="font-hand text-yellow-950 text-sm sm:text-base leading-snug">
                      If I don't know how it works,<br/>I'll probably build it to find out.
                    </p>
                  </div>
                </div>
              </div>

              {/* NOTE 1: Builder — Right side, top */}
              <div className="fixed top-10 sm:top-14 right-1 sm:right-2 md:right-3 lg:right-4 z-50 transform rotate-4 hover:rotate-0 transition-transform duration-300 pointer-events-auto">
                <div className="relative group">
                  <div className="absolute inset-0 bg-yellow-400 rotate-3 rounded shadow-md group-hover:rotate-1 transition-transform" />
                  <div className="relative bg-yellow-200 text-yellow-900 p-3.5 sm:p-4 rounded shadow-lg border border-yellow-300 w-44 sm:w-52 font-hand leading-snug">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-yellow-900/20 rotate-2 backdrop-blur-sm drop-shadow-sm tape-serrated" />
                    <p className="font-marker text-yellow-800 text-xs sm:text-sm tracking-wider mb-1.5">BUILDER 🚀</p>
                    <p className="font-hand text-yellow-950 text-sm sm:text-base leading-snug">
                      I don't just learn technology.<br/>I build with it.
                    </p>
                  </div>
                </div>
              </div>

              {/* NOTE 2: Startup Mindset — Right side, middle */}
              <div className="fixed top-[200px] sm:top-[235px] right-1 sm:right-2 md:right-3 lg:right-4 z-50 transform -rotate-3 hover:rotate-0 transition-transform duration-300 pointer-events-auto">
                <div className="relative group">
                  <div className="absolute inset-0 bg-yellow-400 -rotate-2 rounded shadow-md group-hover:rotate-0 transition-transform" />
                  <div className="relative bg-yellow-200 text-yellow-900 p-3.5 sm:p-4 rounded shadow-lg border border-yellow-300 w-44 sm:w-52 font-hand leading-snug">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-yellow-900/20 -rotate-2 backdrop-blur-sm drop-shadow-sm tape-serrated" />
                    <p className="font-marker text-yellow-800 text-xs sm:text-sm tracking-wider mb-1.5">STARTUP MINDSET 💡</p>
                    <p className="font-hand text-yellow-950 text-sm sm:text-base leading-snug">
                      Currently building ideas<br/>that I hope become businesses.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Toggle Button (Icon Only) - positioned higher above nav */}
            <button
              onClick={toggleTheme}
              style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
              title={isDarkMode ? 'Switch to White Page' : 'Switch to Black Page'}
              aria-label={isDarkMode ? 'Switch to White Page' : 'Switch to Black Page'}
              className={`absolute -top-3 right-2.5 sm:-top-4 sm:right-5 md:-top-3.5 md:right-6 z-40 flex items-center justify-center p-1.5 sm:p-2.5 border-[2px] sm:border-[3px] transform -rotate-2 hover:rotate-0 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md ${isDarkMode
                  ? 'border-yellow-400 text-yellow-300 hover:bg-slate-800 bg-slate-900 shadow-yellow-900/20'
                  : 'border-slate-600 text-slate-700 hover:bg-white bg-white shadow-slate-400/20'
                }`}
            >
              {isDarkMode ? <Sun size={18} className="sm:w-5 sm:h-5" /> : <Moon size={18} className="sm:w-5 sm:h-5" />}
            </button>

            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                backgroundImage: isDarkMode
                  ? 'linear-gradient(transparent 1.95rem, #334155 2rem)'
                  : 'linear-gradient(transparent 1.95rem, #94a3b8 2rem)',
                backgroundSize: '100% 2rem',
                backgroundPosition: '0 1.5rem'
              }}
            />

            <div className={`absolute top-0 bottom-0 left-6 sm:left-32 w-0.5 z-0 h-full ${isDarkMode ? 'bg-red-900/50' : 'bg-red-300'}`} />

            <div className="relative z-10 w-full h-full pb-16 flex flex-col min-h-[90vh]">

              {/* === PAGE: NOTEBOOK === */}
              {view === 'notebook' && (
                <NotebookPage
                  isDarkMode={isDarkMode}
                  onAboutClick={handleAboutClick}
                  onProjectClick={handleProjectClick}
                  onProjectsListClick={handleProjectsListClick}
                  onDonateClick={handleDonateClick}
                  onSponsorClick={handleSponsorClick}
                  scrollTo={scrollTo}
                  PolaroidImage={PolaroidImage}
                  SectionStar={SectionStar}
                />
              )}

              {/* === PAGE: ABOUT DETAIL === */}
              {view === 'about-detail' && (
                <AboutDetailPage
                  isDarkMode={isDarkMode}
                  onBack={() => navigate('notebook')}
                  SectionStar={SectionStar}
                />
              )}

              {/* === PAGE: PROJECTS LIST (ALL PROJECTS) === */}
              {view === 'projects-list' && (
                <ProjectsListPage
                  isDarkMode={isDarkMode}
                  onBack={() => navigate('notebook')}
                  onProjectClick={handleProjectClick}
                  PolaroidImage={PolaroidImage}
                  SectionStar={SectionStar}
                />
              )}

              {/* === VIEW: PROJECT DETAIL === */}
              {view === 'project-detail' && currentProject && (
                <ProjectDetailPage
                  isDarkMode={isDarkMode}
                  currentProject={currentProject}
                  onBack={() => navigate('projects-list')}
                  PolaroidImage={PolaroidImage}
                  SectionStar={SectionStar}
                />
              )}

              {/* === PAGE: DONATE === */}
              {view === 'donate' && (
                <DonatePage
                  isDarkMode={isDarkMode}
                  selectedTier={selectedTier}
                  onBack={() => navigate('notebook')}
                  onTierSelect={handleTierSelect}
                  PolaroidImage={PolaroidImage}
                  SectionStar={SectionStar}
                />
              )}

              {/* === PAGE: SPONSOR === */}
              {view === 'sponsor' && (
                <SponsorPage
                  isDarkMode={isDarkMode}
                  selectedTier={selectedTier}
                  partnerName={partnerName}
                  partnerEmailInput={partnerEmailInput}
                  partnerMessage={partnerMessage}
                  partnerSent={partnerSent}
                  onBack={() => navigate('notebook')}
                  onTierSelect={handleTierSelect}
                  onPartnerNameChange={setPartnerName}
                  onPartnerEmailChange={setPartnerEmailInput}
                  onPartnerMessageChange={setPartnerMessage}
                  onPartnerSubmit={handlePartnerSubmit}
                  onDeselect={() => setSelectedTier(null)}
                  SectionStar={SectionStar}
                />
              )}

              {/* Copyright & All Rights Reserved Footer (Sticky at bottom of container) */}
              <footer className={`mt-auto pt-16 pb-6 text-center notebook-text text-base sm:text-lg reveal-on-scroll ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <p className="font-hand flex items-center justify-center gap-2">
                  <span>{data.general.footerText ? (data.general.footerText.includes('Rajnikant') ? data.general.footerText : `${data.general.footerText} By Rajnikant Gaurav`) : `Built with 💻 & ☕. By Rajnikant Gaurav`}</span>
                  <button
                    onClick={() => navigate('admin')}
                    className="text-xs opacity-30 hover:opacity-100 hover:text-blue-500 transition-opacity ml-1 cursor-pointer"
                    title="Admin Panel"
                  >
                    ⚙️
                  </button>
                </p>
                <p className="font-hand text-xs sm:text-sm mt-1.5 opacity-80 flex items-center justify-center gap-1.5">
                  <span>© {new Date().getFullYear()} Rajnikant Gaurav. All rights reserved.</span>
                </p>
              </footer>

            </div>
          </div>

          {/* Scroll Up Paper Plane */}
          <button
            onClick={scrollToTop}
            className={`fixed bottom-6 left-6 z-40 transition-all duration-1000 transform ${isFlying
                ? '-translate-y-[120vh] rotate-[-10deg] opacity-0'
                : showScrollTop
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-32 opacity-0'
              }`}
            aria-label="Scroll to top"
          >
            <div className={`group relative transition-transform duration-300 hover:-translate-y-2 hover:-rotate-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="filter drop-shadow-sm transform -rotate-45"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
              <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 text-sm font-hand font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${isFlying ? 'hidden' : ''}`}>
                Take off!
              </div>
            </div>
          </button>

          <StickyNoteChat />
        </div>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AdminDataProvider>
      <AppContent />
    </AdminDataProvider>
  );
};

export default App;
