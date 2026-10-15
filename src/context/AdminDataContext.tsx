import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project } from '../../types';

import { projectsData as defaultProjects } from '../../data/projects';
import { intents as defaultIntents, knowledgeBase as defaultKnowledge } from '../../data/chatData';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GeneralInfo {
  name: string;
  tagline: string;
  subTagline: string;
  resumeLink: string;
  profileImage: string;
  footerText: string;
}

export interface AboutInfo {
  summary: string[];
  futureGoals: string[];
  techStack: string[];
  hobbies: string[];
  achievements: string[];
  journey: { title: string; body: string; isPulse?: boolean }[];
  education: { institution: string; degree: string; period: string; note: string }[];
  networks: { label: string; url: string; icon: string }[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export interface DonateTier {
  id: string;
  name: string;
  price: string;
  emoji: string;
  description: string;
  perks: string[];
}

export interface SponsorTier {
  id: string;
  name: string;
  price: string;
  emoji: string;
  description: string;
  perks: string[];
  highlight?: boolean;
}

export interface AdminIntent {
  name: string;
  description: string;
  type: 'fixed' | 'retrieval';
  topic?: string;
  patterns: string[];
  response?: string;
}

export interface AdminKnowledgeEntry {
  id: string;
  topic: string;
  language: 'en' | 'hi';
  text: string;
}

export interface PortfolioData {
  general: GeneralInfo;
  projects: Project[];
  about: AboutInfo;
  contact: ContactInfo;
  donateTiers: DonateTier[];
  sponsorTiers: SponsorTier[];
  chatIntents: AdminIntent[];
  chatKnowledge: AdminKnowledgeEntry[];
}

// ─── Default Data ─────────────────────────────────────────────────────────────

const defaultGeneral: GeneralInfo = {
  name: 'RAJNIKANT GAURAV',
  tagline: 'Full Stack Developer & Creative Engineer.',
  subTagline: 'Turning caffeine into clean code and pixel-perfect UIs.',
  resumeLink: '/RAJNIKANT_GAURAV_resume.pdf',
  profileImage: '/myself.jpg',
  footerText: 'Built with 💻 & ☕. By Rajnikant Gaurav',
};

const defaultAbout: AboutInfo = {
  summary: [
    'I am Rajnikant Gaurav (born 20 September 2005), an independent software developer, technology enthusiast, AI explorer, open-source contributor, and entrepreneur from Uttar Pradesh, India. My career and development philosophy are centered on one primary principle: learn technology, build with it, and turn ideas into real products.',
    'Born in Dadar, Ballia, Uttar Pradesh, I demonstrated an early curiosity toward computing and software systems. This interest matured into a structured pursuit of computer science, full-stack engineering, practical artificial intelligence applications, and startup entrepreneurship.',
    'I am currently active as an independent engineer and the founder of Prometrion, a software company dedicated to engineering digital products, automation systems, and applied artificial intelligence software.',
  ],
  futureGoals: [
    'Building & Scaling Prometrion.',
    'My primary goal is to launch and scale Prometrion into a global software company and digital solutions powerhouse.',
    'I envision a future where I am financially independent through my own products, creating value',
    'for businesses and thousands of users. I want to transition from a student builder to a full-time founder.',
  ],
  techStack: ['JavaScript, TypeScript', 'React, Next.js, Tailwind CSS', 'Node.js, Express, REST APIs', 'Python,', 'Git, GitHub, Vercel', 'GenAI API Integration'],
  hobbies: ['Building side projects', 'Exploring Startup Case Studies', 'Playing Chess', 'Drawing'],
  achievements: [
    'Web development inter at OASIS INFOBYTE.',
    'Ranked top 5% in college coding contest.',
    'Built, led, and retained a 5-member core team from freshman year through 7th semester.',
  ],
  journey: [
    { title: 'The Beginning (Dadar, Ballia)', body: 'Born in Dadar, Ballia, Uttar Pradesh, I demonstrated an early curiosity toward computing and software systems. The magic of seeing code turn into visuals on screen hooked me instantly, spending evenings deconstructing websites.' },
    { title: 'College & Structured Pursuit', body: 'Entering college in 2022, my interest matured into a structured pursuit of computer science, full-stack engineering, and practical AI applications. I realized my true calling was building real products, not just solving algorithmic puzzles.' },
    { title: 'The Prometrion Era (Now)', body: 'Today, I am active as an independent engineer and the founder of Prometrion — dedicated to engineering digital products, automation systems, and applied artificial intelligence software. Turning ideas into real products is what drives me forward every single day. The journey has just begun!', isPulse: true },
  ],
  education: [
    { institution: 'SHEAT college of engineering and management, Varanasi, UP', degree: 'B.Tech in Computer Science & Engineering', period: '2022 – 2026 (Current)', note: 'Focusing on Full Stack Development & Entrepreneurship.' },
    { institution: 'SHRI HARI INTER COLLEGE NANAHUL, BALLIA', degree: 'Higher Secondary (12th Grade)', period: 'Completed in 2022', note: 'Major in Science (PCM).' },
    { institution: 'GANDHI INTER COLLEGE, SIKANDERPUR, BALLIA', degree: 'High School (10th Grade)', period: 'Completed in 2020', note: 'Major in Science.' },
  ],
  networks: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/rajnikant-gaurav-5b70112a2/', icon: 'Linkedin' },
    { label: 'GitHub', url: 'https://github.com/rajnikant357', icon: 'Github' },
    { label: 'Twitter', url: 'https://x.com/papercode_', icon: 'Twitter' },
    { label: 'Prometrion', url: 'https://prometrion.com', icon: 'Globe' },
  ],
};

const defaultContact: ContactInfo = {
  email: 'rajnikantg357@gmail.com',
  phone: '+91 7084202503',
  linkedin: 'https://www.linkedin.com/in/rajnikant-gaurav-5b70112a2/',
  github: 'https://github.com/rajnikant357',
  twitter: 'https://x.com/papercode_',
};

const defaultDonateTiers: DonateTier[] = [
  { id: 'pencil', name: 'Buy me a Pencil', price: '₹150', emoji: '✏️', description: 'A kind gesture to keep the ideas flowing.', perks: ['Warm fuzzy feeling', 'My sincere thanks'] },
  { id: 'coffee', name: 'Buy me a Coffee', price: '₹500', emoji: '☕', description: 'Fuel the next late-night coding session.', perks: ['A shoutout on social media', 'Warm fuzzy feeling'] },
  { id: 'meal', name: 'Buy me a Meal', price: '₹1500', emoji: '🍱', description: 'Support a full day of building.', perks: ['Your name in the README', 'Social media shoutout', 'Warm fuzzy feeling'] },
];

const defaultSponsorTiers: SponsorTier[] = [
  { id: 'supporter', name: 'Supporter', price: '₹999/mo', emoji: '⭐', description: 'Show up as a supporter.', perks: ['Small logo on portfolio', 'Monthly thank-you note'] },
  { id: 'partner', name: 'Partner', price: '₹4,999/mo', emoji: '🤝', description: 'Featured partner placement.', perks: ['Featured logo + link on homepage', 'Quarterly strategy call', 'Priority feedback on projects'], highlight: true },
  { id: 'founding', name: 'Founding Sponsor', price: '₹19,999', emoji: '🏆', description: 'Permanently back the journey.', perks: ['Permanent "Founding Sponsor" badge', 'Logo on every page', 'Direct line to Rajnikant', 'Equity discussion welcome'] },
];

// ─── Storage Key ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'paperfolio_admin_data';

function loadFromStorage(): Partial<PortfolioData> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {};
}

