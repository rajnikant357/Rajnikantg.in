import React from 'react';
import { ArrowLeft, Github, Linkedin, Twitter, Globe, GraduationCap, MapPin, Award } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

interface AboutDetailPageProps {
  isDarkMode: boolean;
  onBack: () => void;
  SectionStar: () => React.ReactNode;
}

export const AboutDetailPage: React.FC<AboutDetailPageProps> = ({
  isDarkMode,
  onBack,
  SectionStar,
}) => {
  const { data } = useAdminData();
  const { about } = data;

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
          <h3 className="notebook-text text-2xl font-bold mb-2 leading-[2rem] text-slate-700 flex items-center gap-2">
            👋 Short Summary
          </h3>
          <div className="notebook-text text-xl leading-[2rem]">
            {about.summary.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </section>

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
