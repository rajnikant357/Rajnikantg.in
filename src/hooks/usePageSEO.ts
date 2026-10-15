import { useEffect } from 'react';
import { Project } from '../../types';

interface PageSEOProps {
  view: string;
  currentProject?: Project | null;
}

export function usePageSEO({ view, currentProject }: PageSEOProps) {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    let title = 'Rajnikant Gaurav — Portfolio | Independent Engineer & Founder';
    let description = "Welcome to the official portfolio of Rajnikant Gaurav — independent software developer, AI explorer, founder of Prometrion, and creator of the world's only Paper UI design system.";
    let path = '/';
    let image = 'https://rajnikantg.in/R%20log-2%20banner.jpg';
    let type = 'website';

    switch (view) {
      case 'about-detail':
        title = 'About Rajnikant Gaurav | Story, Journey & Philosophy';
        description = 'Born in Dadar, Ballia, UP. Founder of Prometrion, full-stack engineer, AI explorer, and creator of Paper UI. Discover my story, journey, and milestones.';
        path = '/about';
        image = 'https://rajnikantg.in/professional%20me.png';
        type = 'profile';
        break;

      case 'projects-list':
        title = 'Projects & Applications | Rajnikant Gaurav';
        description = 'Explore 16+ production applications, SaaS platforms, and digital products engineered by Rajnikant Gaurav, including Prometrion, Sharpr, and Ultron.';
        path = '/projects';
        image = 'https://rajnikantg.in/paper%20ui%20license.png';
        type = 'website';
        break;

      case 'project-detail':
        if (currentProject) {
          title = `${currentProject.title} — Rajnikant Gaurav Projects`;
          description = currentProject.tagline || currentProject.overview || 'Explore details, live demo, and tech stack for this project by Rajnikant Gaurav.';
          path = '/projects';
          image = currentProject.image?.startsWith('http')
            ? currentProject.image
            : `https://rajnikantg.in${currentProject.image || '/R%20logo%201.jpg'}`;
          type = 'article';
        }
        break;

      case 'donate':
        title = 'Fund My Work | Rajnikant Gaurav';
        description = 'Support independent software engineering, open-source work, and product building. Buy a pencil, coffee, or meal for Rajnikant.';
        path = '/donate';
        image = 'https://rajnikantg.in/R%20logo%201.jpg';
        type = 'website';
        break;

      case 'sponsor':
        title = 'Sponsorship & Partnerships | Rajnikant Gaurav & Prometrion';
        description = 'Partner with Rajnikant Gaurav. Explore sponsorship tiers, brand alignment, quarterly strategy access, and product collaborations.';
        path = '/sponsor';
        image = 'https://rajnikantg.in/R%20logo%201.jpg';
        type = 'website';
        break;

      case 'admin':
        title = 'Admin Panel | Paperfolio';
        description = 'Admin configuration panel for Paperfolio.';
        path = '/admin';
        break;

      default:
        title = 'Rajnikant Gaurav — Portfolio | Independent Engineer & Founder';
        description = "Welcome to the official portfolio of Rajnikant Gaurav — independent software developer, AI explorer, founder of Prometrion, and creator of the world's only Paper UI design system.";
        path = '/';
        image = 'https://rajnikantg.in/R%20log-2%20banner.jpg';
        type = 'website';
        break;
    }

    const fullUrl = `https://rajnikantg.in${path}`;

    // 1. Update Title
    document.title = title;

    // 2. Update Canonical Link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', fullUrl);

    // 3. Helper to update or create Meta Tag
    const updateMeta = (nameOrProp: 'name' | 'property', attr: string, val: string) => {
      let el = document.querySelector(`meta[${nameOrProp}="${attr}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameOrProp, attr);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    updateMeta('name', 'description', description);

    // OpenGraph
    updateMeta('property', 'og:title', title);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:url', fullUrl);
    updateMeta('property', 'og:image', image);
    updateMeta('property', 'og:type', type);

    // Twitter Card
    updateMeta('name', 'twitter:title', title);
    updateMeta('name', 'twitter:description', description);
    updateMeta('name', 'twitter:url', fullUrl);
    updateMeta('name', 'twitter:image', image);
  }, [view, currentProject]);
}
export default usePageSEO;