function saveToStorage(data: PortfolioData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AdminDataContextValue {
  data: PortfolioData;
  updateGeneral: (v: GeneralInfo) => void;
  updateProjects: (v: Project[]) => void;
  updateAbout: (v: AboutInfo) => void;
  updateContact: (v: ContactInfo) => void;
  updateDonateTiers: (v: DonateTier[]) => void;
  updateSponsorTiers: (v: SponsorTier[]) => void;
  updateChatIntents: (v: AdminIntent[]) => void;
  updateChatKnowledge: (v: AdminKnowledgeEntry[]) => void;
  resetSection: (section: keyof PortfolioData) => void;
  resetAll: () => void;
  exportJSON: () => void;
  isDirty: boolean;
}

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const stored = loadFromStorage();
  const storedGeneral =
    stored.general?.profileImage === '/R%20logo%201.jpg'
      ? { ...stored.general, profileImage: defaultGeneral.profileImage }
      : stored.general;

  const storedDonateTiers = (() => {
    if (!stored.donateTiers || !Array.isArray(stored.donateTiers) || stored.donateTiers.length === 0) {
      return defaultDonateTiers;
    }
    const needsMigration = stored.donateTiers.some(
      t => (t.id === 'pencil' && t.price !== '₹150') ||
           (t.id === 'coffee' && t.price !== '₹500') ||
           (t.id === 'meal' && t.price !== '₹1500') ||
           (t.id === 'sponsor-day')
    );
    if (needsMigration) {
      return defaultDonateTiers;
    }
    return stored.donateTiers;
  })();

  const storedProjects = (() => {
    if (!stored.projects || !Array.isArray(stored.projects) || stored.projects.length === 0) {
      return defaultProjects;
    }
    const cleanStoredProjects = stored.projects.filter(p => {
      const search = `${p.id} ${p.title} ${p.tagline} ${p.overview}`.toLowerCase();
      return !search.includes('gemini vision') && !search.includes('gemini-vision') && !search.includes('gemini ai');
    });
    const storedMap = new Map(cleanStoredProjects.map(p => [p.id, p]));
    const mergedDefaults = defaultProjects.map(defaultProj => {
      const storedProj = storedMap.get(defaultProj.id);
      if (!storedProj) return defaultProj;
      if (defaultProj.id === 'prometrion') {
        const isOldHackathon = `${storedProj.tagline} ${storedProj.overview} ${storedProj.subTagline}`.toLowerCase().includes('hackathon') ||
          `${storedProj.tagline} ${storedProj.overview}`.toLowerCase().includes('competition platform') ||
          `${storedProj.tagline} ${storedProj.overview}`.toLowerCase().includes('coding contests');
        if (isOldHackathon) {
          return {
            ...defaultProj,
            image: defaultProj.image || storedProj.image,
          };
        }
      }
      return {
        ...defaultProj,
        ...storedProj,
        image: defaultProj.image || storedProj.image,
      };
    });
    const defaultIds = new Set(defaultProjects.map(p => p.id));
    const customProjects = cleanStoredProjects.filter(p => !defaultIds.has(p.id));
    return [...mergedDefaults, ...customProjects];
  })();

  const storedAbout = (() => {
    if (!stored.about) return defaultAbout;
    const aboutStr = JSON.stringify(stored.about);
    const isOldData = aboutStr.includes('developer competitions') ||
      !aboutStr.includes('Dadar') ||
      !aboutStr.includes('20 September 2005');
    if (isOldData) {
      return {
        ...stored.about,
        summary: defaultAbout.summary,
        futureGoals: defaultAbout.futureGoals,
        journey: defaultAbout.journey,
      };
    }
    return stored.about;
  })();

  const storedChatKnowledge = (() => {
    if (!stored.chatKnowledge || !Array.isArray(stored.chatKnowledge)) return defaultKnowledge as AdminKnowledgeEntry[];
    return stored.chatKnowledge.map(item => {
      if (
        item.text.includes('Gemini Vision') ||
        item.text.includes('Gemini AI') ||
        (item.topic === 'prometrion_intro' && (item.text.includes('hackathon') || item.text.includes('competition') || item.text.includes('कॉम्पीटिशन'))) ||
        (item.id.startsWith('about_me') && (!item.text.includes('Dadar') || !item.text.includes('20 September 2005') || item.text.includes('hackathon') || item.text.includes('कॉम्पीटिशन'))) ||
        (item.id.startsWith('projects_overview') && (item.text.includes('developer competition') || item.text.includes('कॉम्पीटिशन'))) ||
        (item.id.startsWith('founder_mindset') && (item.text.includes('developer competitions') || item.text.includes('developer competition')))
      ) {
        const matchingDefault = (defaultKnowledge as AdminKnowledgeEntry[]).find(dk => dk.id === item.id);
        if (matchingDefault) return matchingDefault;
      }
      return item;
    });
  })();

  const [data, setData] = useState<PortfolioData>({
    general: storedGeneral ?? defaultGeneral,
    projects: storedProjects,
    about: storedAbout,
    contact: stored.contact ?? defaultContact,
    donateTiers: storedDonateTiers,
    sponsorTiers: stored.sponsorTiers ?? defaultSponsorTiers,
    chatIntents: stored.chatIntents ?? (defaultIntents as AdminIntent[]),
    chatKnowledge: storedChatKnowledge,
  });

  const [isDirty, setIsDirty] = useState(false);

  const update = useCallback(<K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => {
    setData(prev => {
      const next = { ...prev, [key]: value };
      saveToStorage(next);
      return next;
    });
    setIsDirty(true);
  }, []);

  const updateGeneral = useCallback((v: GeneralInfo) => update('general', v), [update]);
  const updateProjects = useCallback((v: Project[]) => update('projects', v), [update]);
  const updateAbout = useCallback((v: AboutInfo) => update('about', v), [update]);
  const updateContact = useCallback((v: ContactInfo) => update('contact', v), [update]);
  const updateDonateTiers = useCallback((v: DonateTier[]) => update('donateTiers', v), [update]);
  const updateSponsorTiers = useCallback((v: SponsorTier[]) => update('sponsorTiers', v), [update]);
  const updateChatIntents = useCallback((v: AdminIntent[]) => update('chatIntents', v), [update]);
  const updateChatKnowledge = useCallback((v: AdminKnowledgeEntry[]) => update('chatKnowledge', v), [update]);

  const defaultData: PortfolioData = {
    general: defaultGeneral,
    projects: defaultProjects,
    about: defaultAbout,
    contact: defaultContact,
    donateTiers: defaultDonateTiers,
    sponsorTiers: defaultSponsorTiers,
    chatIntents: defaultIntents as AdminIntent[],
    chatKnowledge: defaultKnowledge as AdminKnowledgeEntry[],
  };

  const resetSection = useCallback((section: keyof PortfolioData) => {
    setData(prev => {
      const next = { ...prev, [section]: defaultData[section] };
      saveToStorage(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
    setIsDirty(false);
  }, []);

  const exportJSON = useCallback(() => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paperfolio-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  return (
    <AdminDataContext.Provider value={{
      data, isDirty,
      updateGeneral, updateProjects, updateAbout, updateContact,
      updateDonateTiers, updateSponsorTiers, updateChatIntents, updateChatKnowledge,
      resetSection, resetAll, exportJSON,
    }}>
      {children}
    </AdminDataContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAdminData = (): AdminDataContextValue => {
  const ctx = useContext(AdminDataContext);
  if (!ctx) throw new Error('useAdminData must be used within AdminDataProvider');
  return ctx;
};

// ─── Export defaults for use outside admin ────────────────────────────────────
export { defaultGeneral, defaultAbout, defaultContact, defaultDonateTiers, defaultSponsorTiers };
