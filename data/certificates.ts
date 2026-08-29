export interface CertificateImage {
  src: string;
  caption: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  organization: string;
  platform?: string;
  role?: string;
  recognition?: string;
  focus?: string;
  description: string;
  images: CertificateImage[];
}

export const certificatesData: CertificateItem[] = [
  // 1. Google Coursera AI Series
  {
    id: 'google-ai-research',
    title: 'AI for Research and Insights',
    organization: 'Google',
    platform: 'Coursera',
    focus: 'Prompt engineering for market research, data analysis, and insight extraction.',
    description: 'Demonstrates proficiency in using generative AI models to accelerate research workflows, analyze qualitative and quantitative datasets, and synthesize actionable findings.',
    images: [
      {
        src: '/certificates/Google%20certificate%20AI%20for%20Research%20and%20Insights_page-0001.jpg',
        caption: 'AI for Research and Insights — Google (Coursera)'
      }
    ]
  },
  {
    id: 'google-ai-writing',
    title: 'AI for Writing and Communicating',
    organization: 'Google',
    platform: 'Coursera',
    focus: 'AI-powered professional communication, copy drafting, and messaging.',
    description: 'Validates skills in utilizing AI tools to streamline technical documentation, professional correspondence, and structured long-form written communication.',
    images: [
      {
        src: '/certificates/Google%20certificate%20AI%20for%20Writing%20and%20Communicating_page-0001.jpg',
        caption: 'AI for Writing and Communicating — Google (Coursera)'
      }
    ]
  },
  {
    id: 'google-ai-app-building',
    title: 'AI for App Building',
    organization: 'Google',
    platform: 'Coursera',
    focus: 'AI integration, application workflows, and rapid prototyping.',
    description: 'Covers the fundamentals of embedding intelligent features and AI-assisted workflows into software applications to enhance functionality and user experience.',
    images: [
      {
        src: '/certificates/Google%20certificate%20AI%20for%20App%20Building_page-0001.jpg',
        caption: 'AI for App Building — Google (Coursera)'
      }
    ]
  },
  {
    id: 'google-ai-planning',
    title: 'AI for Brainstorming and Planning',
    organization: 'Google',
    platform: 'Coursera',
    focus: 'Ideation frameworks, project roadmap design, and strategy generation.',
    description: 'Highlights expertise in leveraging AI tools for product ideation, structured problem-solving, and building comprehensive project roadmaps.',
    images: [
      {
        src: '/certificates/Google%20certificate%20AI%20for%20Brainstorming%20and%20Planning_page-0001.jpg',
        caption: 'AI for Brainstorming and Planning — Google (Coursera)'
      }
    ]
  },
  {
    id: 'google-ai-content',
    title: 'AI for Content Creation',
    organization: 'Google',
    platform: 'Coursera',
    focus: 'Generative media, digital asset generation, and creative direction.',
    description: 'Focuses on leveraging modern generative AI tools to design visual and digital content assets efficiently across multiple creative mediums.',
    images: [
      {
        src: '/certificates/Google%20certificate%20AI%20for%20Content%20Creation_page-0001.jpg',
        caption: 'AI for Content Creation — Google (Coursera)'
      }
    ]
  },
  // 2. Oasis Infobyte (AICTE) Grouped
  {
    id: 'oasis-infobyte-internship',
    title: 'Star Performer & Internship Completion',
    organization: 'Oasis Infobyte (AICTE)',
    role: 'Web Development and Designing Intern',
    recognition: 'Awarded Star Performer and received a formal Letter of Recommendation for outstanding technical execution, dedication, and project delivery.',
    description: 'Built responsive, interactive web interfaces and UI designs, demonstrating strong front-end development, problem-solving, and cross-functional collaboration skills.',
    images: [
      {
        src: '/certificates/Rajnikant%20Gaurav%20Certificate%20(1)_page-0001%20oasis%20infobyte.jpg',
        caption: 'Internship Completion Certificate'
      },
      {
        src: '/certificates/Rajnikant%20Gaurav%20Appreciation%20Certificate%20(1)_page-0001%20oasis%20infobyte.jpg',
        caption: 'Star Performer Appreciation Certificate'
      },
      {
        src: '/certificates/Rajnikant%20Gaurav%20Letter%20of%20Recommendation_page-0001%20oasis%20infobyte.jpg',
        caption: 'Official Letter of Recommendation'
      }
    ]
  },
  // 3. Acmegrade (in collaboration with Mood Indigo, IIT Bombay) Grouped
  {
    id: 'acmegrade-ai-training',
    title: 'Artificial Intelligence Training & Internship',
    organization: 'Acmegrade (in collaboration with Mood Indigo, IIT Bombay)',
    role: 'AI Trainee & Intern',
    description: 'Completed specialized foundational training and practical internship assignments in Artificial Intelligence, focusing on core machine learning concepts and practical technical implementation.',
    images: [
      {
        src: '/certificates/Rajnikant%20Gaurav_Training%20completion%20acmegrade.jpg',
        caption: 'AI Training Completion Certificate'
      },
      {
        src: '/certificates/Rajnikant%20Gaurav_Internship%20completion%20acmegrade.jpg',
        caption: 'AI Internship Completion Certificate'
      }
    ]
  }
];
