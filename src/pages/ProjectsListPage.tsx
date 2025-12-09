import React from 'react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { projectsData } from '../../data/projects';
import { Project } from '../../types';

interface ProjectsListPageProps {
  isDarkMode: boolean;
  onBack: () => void;
  onProjectClick: (project: Project) => void;
  PolaroidImage: (props: any) => React.ReactNode;
  SectionStar: () => React.ReactNode;
}

export const ProjectsListPage: React.FC<ProjectsListPageProps> = ({
  isDarkMode,
  onBack,
  onProjectClick,
  PolaroidImage,
  SectionStar,
}) => {
  return (
    <main className="pl-6 sm:pl-36 pr-4 sm:pr-12 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-grow">
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
          All Projects
        </h1>
        <div className="notebook-text text-xl leading-[2rem] max-w-2xl reveal-on-scroll">
          <p>A collection of my work, experiments, and startup attempts.</p>
          <p>From full-stack platforms to small fun utilities.</p>
        </div>
      </div>

      <div className="space-y-12">
        {projectsData.map((project, index) => (
          <div key={project.id} className="reveal-on-scroll">
            <div className="flex flex-col md:flex-row gap-8 items-start border-b border-slate-200 pb-8 mb-4">
              <div className="shrink-0 cursor-pointer" onClick={() => onProjectClick(project)}>
                {PolaroidImage({
                  src: project.image,
                  alt: project.title,
                  rotate: index % 2 === 0 ? '-rotate-1' : 'rotate-1',
                  caption: project.title,
                  imgHeight: "h-32 sm:h-40"
                })}
              </div>
              <div className="flex-1 w-full">
                <h3 
                  className="notebook-text text-3xl font-bold leading-[2rem] hover:text-blue-600 cursor-pointer transition-colors"
                  onClick={() => onProjectClick(project)}
                >
                  {project.title}
                </h3>
                <p className="notebook-text text-xl font-bold leading-[2rem] text-slate-700 mb-2">
                  {project.tagline}
                </p>
                
                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map(tech => (
                    <span key={tech} className={`px-2 py-0.5 rounded-sm text-sm font-bold border ${isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-600'}`}>
                      {tech}
                    </span>
                  ))}
                </div>

                <p className={`notebook-text text-xl leading-[2rem] mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {project.subTagline}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button 
                    onClick={() => onProjectClick(project)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-1 rounded border border-blue-300 font-bold transition-colors cursor-pointer shadow-sm"
                  >
                    View Details
                  </button>
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-1 rounded border border-yellow-300 font-bold transition-colors cursor-pointer shadow-sm"
                    >
                      Live Demo <ExternalLink size={16} />
                    </a>
                  )}
                  {project.repoLink && (
                    <a 
                      href={project.repoLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-1 rounded border border-gray-300 font-bold transition-colors cursor-pointer shadow-sm"
                    >
                      Code <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
