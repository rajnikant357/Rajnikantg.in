import React, { useState, useEffect } from 'react';
import { ArrowLeft, Github, Linkedin, Twitter, Globe, GraduationCap, MapPin, Award, Camera, X, Maximize2 } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

interface AboutDetailPageProps {
  isDarkMode: boolean;
  onBack: () => void;
  SectionStar: () => React.ReactNode;
}

interface PhotoMemory {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  note: string;
  rotate: string;
  tapeRotate: string;
}

const photoMemories: PhotoMemory[] = [
  {
    id: 'myself',
    src: '/myself.jpg',
    alt: 'Rajnikant - Everyday Me',
    title: 'Everyday Me',
    caption: 'Everyday Me',
    note: 'At the coding desk & building products',
    rotate: '-rotate-2',
    tapeRotate: 'rotate-1'
  },
  {
    id: 'professional',
    src: '/professional me.png',
    alt: 'Rajnikant - Professional Me',
    title: 'Professional Me',
    caption: 'Professional Me',
    note: 'Conferences & formal milestones',
    rotate: 'rotate-2',
    tapeRotate: '-rotate-2'
  },
  {
    id: 'wondering',
    src: '/wondering me.jpg',
    alt: 'Rajnikant - Wondering Me',
    title: 'Wondering Me',
    caption: 'Wondering Me',
    note: 'Brainstorming architectures & ideas',
    rotate: '-rotate-1',
    tapeRotate: 'rotate-2'
  },
  {
    id: 'selfie',
    src: '/selfie.jpeg',
    alt: 'Rajnikant - Candid Selfie',
    title: 'Candid Selfie',
    caption: 'Candid Selfie',
    note: 'A spontaneous snapshot in the moment',
    rotate: 'rotate-3',
    tapeRotate: '-rotate-1'
  },
  {
    id: 'jungle',
    src: '/jungle.jpeg',
    alt: 'Rajnikant - In the Wild',
    title: 'In the Wild',
    caption: 'In the Wild',
    note: 'Recharging amidst trees & nature',
    rotate: '-rotate-2',
    tapeRotate: 'rotate-1'
  },
];

