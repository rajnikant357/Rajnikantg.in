import React, { useState } from 'react';
import { ExternalLink, Github, Mail, Linkedin, Pencil, Heart, ArrowLeft, QrCode, Coffee, Sparkles, Check, Briefcase, Megaphone, Trophy, Moon, Sun, Star, Globe, Award, GraduationCap, MapPin, Twitter, Phone, X, Eye, ZoomIn, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { Project } from '../../types';
import { useAdminData } from '../context/AdminDataContext';
import { certificatesData, CertificateItem } from '../../data/certificates';

interface NotebookPageProps {
  isDarkMode: boolean;
  onAboutClick: () => void;
  onProjectClick: (project: Project) => void;
  onProjectsListClick: () => void;
  onDonateClick: () => void;
  onSponsorClick: () => void;
  scrollTo: (id: string) => void;
  PolaroidImage: (props: any) => React.ReactNode;
  SectionStar: () => React.ReactNode;
}

export const NotebookPage: React.FC<NotebookPageProps> = ({
  isDarkMode,
  onAboutClick,
  onProjectClick,
  onProjectsListClick,
  onDonateClick,
  onSponsorClick,
  scrollTo,
  PolaroidImage,
}) => {
  const { data } = useAdminData();
  const { general, about, contact, projects } = data;

  // Filter state for certificates
  const [certFilter, setCertFilter] = useState<'all' | 'Google' | 'Oasis Infobyte' | 'Acmegrade'>('all');
  
  // Modal state for viewing big certificate card
  const [activeCertModal, setActiveCertModal] = useState<{
    cert: CertificateItem;
    activeImageIndex: number;
  } | null>(null);

  const filteredCertificates = certificatesData.filter((item) => {
    if (certFilter === 'all') return true;
    return item.organization.toLowerCase().includes(certFilter.toLowerCase());
  });

  return (
    <>
      <header className="flex flex-row items-center sm:items-start gap-3 sm:gap-6 pt-6 px-4 sm:px-12 mb-4 relative reveal-on-scroll">
        <div className="relative shrink-0 sm:-ml-4 z-20 group cursor-pointer">
          <div className="bg-white p-1 sm:p-1.5 shadow-md border border-gray-200 w-16 h-16 sm:w-24 sm:h-24 rotate-[-2deg] group-hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
            <img
              src="/R%20logo%201.jpg"
              alt="Rajnikant Gaurav logo"
              className="w-14 h-14 sm:w-20 sm:h-20 object-cover filter sepia-[.2]"
            />
          </div>
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-4 sm:h-6 bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm tape-serrated" />
        </div>
        <nav className="flex-1 mt-0 sm:mt-8 pl-1 sm:pl-8">
          <ul className={`flex flex-wrap items-center gap-2.5 sm:gap-7 text-base sm:text-2xl font-bold tracking-wide ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
            <li>
              <button
                onClick={() => scrollTo('home')}
                className="hover:text-blue-500 hover:underline decoration-2 decoration-wavy decoration-blue-400 underline-offset-4 transition-all cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={onAboutClick}
                className="hover:text-blue-500 hover:underline decoration-2 decoration-wavy decoration-blue-400 underline-offset-4 transition-all cursor-pointer"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={onProjectsListClick}
                className="hover:text-blue-500 hover:underline decoration-2 decoration-wavy decoration-blue-400 underline-offset-4 transition-all cursor-pointer"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollTo('certifications')}
                className="hover:text-blue-500 hover:underline decoration-2 decoration-wavy decoration-blue-400 underline-offset-4 transition-all cursor-pointer"
              >
                Certifications
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollTo('contact')}
                className="hover:text-blue-500 hover:underline decoration-2 decoration-wavy decoration-blue-400 underline-offset-4 transition-all cursor-pointer"
              >
                Contact
              </button>
            </li>
            <li>
              <button
                onClick={onDonateClick}
                className="hover:text-yellow-700 hover:underline decoration-2 decoration-wavy decoration-yellow-400 underline-offset-4 transition-all text-yellow-800 cursor-pointer"
              >
                Fund Me
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="pl-6 sm:pl-36 pr-4 sm:pr-12 flex-grow">

        {/* Home Section */}
        <section id="home" className="mb-8 sm:mb-10 pt-2 flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8 reveal-on-scroll">
          <div className="flex-1 w-full">
            <div className="notebook-text text-base sm:text-2xl md:text-3xl font-bold uppercase tracking-wider sm:tracking-widest leading-[1.8rem] sm:leading-[2.5rem] flex flex-row items-center justify-between gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <span>NAME = </span>
                <span className="font-marker text-xl sm:text-3xl md:text-4xl ml-1">{general.name}</span>
              </div>

              {/* Mobile-only Circle Design Resume Button beside Name */}
              {general.resumeLink && (
                <div className="md:hidden relative z-20 group cursor-pointer inline-flex items-center shrink-0">
                  <a href={general.resumeLink} download className="block relative cursor-pointer" title="Download Resume">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                      <div className="absolute inset-0 border-[2.5px] border-purple-500 rounded-[60%_40%_50%_50%_/_50%_40%_60%_50%] transform -rotate-2 group-hover:rotate-3 transition-transform duration-300 shadow-sm bg-transparent"></div>
                      <div className="absolute inset-0.5 border-[1.5px] border-purple-300 rounded-[40%_60%_50%_50%_/_50%_60%_40%_50%] transform rotate-12 scale-105 opacity-70 group-hover:rotate-6 transition-transform"></div>

                      <div className="text-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                        <span className="block font-marker text-purple-600 text-xs sm:text-sm leading-none font-bold">RESUME</span>
                        <span className="block font-hand text-purple-500 text-[8px] sm:text-[9px] font-bold tracking-wider">DOWNLOAD</span>
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <div className="h-4 sm:h-6"></div>
            <div className="notebook-text text-xl sm:text-2xl leading-[2rem]">
              <p>{general.tagline}</p>
              <p>{general.subTagline}</p>
            </div>
          </div>

          {/* Desktop-only Circle Design Resume Badge */}
          {general.resumeLink && (
            <div className="hidden md:block relative z-20 group cursor-pointer mt-0 mr-4 shrink-0">
              <a href={general.resumeLink} download className="block relative cursor-pointer">
                <div className="absolute -left-14 top-1/2 -translate-y-1/2 text-purple-500 hidden sm:block animate-pulse">
                  <svg width="50" height="40" viewBox="0 0 50 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 25 Q 20 5 45 15" />
                    <path d="M35 10 L 45 15 L 38 22" />
                  </svg>
                </div>

                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 border-[3px] border-purple-500 rounded-[60%_40%_50%_50%_/_50%_40%_60%_50%] transform -rotate-2 group-hover:rotate-3 transition-transform duration-300 shadow-sm bg-transparent"></div>
                  <div className="absolute inset-1 border-[2px] border-purple-300 rounded-[40%_60%_50%_50%_/_50%_60%_40%_50%] transform rotate-12 scale-105 opacity-70 group-hover:rotate-6 transition-transform"></div>

                  <div className="text-center transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                    <span className="block font-marker text-purple-600 text-xl leading-none">RESUME</span>
                    <span className="block font-hand text-purple-500 text-xs font-bold tracking-wider">DOWNLOAD</span>
                  </div>
                </div>
              </a>
            </div>
          )}
        </section>

        {/* About Section */}
        <section id="about" className="mb-16 scroll-mt-24 reveal-on-scroll">
          {/* Photos Row (aligned horizontally in the center ABOVE the About Me text) */}
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-14 md:gap-20 lg:gap-24 mb-8 overflow-x-auto py-3 px-1 w-full">
            {PolaroidImage({
              src: general.profileImage || "/myself.jpg",
              alt: "Rajnikant - Me",
              rotate: "rotate-2",
              caption: "Me",
              className: "w-24 sm:w-32 md:w-36 shrink-0",
              imgHeight: "h-20 sm:h-24 md:h-28"
            })}

            {PolaroidImage({
              src: "/professional me.png",
              alt: "Rajnikant - Professional Me",
              rotate: "-rotate-2",
              caption: "Professional Me",
              className: "w-24 sm:w-32 md:w-36 shrink-0",
              imgHeight: "h-20 sm:h-24 md:h-28"
            })}

            {PolaroidImage({
              src: "/wondering me.jpg",
              alt: "Rajnikant - Wondering Me",
              rotate: "rotate-2",
              caption: "Wondering Me",
              className: "w-24 sm:w-32 md:w-36 shrink-0",
              imgHeight: "h-20 sm:h-24 md:h-28"
            })}
          </div>

          <div>
            <h2 className="notebook-text text-2xl font-bold mb-2 leading-[2rem]">About Me -</h2>
            <div className="notebook-text text-xl leading-[2rem]">
              {about.summary.slice(0, 4).map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              <button
                onClick={onAboutClick}
                className="mt-1 text-blue-600 font-bold hover:underline decoration-wavy transition-all flex items-center gap-2 w-max cursor-pointer"
              >
                Read my full story &rarr;
              </button>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-16 scroll-mt-24 reveal-on-scroll">
          <h2 className="notebook-text text-2xl font-bold mb-8 leading-[2rem]">Projects -</h2>

          <div className="space-y-6">
            {projects.slice(0, 3).map((project, index) => (
              <div
                key={project.id}
                className={`group flex flex-col gap-6 items-start ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
              >
                <div className="shrink-0" onClick={() => onProjectClick(project)}>
                  {PolaroidImage({
                    src: project.image,
                    alt: project.title,
                    rotate: index % 2 === 0 ? '-rotate-2' : 'rotate-2',
                    caption: project.title,
                    imgHeight: "h-20 sm:h-24"
                  })}
                </div>
                <div className={`flex-1 w-full ${index % 2 !== 0 ? 'sm:text-right' : ''}`}>
                  <div
                    className="notebook-text text-xl leading-[2rem] hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={() => onProjectClick(project)}
                  >
                    <span className="font-bold text-2xl">{index + 1}. {project.title} - </span>
                    <span className="font-bold">{project.tagline}</span>
                  </div>
                  <div className={`notebook-text text-xl leading-[2rem] pl-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                    {project.subTagline}
                  </div>
                  {(project.demoLink || project.repoLink) && (
                    <div className={`notebook-text text-xl leading-[2rem] pl-6 flex flex-wrap items-center gap-4 mt-1 ${index % 2 !== 0 ? 'sm:justify-end' : ''
                      }`}>
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center px-2 bg-yellow-100/50 hover:bg-yellow-200 text-blue-600 font-bold border border-transparent rounded transition-colors cursor-pointer shadow-sm transform hover:-rotate-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          LIVE DEMO <ExternalLink size={18} className="ml-1" />
                        </a>
                      )}
                      {project.repoLink && (
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center px-2 bg-gray-100/50 hover:bg-gray-200 font-bold border border-transparent rounded transition-colors cursor-pointer shadow-sm transform hover:rotate-1 ${isDarkMode ? 'text-slate-300 hover:text-slate-800' : 'text-slate-700'}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          VIEW REPO <Github size={18} className="ml-1" />
                        </a>
                      )}
                    </div>
                  )}
                  <div className={`mt-2 pl-6 flex ${index % 2 !== 0 ? 'sm:justify-end' : ''}`}>
                    <button
                      onClick={() => onProjectClick(project)}
                      className="text-sm font-bold text-slate-500 hover:text-blue-500 hover:underline decoration-wavy cursor-pointer flex items-center gap-1"
                    >
                      View Details &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center notebook-text text-xl leading-[2rem]">
            <button
              onClick={onProjectsListClick}
              className={`font-bold transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto hover:underline decoration-wavy ${isDarkMode ? 'text-slate-300 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'}`}
            >
              View All Projects &rarr;
            </button>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="mb-16 scroll-mt-24 reveal-on-scroll">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="notebook-text text-2xl sm:text-3xl font-bold leading-[2rem] flex items-center gap-2">
              <Award className="text-yellow-500" size={28} />
              <span>Certifications & Achievements -</span>
            </h2>

            {/* Organization filter pills */}
            <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
              {[
                { label: 'All', value: 'all', count: certificatesData.length },
                { label: 'Google', value: 'Google', count: 5 },
                { label: 'Oasis Infobyte', value: 'Oasis Infobyte', count: 1 },
                { label: 'Acmegrade', value: 'Acmegrade', count: 1 },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setCertFilter(tab.value as any)}
                  className={`px-3 py-1 rounded-sm border transition-all cursor-pointer transform ${
                    certFilter === tab.value
                      ? 'bg-yellow-300 text-yellow-900 border-yellow-500 -rotate-1 shadow-sm font-bold scale-105'
                      : isDarkMode
                      ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {tab.label} <span className="text-xs opacity-75">({tab.count})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {filteredCertificates.map((cert, index) => {
              const isMultiImage = cert.images.length > 1;
              const primaryImage = cert.images[0];

              return (
                <div
                  key={cert.id}
                  className={`group flex flex-col gap-6 items-start ${
                    index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Polaroid Thumbnail / Stack */}
                  <div
                    className="shrink-0 relative group cursor-pointer"
                    onClick={() => setActiveCertModal({ cert, activeImageIndex: 0 })}
                  >
                    {/* If multiple images, render a stacked background layer */}
                    {isMultiImage && (
                      <div className="absolute inset-0 bg-yellow-100/60 dark:bg-yellow-900/30 border border-amber-300 rounded-sm transform rotate-4 translate-x-2 translate-y-2 shadow-sm pointer-events-none" />
                    )}

                    <div className="relative">
                      {PolaroidImage({
                        src: primaryImage.src,
                        alt: cert.title,
                        rotate: index % 2 === 0 ? '-rotate-2' : 'rotate-2',
                        caption: isMultiImage ? `${cert.images.length} Documents` : cert.organization,
                        imgHeight: "h-24 sm:h-28",
                        className: "w-36 sm:w-44"
                      })}

                      {/* Click overlay indicator */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/30 rounded-sm pointer-events-none">
                        <span className="bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 px-2.5 py-1 rounded text-xs font-bold shadow-md flex items-center gap-1 transform scale-95 group-hover:scale-100 transition-transform">
                          <Eye size={14} /> Open Card
                        </span>
                      </div>
                    </div>

                    {/* Multi-item badge */}
                    {isMultiImage && (
                      <div className="mt-2 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 rounded-sm shadow-2xs">
                          <Layers size={12} /> {cert.images.length} Certificate Files
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className={`flex-1 w-full ${index % 2 !== 0 ? 'sm:text-right' : ''}`}>
                    {/* Organization / Collaborator Badge */}
                    <div className={`flex flex-wrap items-center gap-2 mb-1 ${index % 2 !== 0 ? 'sm:justify-end' : ''}`}>
                      <span className="inline-flex items-center gap-1 font-bold text-xs px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border border-blue-300 rounded-sm">
                        <Award size={13} /> {cert.organization}
                      </span>
                      {cert.platform && (
                        <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 rounded-sm">
                          {cert.platform}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setActiveCertModal({ cert, activeImageIndex: 0 })}
                      className="notebook-text text-xl sm:text-2xl font-bold leading-[2rem] hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      <span>{index + 1}. {cert.title}</span>
                    </h3>

                    {/* Role */}
                    {cert.role && (
                      <div className={`notebook-text text-lg leading-[2rem] ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                        <span className="font-bold">Role:</span> {cert.role}
                      </div>
                    )}

                    {/* Recognition / Award */}
                    {cert.recognition && (
                      <div className={`notebook-text text-lg leading-[2rem] text-amber-700 dark:text-amber-300 font-bold flex items-center gap-1.5 ${index % 2 !== 0 ? 'sm:justify-end' : ''}`}>
                        <Star size={18} className="fill-amber-400 text-amber-500 shrink-0" />
                        <span>{cert.recognition}</span>
                      </div>
                    )}

                    {/* Focus */}
                    {cert.focus && (
                      <div className={`notebook-text text-lg leading-[2rem] pl-2 border-l-2 border-yellow-400 my-1 ${index % 2 !== 0 ? 'sm:border-l-0 sm:border-r-2 sm:pr-2 sm:pl-0' : ''} ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        <span className="font-bold text-slate-700 dark:text-slate-300">Focus:</span> {cert.focus}
                      </div>
                    )}

                    {/* Description */}
                    <div className={`notebook-text text-lg leading-[2rem] mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                      {cert.description}
                    </div>

                    {/* Action buttons */}
                    <div className={`mt-3 flex flex-wrap items-center gap-3 ${index % 2 !== 0 ? 'sm:justify-end' : ''}`}>
                      <button
                        onClick={() => setActiveCertModal({ cert, activeImageIndex: 0 })}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 border border-yellow-400 rounded-sm font-bold text-sm shadow-sm transition-all transform hover:-rotate-1 cursor-pointer"
                      >
                        <Eye size={16} />
                        <span>{isMultiImage ? `View All (${cert.images.length}) Certificates` : 'View Certificate'}</span>
                      </button>

                      {/* Quick thumbnails if multi image */}
                      {isMultiImage && (
                        <div className="flex items-center gap-1.5">
                          {cert.images.map((img, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveCertModal({ cert, activeImageIndex: i })}
                              className="text-xs font-bold px-2 py-0.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded cursor-pointer"
                              title={img.caption}
                            >
                              Doc #{i + 1}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Paper UI — Protected by Design License */}
          <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-300 dark:border-slate-700">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">📜</span>
              <h3 className="notebook-text text-xl sm:text-2xl font-bold leading-[2rem]">
                Paper UI — Protected by Design License
              </h3>
            </div>

            {/* Large License Image Card with 4 Authentic Tapes */}
            <div className={`relative group p-4 sm:p-6 rounded-lg border-2 shadow-xl transition-all ${
              isDarkMode 
                ? 'bg-slate-900/95 border-yellow-400/60 text-slate-100 shadow-black/40' 
                : 'bg-[#fffdf2] border-yellow-400 text-stone-900 shadow-amber-900/10'
            }`}>
              {/* Top Left Tape */}
              <div className="absolute -top-3.5 left-6 sm:left-10 w-20 sm:w-24 h-5 sm:h-6 bg-yellow-400/50 -rotate-3 backdrop-blur-sm drop-shadow-sm tape-serrated pointer-events-none z-10" />
              {/* Top Right Tape */}
              <div className="absolute -top-3.5 right-6 sm:right-10 w-20 sm:w-24 h-5 sm:h-6 bg-yellow-400/50 rotate-3 backdrop-blur-sm drop-shadow-sm tape-serrated pointer-events-none z-10" />
              {/* Bottom Left Tape */}
              <div className="absolute -bottom-3 left-8 sm:left-14 w-16 sm:w-20 h-4 sm:h-5 bg-yellow-500/35 rotate-2 backdrop-blur-sm drop-shadow-sm tape-serrated pointer-events-none z-10" />
              {/* Bottom Right Tape */}
              <div className="absolute -bottom-3 right-8 sm:right-14 w-16 sm:w-20 h-4 sm:h-5 bg-yellow-500/35 -rotate-2 backdrop-blur-sm drop-shadow-sm tape-serrated pointer-events-none z-10" />

              <a
                href="/paper ui license.png"
                target="_blank"
                rel="noreferrer"
                className="block relative overflow-hidden rounded-md border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-2 sm:p-4 text-center group/img cursor-pointer shadow-inner"
                title="Click to view full resolution license"
              >
                <img
                  src="/paper ui license.png"
                  alt="Paper UI Design License"
                  className="w-full max-w-4xl h-auto object-contain mx-auto rounded shadow-sm transition-transform duration-300 group-hover/img:scale-[1.01]"
                />
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/80 hover:bg-black text-yellow-300 border border-yellow-400/50 text-xs font-bold rounded flex items-center gap-1.5 shadow-lg backdrop-blur-sm opacity-90 group-hover/img:opacity-100 transition-opacity">
                  <ZoomIn size={15} /> Full Resolution 🔍
                </div>
              </a>

              {/* License Description & Website */}
              <div className="mt-5 px-1 sm:px-2">
                <p className={`text-base sm:text-lg lg:text-xl font-hand leading-relaxed ${
                  isDarkMode ? 'text-slate-100' : 'text-stone-900 font-semibold'
                }`}>
                  Paper UI is a proprietary UI design system created and owned by Rajnikant Gaurav. Its components, layouts, and visual language are protected intellectual property. Use, reproduction, or commercial application requires explicit permission.
                </p>
                <div className="mt-3.5 flex flex-wrap items-center gap-2 text-base sm:text-lg font-hand">
                  <span className={`font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-800'}`}>Official Website:</span>
                  <a
                    href="https://www.rajnikantg.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline decoration-wavy font-bold cursor-pointer inline-flex items-center gap-1.5"
                  >
                    rajnikantg.in <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mb-16 scroll-mt-24 reveal-on-scroll">
          <h2 className="notebook-text text-2xl font-bold mb-2 leading-[2rem]">Contact -</h2>
          <div className="notebook-text text-xl leading-[2rem]">
            <p>Ready to build something awesome? Let's chat.</p>

            <div className="mt-4 space-y-2">
              {contact.email && (
                <div className="flex items-center gap-3">
                  <Mail size={20} className={isDarkMode ? 'text-slate-400' : 'text-slate-600'} />
                  <a href={`mailto:${contact.email}`} className="font-bold hover:text-blue-500 hover:underline decoration-wavy cursor-pointer">
                    {contact.email}
                  </a>
                </div>
              )}

              {contact.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={20} className={isDarkMode ? 'text-slate-400' : 'text-slate-600'} />
                  <a href={`tel:${contact.phone}`} className="font-bold hover:text-blue-500 hover:underline decoration-wavy cursor-pointer">
                    {contact.phone}
                  </a>
                </div>
              )}

              {contact.linkedin && (
                <div className="flex items-center gap-3">
                  <Linkedin size={20} className={isDarkMode ? 'text-slate-400' : 'text-slate-600'} />
                  <a href={contact.linkedin} target="_blank" rel="noreferrer" className="font-bold hover:text-blue-500 hover:underline decoration-wavy cursor-pointer">
                    Linkedin/Rajnikant
                  </a>
                </div>
              )}

              {contact.github && (
                <div className="flex items-center gap-3">
                  <Github size={20} className={isDarkMode ? 'text-slate-400' : 'text-slate-600'} />
                  <a href={contact.github} target="_blank" rel="noreferrer" className="font-bold hover:text-blue-500 hover:underline decoration-wavy cursor-pointer">
                    Github/Rajnikant
                  </a>
                </div>
              )}

              {contact.twitter && (
                <div className="flex items-center gap-3">
                  <Twitter size={20} className={isDarkMode ? 'text-slate-400' : 'text-slate-600'} />
                  <a href={contact.twitter} target="_blank" rel="noreferrer" className="font-bold hover:text-blue-500 hover:underline decoration-wavy cursor-pointer">
                    X/@Papercode_
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="donate-cta" className="mb-8 scroll-mt-24 reveal-on-scroll">
          <h2 className="notebook-text text-2xl font-bold mb-2 leading-[2rem]">Fund Me -</h2>
          <div className="notebook-text text-xl leading-[2rem]">
            <p>If you enjoy my work or free tools, consider funding the next build!</p>
            <div className="h-4"></div>
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={onDonateClick}
                className="flex items-center gap-2 bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-6 py-2 rounded-sm shadow-md border border-yellow-500 transform hover:-rotate-1 transition-all font-bold text-xl cursor-pointer"
              >
                <Pencil size={24} />
                <span>Fund Me</span>
              </button>
              <button
                onClick={onSponsorClick}
                className="flex items-center gap-2 bg-pink-300 hover:bg-pink-400 text-pink-900 px-6 py-2 rounded-sm shadow-md border border-pink-500 transform hover:rotate-1 transition-all font-bold text-xl cursor-pointer"
              >
                <Heart size={24} />
                <span>Sponsor</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ─── BIG CERTIFICATE MODAL CARD ────────────────────────────────────────── */}
      {activeCertModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveCertModal(null)}
        >
          <div
            className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-lg shadow-2xl border-2 sm:border-4 ${
              isDarkMode
                ? 'bg-[#1e293b] border-yellow-400/50 text-slate-100'
                : 'bg-[#fdfbf7] border-slate-700 text-slate-900'
            } overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
            }}
          >
            {/* Top Tape decoration */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 sm:w-36 h-6 bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm opacity-90 tape-serrated z-20" />

            {/* Modal Header */}
            <div className={`flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b ${
              isDarkMode ? 'border-slate-700 bg-slate-800/80' : 'border-slate-200 bg-amber-50/60'
            }`}>
              <div className="flex items-center gap-2 min-w-0">
                <Award className="text-yellow-500 shrink-0" size={24} />
                <div>
                  <h3 className="font-marker text-lg sm:text-2xl font-bold truncate">
                    {activeCertModal.cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-hand text-slate-500 dark:text-slate-400">
                    {activeCertModal.cert.organization} {activeCertModal.cert.platform ? `• ${activeCertModal.cert.platform}` : ''}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveCertModal(null)}
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                className={`p-1.5 sm:p-2 border-[2px] sm:border-[2.5px] transform -rotate-2 hover:rotate-0 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm ${
                  isDarkMode
                    ? 'border-yellow-400 text-yellow-300 hover:bg-slate-800 bg-slate-900/80 shadow-yellow-900/20'
                    : 'border-slate-600 text-slate-700 hover:bg-white bg-white/80 shadow-slate-400/20'
                }`}
                title="Close (Esc)"
                aria-label="Close"
              >
                <X size={20} className="sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Modal Body with Large Image Display */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
              {/* Image Card Display */}
              <div className="relative w-full flex items-center justify-center bg-slate-950/5 dark:bg-slate-950/40 p-2 sm:p-4 rounded border border-slate-200 dark:border-slate-800 shadow-inner">
                {/* Previous Image Button */}
                {activeCertModal.cert.images.length > 1 && (
                  <button
                    onClick={() => {
                      const total = activeCertModal.cert.images.length;
                      setActiveCertModal({
                        ...activeCertModal,
                        activeImageIndex: (activeCertModal.activeImageIndex - 1 + total) % total,
                      });
                    }}
                    className="absolute left-2 sm:left-4 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    title="Previous Certificate"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                {/* Certificate Image */}
                <div className="relative group max-h-[55vh] flex items-center justify-center">
                  <img
                    src={activeCertModal.cert.images[activeCertModal.activeImageIndex].src}
                    alt={activeCertModal.cert.images[activeCertModal.activeImageIndex].caption}
                    className="max-h-[52vh] w-auto max-w-full object-contain rounded shadow-lg border-2 border-white dark:border-slate-700 filter contrast-[1.02]"
                  />
                </div>

                {/* Next Image Button */}
                {activeCertModal.cert.images.length > 1 && (
                  <button
                    onClick={() => {
                      const total = activeCertModal.cert.images.length;
                      setActiveCertModal({
                        ...activeCertModal,
                        activeImageIndex: (activeCertModal.activeImageIndex + 1) % total,
                      });
                    }}
                    className="absolute right-2 sm:right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    title="Next Certificate"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}
              </div>

              {/* Current image caption */}
              <div className="mt-3 text-center">
                <p className="font-marker text-base sm:text-lg text-blue-600 dark:text-blue-400">
                  {activeCertModal.cert.images[activeCertModal.activeImageIndex].caption}
                </p>
                {activeCertModal.cert.images.length > 1 && (
                  <p className="text-xs font-hand text-slate-500 mt-0.5">
                    Document {activeCertModal.activeImageIndex + 1} of {activeCertModal.cert.images.length}
                  </p>
                )}
              </div>

              {/* Thumbnails switcher for multi-image certificates */}
              {activeCertModal.cert.images.length > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
                  {activeCertModal.cert.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveCertModal({ ...activeCertModal, activeImageIndex: idx })}
                      className={`relative rounded p-1 transition-all cursor-pointer ${
                        activeCertModal.activeImageIndex === idx
                          ? 'border-2 border-blue-500 scale-105 shadow-md bg-blue-50 dark:bg-blue-950/40'
                          : 'border border-slate-300 dark:border-slate-700 opacity-65 hover:opacity-100 bg-white dark:bg-slate-800'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <span className="block text-[10px] font-bold text-center mt-0.5 truncate max-w-[70px]">
                        #{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Certificate Details Card */}
              <div className={`w-full mt-4 p-4 sm:p-5 rounded-md border-2 text-left shadow-sm ${
                isDarkMode 
                  ? 'bg-slate-900/95 border-yellow-400/40 text-slate-100' 
                  : 'bg-amber-50 border-amber-300/80 text-slate-900'
              }`}>
                {activeCertModal.cert.role && (
                  <div className="text-base sm:text-lg mb-2 font-hand leading-relaxed">
                    <span className={`font-bold uppercase tracking-wider text-xs px-2 py-0.5 rounded mr-2 ${
                      isDarkMode ? 'bg-blue-900/70 text-blue-200 border border-blue-600/50' : 'bg-blue-100 text-blue-900 border border-blue-300'
                    }`}>
                      Role
                    </span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {activeCertModal.cert.role}
                    </span>
                  </div>
                )}

                {activeCertModal.cert.recognition && (
                  <div className={`text-base sm:text-lg mb-2.5 font-bold font-hand flex items-start gap-2 p-2.5 rounded border ${
                    isDarkMode 
                      ? 'bg-amber-950/60 border-amber-500/50 text-yellow-300' 
                      : 'bg-amber-100/80 border-amber-300 text-amber-900'
                  }`}>
                    <Star size={20} className="fill-yellow-400 text-yellow-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{activeCertModal.cert.recognition}</span>
                  </div>
                )}

                {activeCertModal.cert.focus && (
                  <div className={`text-base sm:text-lg mb-2 font-hand leading-relaxed pl-3 border-l-4 ${
                    isDarkMode ? 'border-yellow-400 text-slate-200' : 'border-yellow-500 text-slate-800'
                  }`}>
                    <span className={`font-bold ${isDarkMode ? 'text-yellow-300' : 'text-slate-900'}`}>Focus: </span>
                    <span>{activeCertModal.cert.focus}</span>
                  </div>
                )}

                <p className={`text-base sm:text-lg mt-2 leading-relaxed font-hand ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-800'
                }`}>
                  {activeCertModal.cert.description}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`flex items-center justify-between px-4 sm:px-6 py-3 border-t ${
              isDarkMode ? 'border-slate-700 bg-slate-800/80' : 'border-slate-200 bg-amber-50/60'
            }`}>
              <a
                href={activeCertModal.cert.images[activeCertModal.activeImageIndex].src}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <ZoomIn size={16} /> Open Full Resolution in New Tab
              </a>

              <button
                onClick={() => setActiveCertModal(null)}
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
                className={`px-4 py-1.5 border-[2px] sm:border-[2.5px] font-marker font-bold text-xs sm:text-sm transform -rotate-1 hover:rotate-0 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm ${
                  isDarkMode
                    ? 'border-yellow-400 text-yellow-300 hover:bg-slate-800 bg-slate-900/90 shadow-yellow-900/20'
                    : 'border-slate-600 text-slate-800 hover:bg-white bg-white/90 shadow-slate-400/20'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
