import React from 'react';
import { ExternalLink, Github, Mail, Linkedin, Pencil, Heart, ArrowLeft, QrCode, Coffee, Sparkles, Check, Briefcase, Megaphone, Trophy, Moon, Sun, Star, Globe, Award, GraduationCap, MapPin, Twitter, Phone } from 'lucide-react';
import { projectsData } from '../../data/projects';
import { Project } from '../../types';

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
  SectionStar,
}) => {
  return (
    <>
      <header className="flex flex-col sm:flex-row items-start gap-6 pt-6 px-6 sm:px-12 mb-4 relative reveal-on-scroll">
        <div className="relative shrink-0 sm:-ml-4 z-20 self-start sm:self-auto group cursor-pointer">
          <div className="bg-white p-1.5 shadow-md border border-gray-200 w-25 h-25 rotate-[-2deg] group-hover:rotate-0 transition-transform duration-300">
            <img 
              src="public/R logo 1.jpg" 
              alt="Rajnikant" 
              className="w-20 h-20 object-cover filter sepia-[.2]"
            />
          </div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm tape-serrated" />
        </div>
        <nav className="w-full sm:w-auto mt-8 pl-4 sm:pl-12">
          <ul className={`flex flex-wrap gap-4 sm:gap-8 text-2xl font-bold tracking-wide ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
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
                Donate
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="pl-6 sm:pl-36 pr-4 sm:pr-12 flex-grow">
        
        <section id="home" className="mb-16 pt-2 flex flex-col md:flex-row justify-between items-start gap-8 reveal-on-scroll">
          <div className="flex-1">
            <div className="notebook-text text-2xl sm:text-3xl font-bold uppercase tracking-widest leading-[2rem]">
              NAME = <span className="font-marker text-3xl sm:text-4xl ml-2">RAJNIKANT GAURAV</span>
            </div>
            <div className="h-8"></div>
            <div className="notebook-text text-xl sm:text-2xl leading-[2rem]">
              <p>Senior Frontend Engineer & Creative Developer.</p>
              <p>Turning caffeine into clean code and pixel-perfect UIs.</p>
            </div>
          </div>

          <div className="relative z-20 group cursor-pointer mt-4 md:mt-0 mr-4">
            <a href="/resume.pdf" download className="block relative cursor-pointer">
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
        </section>

        <section id="about" className="mb-16 scroll-mt-24 reveal-on-scroll">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h2 className="notebook-text text-2xl font-bold mb-2 leading-[2rem]">About Me -</h2>
              <div className="notebook-text text-xl leading-[2rem]">
                <p>I build things for the web with a focus on details.</p>
                <p>My toolkit includes React, TypeScript, and GenAI API.</p>
                <p>I love turning complex problems into simple, beautiful</p>
                <p>interfaces that feel natural to use.</p>
                <button 
                  onClick={onAboutClick}
                  className="mt-1 text-blue-600 font-bold hover:underline decoration-wavy transition-all flex items-center gap-2 w-max cursor-pointer"
                >
                  Read my full story &rarr;
                </button>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              {PolaroidImage({
                src: "public/myself.jpg",
                alt: "Coding Setup",
                rotate: "rotate-3",
                caption: "Me"
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="mb-16 scroll-mt-24 reveal-on-scroll">
          <h2 className="notebook-text text-2xl font-bold mb-8 leading-[2rem]">Projects -</h2>
          
          <div className="space-y-6">
            {projectsData.slice(0, 3).map((project, index) => (
              <div key={project.id} className="group flex flex-col sm:flex-row gap-6 items-start">
                <div className="shrink-0" onClick={() => onProjectClick(project)}>
                  {PolaroidImage({
                    src: project.image,
                    alt: project.title,
                    rotate: index % 2 === 0 ? '-rotate-2' : 'rotate-2',
                    caption: project.title,
                    imgHeight: "h-20 sm:h-24"
                  })}
                </div>
                <div className="flex-1">
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
                    <div className="notebook-text text-xl leading-[2rem] pl-6 flex flex-wrap items-center gap-4 mt-1">
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
                  <div className="mt-2 pl-6">
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

        <section id="contact" className="mb-16 scroll-mt-24 reveal-on-scroll">
          <h2 className="notebook-text text-2xl font-bold mb-2 leading-[2rem]">Contact -</h2>
          <div className="notebook-text text-xl leading-[2rem]">
            <p>Ready to build something awesome? Let's chat.</p>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3">
                <Mail size={20} className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}/> 
                <a href="mailto:rajnikantg357@gmail.com" className="font-bold hover:text-blue-500 hover:underline decoration-wavy cursor-pointer">
                  rajnikantg357@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={20} className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}/>
                <a href="tel:+917084202503" className="font-bold hover:text-blue-500 hover:underline decoration-wavy cursor-pointer">
                  +91 7084202503
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Linkedin size={20} className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}/>
                <a href="https://www.linkedin.com/in/rajnikant-gaurav-5b70112a2/" target="_blank" rel="noreferrer" className="font-bold hover:text-blue-500 hover:underline decoration-wavy cursor-pointer">
                  /in/rajnikant-gaurav-5b70112a2
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Github size={20} className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}/>
                <a href="https://github.com/rajnikant357" target="_blank" rel="noreferrer" className="font-bold hover:text-blue-500 hover:underline decoration-wavy cursor-pointer">
                  github.com/rajnikant357
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Twitter size={20} className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}/>
                <a href="https://x.com/papercode_" target="_blank" rel="noreferrer" className="font-bold hover:text-blue-500 hover:underline decoration-wavy cursor-pointer">
                  @papercode_
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="donate-cta" className="mb-8 scroll-mt-24 reveal-on-scroll">
          <h2 className="notebook-text text-2xl font-bold mb-2 leading-[2rem]">Support -</h2>
          <div className="notebook-text text-xl leading-[2rem]">
            <p>If you enjoy my work or free tools, consider supporting me!</p>
            <div className="h-4"></div>
            <div className="flex flex-wrap gap-4 items-center">
              <button 
                onClick={onDonateClick}
                className="flex items-center gap-2 bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-6 py-2 rounded-sm shadow-md border border-yellow-500 transform hover:-rotate-1 transition-all font-bold text-xl cursor-pointer"
              >
                <Pencil size={24} />
                <span>Buy me a Pencil</span>
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
    </>
  );
};