export const AboutDetailPage: React.FC<AboutDetailPageProps> = ({
  isDarkMode,
  onBack,
  SectionStar,
}) => {
  const { data } = useAdminData();
  const { about } = data;
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedPhoto]);

  return (
    <main className="pl-6 sm:pl-36 pr-4 sm:pr-12 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-grow">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className={`group flex items-center gap-2 text-xl font-bold hover:text-blue-500 transition-colors mb-6 cursor-pointer ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Notebook</span>
      </button>

      <div className="relative mb-12">
        {SectionStar()}
        <h1 className="notebook-text text-4xl sm:text-5xl font-marker text-blue-600 leading-[3rem] sm:leading-[4rem] mb-4 reveal-on-scroll">
          About Me
        </h1>
        <div className="absolute -left-12 -top-6 hidden sm:block">
        </div>
      </div>

      <div className="space-y-12 max-w-4xl">
        
        {/* Summary */}
        <section className="reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold mb-2 leading-[2rem] text-teal-600 dark:text-teal-400 flex items-center gap-2">
            👋 Short Summary
          </h3>
          <div className="notebook-text text-xl leading-[2rem] space-y-4">
            {about.summary.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </section>

        {/* Photo Gallery: Captured Moments */}
        <section className="reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold mb-2 leading-[2rem] text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Camera size={26} className="text-indigo-500 dark:text-indigo-400" />
            <span>📸 Captured Moments — Polaroids from My Journey</span>
          </h3>
          <p className="notebook-text text-xl leading-[2rem] text-indigo-800 dark:text-indigo-300 font-medium italic mb-6">
            A few candid polaroids taped onto my journal — from my coding desk and milestones to selfies and exploring the wild.{' '}
            <span className="text-pink-600 dark:text-pink-400 font-bold not-italic underline decoration-wavy underline-offset-4">
              Click any photo to enlarge.
            </span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 sm:gap-6 pt-3 pb-4">
            {photoMemories.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className={`group relative shrink-0 cursor-pointer ${photo.rotate} hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 ${
                  index === 4 ? 'col-span-2 sm:col-span-1 max-w-[190px] mx-auto w-full' : ''
                }`}
                title={`Click to view ${photo.title}`}
              >
                {/* Polaroid Frame */}
                <div className="bg-white p-2 sm:p-2.5 shadow-md hover:shadow-xl border border-gray-200 flex flex-col transition-shadow">
                  <div className="relative overflow-hidden bg-neutral-100">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-36 sm:h-40 md:h-44 object-cover filter sepia-[.15] group-hover:sepia-0 group-hover:scale-105 transition-all duration-300 border border-gray-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-1.5 bg-white/90 text-slate-800 rounded-full shadow-sm">
                        <Maximize2 size={16} />
                      </span>
                    </div>
                  </div>
                  <div className="font-hand text-center mt-2 text-slate-800 font-bold leading-tight text-base sm:text-lg">
                    {photo.caption}
                  </div>
                  <div className="font-hand text-center text-slate-500 text-xs sm:text-xs leading-tight line-clamp-1">
                    {photo.note}
                  </div>
                </div>
                {/* Masking Tape on top */}
                <div
                  className={`absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-4 sm:h-5 bg-amber-900/20 ${photo.tapeRotate} backdrop-blur-sm drop-shadow-sm opacity-85 tape-serrated pointer-events-none`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Modal Lightbox for Full Resolution View — Popout Card with 35% Blur Background & No Dark Screen */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent cursor-zoom-out animate-in fade-in duration-200"
            style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
            onClick={() => setSelectedPhoto(null)}
          >
            <div 
              className="relative max-w-lg w-full bg-white dark:bg-slate-800 p-4 sm:p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-2 border-slate-300 dark:border-slate-600 rounded-sm transform rotate-[-0.5deg] cursor-default animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tape strip on top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-900/25 rotate-1 backdrop-blur-sm drop-shadow-sm tape-serrated pointer-events-none" />
              
              {/* Close button with hand-drawn styling */}
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-2 right-2 text-slate-500 hover:text-slate-800 dark:hover:text-white p-1 rounded-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                title="Close"
              >
                <X size={24} />
              </button>

              {/* Enlarged image */}
              <div className="overflow-hidden border border-gray-200 dark:border-slate-700 bg-neutral-100 dark:bg-slate-900 mt-3 mb-4 flex items-center justify-center max-h-[65vh]">
                <img 
                  src={selectedPhoto.src} 
                  alt={selectedPhoto.alt}
                  className="w-full max-h-[65vh] object-contain"
                />
              </div>

              {/* Caption & note */}
              <div className="text-center font-hand">
                <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-marker">{selectedPhoto.title}</h4>
                <p className="text-lg text-indigo-700 dark:text-indigo-300 mt-1">{selectedPhoto.note}</p>
              </div>
            </div>
          </div>
        )}

        {/* Future Goals */}
        <section className="reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold mb-2 leading-[2rem] text-purple-600 flex items-center gap-2">
            🚀 Future Goals
          </h3>
          <div className="notebook-text text-xl leading-[2rem]">
            {about.futureGoals.map((line, i) => (
              <p key={i} className={i === 0 ? "font-bold" : ""}>{line}</p>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold mb-4 leading-[2rem] text-green-600 flex items-center gap-2">
            ⚡ Skills & Hobbies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="notebook-text text-xl font-bold underline mb-2 leading-[2rem]">Tech Stack</h4>
              <ul className="list-disc pl-5 notebook-text text-xl leading-[2rem]">
                {about.techStack.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="notebook-text text-xl font-bold underline mb-2 leading-[2rem]">Hobbies</h4>
              <ul className="list-disc pl-5 notebook-text text-xl leading-[2rem]">
                {about.hobbies.map((hobby, i) => (
                  <li key={i}>{hobby}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Networks */}
        <section className="reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold mb-4 leading-[2rem] text-blue-600 flex items-center gap-2">
            🌐 My Network
          </h3>
          <div className="flex flex-wrap gap-4 notebook-text text-xl leading-[2rem]">
            {about.networks.map((net, i) => {
              const Icon = net.icon === 'Linkedin' || net.label === 'LinkedIn' ? Linkedin : net.icon === 'Github' || net.label === 'GitHub' ? Github : net.icon === 'Twitter' || net.label === 'Twitter' ? Twitter : Globe;
              return (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-gray-400">|</span>}
                  <a href={net.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-500 font-bold hover:underline decoration-wavy">
                    <Icon size={20} /> {net.label}
                  </a>
                </React.Fragment>
              );
            })}
          </div>
        </section>

        {/* Education */}
        <section className="reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold mb-4 leading-[2rem] text-red-600 flex items-center gap-2">
            🎓 Educational Background
          </h3>
          <div className="notebook-text text-xl leading-[2rem]">
            {about.education.map((edu, i) => {
              const Icon = i === 0 ? GraduationCap : MapPin;
              return (
                <div key={i} className="mb-4">
                  <p className="font-bold flex items-center gap-2">
                    <Icon size={20}/> {edu.degree}, {edu.institution}
                  </p>
                  <p className="pl-7 italic">{edu.period}</p>
                  {edu.note && <p className="pl-7 text-sm text-slate-500">{edu.note}</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* Achievements */}
        <section className="reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold mb-4 leading-[2rem] text-amber-600 flex items-center gap-2">
            🏆 Achievements
          </h3>
          <ul className="list-none pl-2 notebook-text text-xl leading-[2rem]">
            {about.achievements.map((ach, i) => (
              <li key={i} className="flex items-start gap-2 mb-2">
                <Award className="mt-1 text-amber-500 shrink-0" size={20} />
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Journey */}
        <section className="reveal-on-scroll pb-8">
          <h3 className="notebook-text text-2xl font-bold mb-4 leading-[2rem] text-pink-600 flex items-center gap-2">
            🛣️ My Full Journey
          </h3>
          <div className="border-l-2 border-slate-300 pl-6 ml-2 space-y-8 relative">
            {about.journey.map((step, i) => (
              <div key={i} className="relative">
                <div className={`absolute -left-[31px] top-2 w-4 h-4 rounded-full border-2 border-white ${step.isPulse ? 'bg-purple-500 animate-pulse' : 'bg-slate-400'}`}></div>
                <h4 className="notebook-text text-xl font-bold leading-[2rem]">{step.title}</h4>
                <p className="notebook-text text-lg leading-[2rem]">{step.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
