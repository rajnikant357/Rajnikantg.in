import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Project } from '../../types';

interface ProjectDetailPageProps {
  isDarkMode: boolean;
  currentProject: Project;
  onBack: () => void;
  PolaroidImage: (props: any) => React.ReactNode;
  SectionStar: () => React.ReactNode;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  isDarkMode,
  currentProject,
  onBack,
  PolaroidImage,
  SectionStar,
}) => {
  return (
    <main className="pl-6 sm:pl-36 pr-4 sm:pr-12 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-grow">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className={`group flex items-center gap-2 text-xl font-bold hover:text-blue-500 transition-colors mb-6 cursor-pointer ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Projects</span>
      </button>

      {/* Project Title Area with Star on Margin */}
      <div className="relative mb-8 reveal-on-scroll">
        {SectionStar()}
        <h1 className="notebook-text text-4xl sm:text-5xl font-marker text-blue-600 leading-[3rem] sm:leading-[4rem] mb-2">
          {currentProject.title}
        </h1>
        <div className="notebook-text text-2xl font-bold leading-[2rem] text-slate-700">
          Tag line - {currentProject.tagline}
        </div>
        <div className="notebook-text text-xl leading-[2rem] text-slate-500 italic">
          Sub tag line - {currentProject.subTagline}
        </div>
      </div>

      {/* Full Width Taped Screenshot */}
      <div className="relative w-full max-w-4xl mx-auto mb-12 rotate-1 hover:rotate-0 transition-transform duration-500 reveal-on-scroll">
        <div className="bg-white p-3 shadow-lg border border-gray-200">
          <img 
            src={currentProject.image} 
            alt={currentProject.title} 
            className="w-full h-auto max-h-[400px] object-cover border border-gray-100 filter contrast-[1.05]" 
          />
        </div>
        {/* Tape Corners */}
        <div className="absolute -top-4 -left-4 w-24 h-8 bg-amber-900/20 rotate-[-45deg] backdrop-blur-sm drop-shadow-sm tape-serrated" />
        <div className="absolute -top-4 -right-4 w-24 h-8 bg-amber-900/20 rotate-[45deg] backdrop-blur-sm drop-shadow-sm tape-serrated" />
        <div className="absolute -bottom-4 -left-4 w-24 h-8 bg-amber-900/20 rotate-[45deg] backdrop-blur-sm drop-shadow-sm tape-serrated" />
        <div className="absolute -bottom-4 -right-4 w-24 h-8 bg-amber-900/20 rotate-[-45deg] backdrop-blur-sm drop-shadow-sm tape-serrated" />
      </div>

      {/* Content Sections */}
      <div className="space-y-8 max-w-3xl">
        
        {/* Overview */}
        <section className="reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold flex items-center gap-2 leading-[2rem]">
            🚀 Platform Overview
          </h3>
          <p className="notebook-text text-xl leading-[2rem] whitespace-pre-wrap">
            {currentProject.overview}
          </p>
        </section>

        {/* Problem */}
        <section className="reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold flex items-center gap-2 leading-[2rem] text-red-600">
            🎯 Problem
          </h3>
          <ul className="list-none pl-4">
            {currentProject.problem.map((item, i) => (
              <li key={i} className="notebook-text text-xl leading-[2rem] flex items-start gap-2">
                <span className="mt-2 w-1.5 h-1.5 bg-red-400 rounded-full shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Solution */}
        <section className="reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold flex items-center gap-2 leading-[2rem] text-green-600">
            💡 {currentProject.title}'s Solution
          </h3>
          <div className="notebook-text text-xl leading-[2rem]">
            <p className="font-bold">{currentProject.solution.intro}</p>
            <p className="font-semibold underline mt-2 mb-1">Core Features</p>
            <ul className="list-none pl-4 mb-4">
              {currentProject.solution.features.map((item, i) => (
                <li key={i} className="notebook-text text-xl leading-[2rem] flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 bg-green-400 rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-marker text-xl text-green-700">{currentProject.solution.summary}</p>
          </div>
        </section>

        {/* Market */}
        <section className="reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold flex items-center gap-2 leading-[2rem] text-blue-600">
            📈 Market & Opportunity
          </h3>
          <ul className="list-none pl-4">
            {currentProject.market.map((item, i) => (
              <li key={i} className="notebook-text text-xl leading-[2rem] flex items-start gap-2">
                <span className="mt-2 w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Vision */}
        <section className="bg-yellow-50/50 p-4 -mx-4 rounded-sm border-l-4 border-yellow-400 reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold flex items-center gap-2 leading-[2rem] text-yellow-700">
            🌟 Vision
          </h3>
          <div className="notebook-text text-xl leading-[2rem]">
            {currentProject.vision.map((item, i) => (
              <p key={i} className="mb-2">{item}</p>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
