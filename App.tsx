
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Star, ArrowLeft, Pencil, Coffee, Sparkles, Check, QrCode, Megaphone, Trophy, Briefcase, Mail } from 'lucide-react';
import { StickyNoteChat } from './components/StickyNoteChat';
import { projectsData } from './data/projects';
import { Project } from './types';
import { NotebookPage } from './src/pages/NotebookPage';
import { AboutDetailPage } from './src/pages/AboutDetailPage';
import { ProjectsListPage } from './src/pages/ProjectsListPage';
import { ProjectDetailPage } from './src/pages/ProjectDetailPage';
import { DonatePage } from './src/pages/DonatePage';
import { SponsorPage } from './src/pages/SponsorPage';

const App: React.FC = () => {
  const [view, setView] = useState<'notebook' | 'donate' | 'sponsor' | 'project-detail' | 'about-detail' | 'projects-list'>('notebook');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
   const [partnerName, setPartnerName] = useState('');
   const [partnerEmailInput, setPartnerEmailInput] = useState('');
   const [partnerMessage, setPartnerMessage] = useState('');
   const [partnerSent, setPartnerSent] = useState(false);

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

  const scrollTo = (id: string) => {
    if (view !== 'notebook') {
      setView('notebook');
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
    setView('donate');
    setSelectedTier(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSponsorClick = () => {
    setView('sponsor');
    setSelectedTier(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutClick = () => {
    setView('about-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectClick = (project: Project) => {
    setCurrentProject(project);
    setView('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectsListClick = () => {
    setView('projects-list');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
  const PolaroidImage = ({ src, alt, rotate = 'rotate-2', caption, imgHeight = "h-24 sm:h-32" }: { src: string, alt: string, rotate?: string, caption?: string, imgHeight?: string }) => (
    <div className={`relative shrink-0 z-10 group ${rotate} hover:rotate-0 transition-transform duration-300 w-32 sm:w-40 mx-auto md:mx-0 cursor-pointer`}>
      <div className="bg-white p-2 shadow-md border border-gray-200 flex flex-col">
        <img 
          src={src} 
          alt={alt} 
          className={`w-full ${imgHeight} object-cover filter sepia-[.2] border border-gray-100`}
        />
        {caption && <div className="font-hand text-center mt-2 text-gray-600 leading-tight text-sm pb-1">{caption}</div>}
      </div>
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm opacity-80 tape-serrated" />
    </div>
  );

  const SectionStar = () => (
    <div className="absolute -left-8 sm:-left-20 top-2 text-yellow-500 transform -rotate-12">
      <Star size={32} fill="currentColor" strokeWidth={2} className="drop-shadow-sm" />
    </div>
  );

  return (
    <div className={`min-h-screen w-full flex justify-center py-8 px-2 sm:px-8 font-hand transition-colors duration-500 cursor-default ${isDarkMode ? 'bg-[#0f172a] text-slate-200' : 'bg-[#dbeafe] text-slate-800'}`}>
      
      <div className={`relative w-full max-w-5xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] min-h-[95vh] flex flex-col transition-all duration-500 ${isDarkMode ? 'bg-[#1e293b]' : 'bg-white'}`}>
        
        <button 
          onClick={toggleTheme}
          style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
          className={`absolute top-6 right-6 z-50 flex items-center gap-2 font-marker font-bold px-4 py-2 border-[3px] transform -rotate-2 hover:rotate-0 transition-all duration-300 cursor-pointer ${
            isDarkMode 
              ? 'border-yellow-400 text-yellow-300 hover:bg-slate-800 bg-slate-900/50' 
              : 'border-slate-600 text-slate-600 hover:bg-white bg-white/50'
          }`}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{isDarkMode ? 'White Page' : 'Black Page'}</span>
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
              onBack={() => setView('notebook')}
              SectionStar={SectionStar}
            />
          )}

          {/* === PAGE: PROJECTS LIST (ALL PROJECTS) === */}
          {view === 'projects-list' && (
            <ProjectsListPage
              isDarkMode={isDarkMode}
              onBack={() => setView('notebook')}
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
              onBack={() => setView('projects-list')}
              PolaroidImage={PolaroidImage}
              SectionStar={SectionStar}
            />
           )}

          {/* === PAGE: DONATE === */}
          {view === 'donate' && (
            <DonatePage
              isDarkMode={isDarkMode}
              selectedTier={selectedTier}
              onBack={() => setView('notebook')}
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
              onBack={() => setView('notebook')}
              onTierSelect={handleTierSelect}
              onPartnerNameChange={setPartnerName}
              onPartnerEmailChange={setPartnerEmailInput}
              onPartnerMessageChange={setPartnerMessage}
              onPartnerSubmit={handlePartnerSubmit}
              onDeselect={() => setSelectedTier(null)}
              SectionStar={SectionStar}
            />
          )}

          {/* Copyright Footer (Sticky at bottom of container) */}
          <footer className={`mt-auto pt-16 pb-4 text-center notebook-text text-lg reveal-on-scroll ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
             <p className="font-hand">
               © {new Date().getFullYear()} Rajnikant Gaurav. Built with 💻 & ☕.
             </p>
          </footer>

        </div>
      </div>

      {/* Scroll Up Paper Plane */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-40 transition-all duration-1000 transform ${
          isFlying 
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
  );
};

export default App;
