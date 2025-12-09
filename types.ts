export interface Project {
  id: string;
  title: string;
  tagline: string;
  subTagline: string;
  image: string;
  overview: string;
  problem: string[];
  solution: {
    intro: string;
    features: string[];
    summary: string;
  };
  market: string[];
  vision: string[];
  techStack: string[];
  demoLink?: string;
  repoLink?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}