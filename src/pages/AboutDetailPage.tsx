import React from 'react';
import { ArrowLeft, Github, Linkedin, Twitter, Globe, GraduationCap, MapPin, Award } from 'lucide-react';

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
            <p>I am Rajnikant Gaurav, a Computer Science Engineering student (2022–2026) and an aspiring founder.</p>
            <p>I don't just write code; I build products. My passion lies in solving real-world problems through</p>
            <p>scalable technology and intuitive design. I thrive on late-night coding sessions and</p>
            <p>the thrill of shipping something new to the world.</p>
          </div>
        </section>

        {/* Future Goals */}
        <section className="reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold mb-2 leading-[2rem] text-purple-600 flex items-center gap-2">
            🚀 Future Goals
          </h3>
          <div className="notebook-text text-xl leading-[2rem]">
            <p className="font-bold">Building Prometrion.</p>
            <p>My primary goal is to launch and scale <span className="text-purple-600 font-bold">Prometrion</span> into a global hub for developer competitions.</p>
            <p>I envision a future where I am financially independent through my own products, creating value</p>
            <p>for thousands of users. I want to transition from a student builder to a full-time founder.</p>
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
                <li>JavaScript, TypeScript</li>
                <li>React, Next.js, Tailwind CSS</li>
                <li>Node.js, Express, REST APIs</li>
                <li>Python, </li>
                <li>Git, GitHub, Vercel</li>
                <li>GenAI API Integration </li>
              </ul>
            </div>
            <div>
              <h4 className="notebook-text text-xl font-bold underline mb-2 leading-[2rem]">Hobbies</h4>
              <ul className="list-disc pl-5 notebook-text text-xl leading-[2rem]">
                <li>Building side projects</li>
                <li>Exploring Startup Case Studies</li>
                <li>Playing Chess</li>
                <li>Drawing</li>
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
            <a href="https://www.linkedin.com/in/rajnikant-gaurav-5b70112a2/" target="_blank" className="flex items-center gap-2 hover:text-blue-500 font-bold hover:underline decoration-wavy">
              <Linkedin size={20} /> LinkedIn
            </a>
            <span className="text-gray-400">|</span>
            <a href="https://github.com/rajnikant357"  target="_blank" className="flex items-center gap-2 hover:text-blue-500 font-bold hover:underline decoration-wavy">
              <Github size={20} /> GitHub
            </a>
            <span className="text-gray-400">|</span>
            <a href="https://x.com/papercode_" target="_blank" className="flex items-center gap-2 hover:text-blue-500 font-bold hover:underline decoration-wavy">
              <Twitter size={20} /> Twitter
            </a>
            <span className="text-gray-400">|</span>
            <a href="https://prometrion.com" target="_blank" className="flex items-center gap-2 hover:text-blue-500 font-bold hover:underline decoration-wavy">
                Prometrion          
              </a>
          </div>
        </section>

        {/* Education */}
        <section className="reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold mb-4 leading-[2rem] text-red-600 flex items-center gap-2">
            🎓 Educational Background
          </h3>
          <div className="notebook-text text-xl leading-[2rem]">
            <div className="mb-4">
              <p className="font-bold flex items-center gap-2"><GraduationCap size={20}/> B.Tech in Computer Science & Engineering, SHEAT college of engineering and management, Varanasi, UP</p>
              <p className="pl-7 italic">2022 – 2026 (Current)</p>
              <p className="pl-7 text-sm text-slate-500">Focusing on Full Stack Development & Entrepreneurship.</p>
            </div>
            <div className="mb-4">
              <p className="font-bold flex items-center gap-2"><MapPin size={20}/> Higher Secondary (12th Grade), SHRI HARI INTER COLLEGE NANAHUL, BALLIA</p>
              <p className="pl-7 italic">Completed in 2022</p>
              <p className="pl-7 text-sm text-slate-500">Major in Science (PCM).</p>
            </div>
            <div className="mb-4">
              <p className="font-bold flex items-center gap-2"><MapPin size={20}/> High School (10th Grade), GANDHI INTER COLLEGE, SIKANDERPUR, BALLIA</p>
              <p className="pl-7 italic">Completed in 2020</p>
              <p className="pl-7 text-sm text-slate-500">Major in Science.</p>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="reveal-on-scroll">
          <h3 className="notebook-text text-2xl font-bold mb-4 leading-[2rem] text-amber-600 flex items-center gap-2">
            🏆 Achievements
          </h3>
          <ul className="list-none pl-2 notebook-text text-xl leading-[2rem]">
            <li className="flex items-start gap-2 mb-2">
              <Award className="mt-1 text-amber-500 shrink-0" size={20} />
              <span>Web development inter at OASIS INFOBYTE.</span>
            </li>
            <li className="flex items-start gap-2 mb-2">
              <Award className="mt-1 text-amber-500 shrink-0" size={20} />
              <span>Ranked top 5% in college coding contest.</span>
            </li>
            <li className="flex items-start gap-2 mb-2">
              <Award className="mt-1 text-amber-500 shrink-0" size={20} />
              <span>Built, led, and retained a 5-member core team from freshman year through 7th semester, managing responsibilities, execution, and long-term collaboration across multiple projects.</span>
            </li>
          </ul>
        </section>

        {/* Journey */}
        <section className="reveal-on-scroll pb-8">
          <h3 className="notebook-text text-2xl font-bold mb-4 leading-[2rem] text-pink-600 flex items-center gap-2">
            🛣️ My Full Journey
          </h3>
          <div className="border-l-2 border-slate-300 pl-6 ml-2 space-y-8 relative">
            <div className="relative">
              <div className="absolute -left-[31px] top-2 w-4 h-4 bg-slate-400 rounded-full border-2 border-white"></div>
              <h4 className="notebook-text text-xl font-bold leading-[2rem]">The Beginning</h4>
              <p className="notebook-text text-lg leading-[2rem]">
                It started in school when I wrote my first HTML line. The magic of seeing code turn into
                visuals on screen hooked me instantly. I spent my evenings deconstructing websites.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-2 w-4 h-4 bg-slate-400 rounded-full border-2 border-white"></div>
              <h4 className="notebook-text text-xl font-bold leading-[2rem]">College & Exploration</h4>
              <p className="notebook-text text-lg leading-[2rem]">
                Entering college in 2022, I dived deep into C++ and Data Structures. But I realized my true
                calling was building products, not just solving algorithmic puzzles. I picked up React and Node.js.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-2 w-4 h-4 bg-purple-500 rounded-full border-2 border-white animate-pulse"></div>
              <h4 className="notebook-text text-xl font-bold leading-[2rem]">The Prometrion Era (Now)</h4>
              <p className="notebook-text text-lg leading-[2rem]">
                Today, I am channeling all my energy into Prometrion. I am learning about system design,
                user acquisition, and what it takes to run a tech startup. The journey has just begun!
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
