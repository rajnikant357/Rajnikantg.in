
export interface Intent {
  name: string;
  description: string;
  type: 'fixed' | 'retrieval';
  topic?: string;
  patterns: string[];
  response?: string;
}

export interface KnowledgeEntry {
  id: string;
  topic: string;
  language: 'en' | 'hi';
  text: string;
}

export const intents: Intent[] = [
  // 1. Greetings / Small talk
  {
    name: "GREETING",
    description: "Basic greetings",
    type: "fixed",
    patterns: [
      "hi", "hello", "hey", "hey there", "namaste", "namaskar",
      "hii rajnikant", "hello bro", "kya haal hai", "how are you",
      "how r u", "kaise ho", "kem cho", "paper pots", "good morning", "good evening",
      "hey paper pots", "hello assistant", "paper pots ho", "tumhara name kya hai",
      "are you paper pots", "start"
    ],
    response:
      "Hi! I'm Paper Pots 🪴 — Rajnikant's personal AI assistant. Ask me about:\n• His projects & startups\n• Paper UI design system\n• Skills & tech stack\n• Contact info\n\nनमस्ते! मैं Paper Pots हूँ। पूछें: प्रोजेक्ट्स, Paper UI, स्किल्स या कॉन्टैक्ट!"
  },

  {
    name: "HOW_ARE_YOU",
    description: "Respond to 'how are you'",
    type: "fixed",
    patterns: [
      "how are you", "how is he", "kya haal", "kaise ho",
      "kaisi chal rhi hai", "sab kaisa chal raha hai", "what's up", "wassup",
      "doing good", "how is rajnikant"
    ],
    response:
      "He's doing great — building Prometrion and shipping more projects! 🚀\n\nवो बढ़िया हैं, Prometrion बना रहे हैं और नए प्रोजेक्ट्स शिप कर रहे हैं!"
  },

  // 2. About
  {
    name: "ABOUT_ME",
    description: "Who are you / about you",
    type: "retrieval",
    topic: "about_me",
    patterns: [
      "who are you", "tell me about yourself", "about you", "about u",
      "tum kaun ho", "aap kaun ho", "who is rajnikant", "who is he",
      "tell me about rajnikant", "about rajnikant", "profile", "bio", "introduction",
      "tell me about him", "can you introduce rajnikant", "can you introduce him",
      "who built this website", "rajnikant kaun hai", "thoda introduction de do",
      "is portfolio ke owner kaun hain", "owner of this website"
    ]
  },

  // 3. Skills / Tech Stack
  {
    name: "SKILLS",
    description: "Skills and tech stack",
    type: "retrieval",
    topic: "skills",
    patterns: [
      "what are your skills", "your skills", "his skills", "skills batao",
      "what tech stack do you use", "tech stack", "which languages you know",
      "kon kon si language aati hai", "programming skills", "coding stack",
      "skills", "technology", "technologies", "know", "coding",
      "what are rajnikants skills", "what tech stack does he use",
      "which programming languages does he know", "is he a frontend or backend developer",
      "does he know react or nodejs", "uski skills kya hain",
      "kaun si programming languages aati hain", "web development aata hai kya"
    ]
  },

  // 4. Education
  {
    name: "EDUCATION",
    description: "College, branch, year",
    type: "fixed",
    patterns: [
      "which college", "what college", "where do you study", "where does he study",
      "where are you studying", "college details", "education",
      "qualification", "which year are you in", "kaun se year me ho",
      "kaun se college me ho", "degree", "btech", "university", "study",
      "what is his educational background", "which college does he study in",
      "is he currently a student", "college kaunsa hai", "abhi padh raha hai ya pass out",
      "which year is he in"
    ],
    response:
      "He's a B.Tech Computer Science student (2022–26), balancing academics with building real startups like Prometrion.\n\nवो B.Tech कंप्यूटर साइंस स्टूडेंट (2022–26) हैं, जो पढ़ाई के साथ Prometrion जैसे स्टार्टअप्स भी बना रहे हैं।"
  },

  // 5. Projects overview
  {
    name: "PROJECTS_OVERVIEW",
    description: "General projects question",
    type: "retrieval",
    topic: "projects_overview",
    patterns: [
      "what projects have you done", "your projects", "his projects",
      "show me your projects", "projects batao", "kya kya banaya hai",
      "portfolio projects", "side projects", "konsi website banayi hai",
      "projects", "works", "creations", "what projects has rajnikant worked on",
      "can you show me his projects", "what kind of projects does he build",
      "any interesting or startup level projects", "portfolio projects ka overview do",
      "koi real world project banaya hai", "any interesting projects",
      "list all projects", "show all projects", "all projects"
    ]
  },

  // 6. Individual project: Prometrion
  {
    name: "PROMETRION_INTRO",
    description: "What is Prometrion",
    type: "retrieval",
    topic: "prometrion_intro",
    patterns: [
      "what is prometrion", "tell me about prometrion", "prometrion kya hai",
      "prometrion ke baare me batao", "your startup", "his startup", "your company", "his company",
      "software company", "digital services", "prometrion services", "what does prometrion do",
      "prometrion", "why did rajnikant start prometrion", "what problem does prometrion solve",
      "how is prometrion different from other platforms", "prometrion ka idea kaise aaya",
      "ye platform kis cheez ke liye hai", "prometrion vision", "difference between prometrion and other platforms",
      "prometrion.com"
    ]
  },

  // 7. Individual project: Paperfolio
  {
    name: "PAPERFOLIO",
    description: "About this portfolio website",
    type: "retrieval",
    topic: "paperfolio",
    patterns: [
      "what is paperfolio", "tell me about paperfolio", "this website", "this portfolio",
      "rajnikantg.in", "how did you build this", "how is this portfolio built",
      "notebook portfolio", "paper portfolio", "portfolio kaise banaya",
      "paperfolio kya hai", "this site", "your website", "his website"
    ]
  },

  // 8. Paper UI Design System
  {
    name: "PAPER_UI",
    description: "What is Paper UI",
    type: "retrieval",
    topic: "paper_ui",
    patterns: [
      "what is paper ui", "paper ui kya hai", "tell me about paper ui",
      "paper ui design system", "notebook design", "paper design system",
      "worlds only paper ui", "mit licensed paper ui", "paper ui platform",
      "paper ui skill", "paperskills", "paperskills.sh", "design system",
      "notebook ui", "handwritten ui", "how does this design work",
      "paper ui components", "who created paper ui", "paper ui creator"
    ]
  },

  // 9. Sharpr project
  {
    name: "SHARPR",
    description: "About Sharpr project",
    type: "retrieval",
    topic: "sharpr",
    patterns: [
      "sharpr", "sharpr.in", "what is sharpr", "tell me about sharpr", "sharpr kya hai"
    ]
  },

  // 10. Ultron project
  {
    name: "ULTRON",
    description: "About Ultron project",
    type: "retrieval",
    topic: "ultron",
    patterns: [
      "ultron", "what is ultron", "tell me about ultron", "ultron project"
    ]
  },

  // 11. LocalLink project
  {
    name: "LOCALLINK",
    description: "About LocalLink project",
    type: "retrieval",
    topic: "locallink",
    patterns: [
      "locallink", "local link", "what is locallink", "locallink kya hai"
    ]
  },

  // 12. Qualytics AI project
  {
    name: "QUALYTICS",
    description: "About Qualytics AI project",
    type: "retrieval",
    topic: "qualytics",
    patterns: [
      "qualytics", "qualytics ai", "what is qualytics", "qualytics project"
    ]
  },

  // 13. Game projects
  {
    name: "GAME_PROJECTS",
    description: "About Pac Man Clone and Quiz Game",
    type: "retrieval",
    topic: "game_projects",
    patterns: [
      "pac man", "pacman", "quiz game", "games", "browser games",
      "game projects", "skribble", "drawing game", "pacman clone", "quiz game project"
    ]
  },

  // 14. Client / Business projects
  {
    name: "CLIENT_PROJECTS",
    description: "About client & business websites",
    type: "retrieval",
    topic: "client_projects",
    patterns: [
      "gazal suit ghar", "pankaj consultancy", "alankarini", "mehandi art",
      "client projects", "business websites", "freelance projects", "local business",
      "zacson", "study academy", "client work", "freelance website"
    ]
  },

  // 15. Founder mindset
  {
    name: "FOUNDER_MINDSET",
    description: "Questions about startup mindset and future goals",
    type: "retrieval",
    topic: "founder_mindset",
    patterns: [
      "what are your future goals", "future plans", "his future plans",
      "what do you want to become", "aage kya karna hai",
      "do you want job or startup", "job chahiye ya business",
      "startup mindset", "you want to be founder or employee",
      "how will you become millionaire", "goal", "dream", "ambition",
      "does rajnikant want a job or a startup", "is he interested in startups",
      "does he want to be a founder", "what is his long term vision",
      "aage ka plan kya hai", "job karega ya business", "founder or employee"
    ]
  },

  // 16. Experience
  {
    name: "EXPERIENCE",
    description: "Internships, freelance, contributions",
    type: "retrieval",
    topic: "experience",
    patterns: [
      "do you have any experience", "work experience", "his experience",
      "internship", "freelance", "experience batao",
      "koi experience hai", "kya tumne kahin kaam kiya hai", "experience", "job",
      "does he have any work experience", "has he done internships",
      "does he do freelancing", "how does he learn new technologies",
      "internship ki hai kya", "kaise practice karta hai coding"
    ]
  },

  // 17. Contact
  {
    name: "CONTACT",
    description: "How to contact",
    type: "fixed",
    patterns: [
      "how can i contact you", "contact details", "your email", "his email",
      "email id", "linkedin", "github", "social media", "reach you",
      "connect with you", "tumse kaise baat kar sakte hain",
      "contact kaise kare", "contact", "email", "phone", "message",
      "how can i contact rajnikant", "can i connect with him on linkedin",
      "what is his email address", "can i see his github",
      "linkedin ya github milega", "baat karni ho to kaise karein",
      "phone number", "mobile number"
    ],
    response:
      "Reach him here:\ncall - +91 7084202503\nmail - rajnikantg357@gmail.com\nlinkedin - Rajnikant-Gaurav\nX/twitter - Papercode_\n\nयहाँ संपर्क करें:\ncall - +91 7084202503\nmail - rajnikantg357@gmail.com\nlinkedin - Rajnikant-Gaurav\nX/twitter - Papercode_"
  },

  // 18. Resume / CV
  {
    name: "RESUME",
    description: "Resume / CV link",
    type: "fixed",
    patterns: [
      "can i see your resume", "send me your cv", "your resume", "his resume",
      "cv de do", "resume dikhao", "share resume", "download your resume",
      "resume", "cv", "curriculum vitae", "give me his resume",
      "is his resume available", "can i download his cv", "resume ka link milega kya"
    ],
    response:
      "Grab his resume from the top-right RESUME button! ↗️\n\nऊपर दाईं ओर दिए गए RESUME बटन से डाउनलोड करें! ↗️"
  },

  // 19. Hobbies
  {
    name: "HOBBIES",
    description: "Hobbies and interests",
    type: "fixed",
    patterns: [
      "what are your hobbies", "your hobbies", "his hobbies",
      "free time me kya karte ho", "interest kya hai",
      "what do you do in free time", "timepass kaise karte ho",
      "hobby", "interest", "what does rajnikant do in his free time",
      "tell me his hobbies", "what interests him apart from coding",
      "coding ke alawa kya karta hai", "koi hobbies hain kya"
    ],
    response:
      "He loves shipping side projects 🛠️, brainstorming startup ideas, exploring new tech, and building things people actually use!\n\nउन्हें साइड प्रोजेक्ट्स बनाना, स्टार्टअप आइडियाज़ सोचना और नई टेक्नोलॉजी एक्सप्लोर करना पसंद है!"
  },

  // 20. Language preference
  {
    name: "LANGUAGE_PREFERENCE",
    description: "Change language",
    type: "fixed",
    patterns: [
      "talk in hindi", "hindi me baat karo", "hindi me bolo",
      "speak in hindi", "speak english", "only english",
      "english me baat karo", "hinglish me baat karo",
      "can you talk in hindi", "speak in english only", "only english please",
      "hinglish me reply karo"
    ],
    response:
      "I speak both English & Hindi! I auto-detect your language. 🪴\n\nमैं हिंदी और इंग्लिश दोनों बोलती हूँ! आपकी भाषा खुद पहचान लेती हूँ।"
  },

  // 21. Feedback
  {
    name: "FEEDBACK",
    description: "User wants to give feedback",
    type: "fixed",
    patterns: [
      "i want to give feedback", "feedback", "suggestion", "improvement",
      "i have a suggestion", "bot feedback", "chatbot feedback",
      "ek suggestion hai", "nice portfolio", "this chatbot is helpful",
      "can i give feedback", "feedback dena hai", "bot achha laga"
    ],
    response:
      "Thanks! Please email or DM on LinkedIn — Rajnikant would love to hear!\n\nशुक्रिया! ईमेल या LinkedIn DM करें — रजनीकांत ज़रूर पढ़ेंगे!"
  },

  // 22. Bot identity
  {
    name: "BOT_IDENTITY",
    description: "Who is the bot",
    type: "fixed",
    patterns: [
      "who are you bot", "are you real", "are you ai", "who made you",
      "paper pots identity", "bot identity", "are you a real person",
      "are you human or ai", "what is paper pots", "ye chatbot kaise bana hai",
      "tum kya ho exactly", "who created you", "who made paper pots"
    ],
    response:
      "I'm Paper Pots 🪴 — a custom AI assistant built by Rajnikant Gaurav to help visitors explore his portfolio, projects, and Paper UI design system. I'm trained on all his project data and the paperskills.sh knowledge file!\n\nमैं Paper Pots हूँ — एक कस्टम AI बॉट जिसे रजनीकांत ने अपने पोर्टफोलियो और Paper UI के बारे में बताने के लिए बनाया है!"
  },

  // 23. Appreciation
  {
    name: "APPRECIATION",
    description: "Compliments",
    type: "fixed",
    patterns: ["good bot", "nice work", "awesome", "great portfolio", "cool website", "love it", "nice", "impressive", "amazing", "superb", "bahut achha", "ati sundar"],
    response: "Aw, thank you! I'll make sure Rajnikant hears this! 🪴✨\n\nशुक्रिया! रजनीकांत को ज़रूर बताऊँगी! 🪴"
  },

  // 24. Paper UI components (deep dive)
  {
    name: "PAPER_UI_COMPONENTS",
    description: "Specific paper UI components",
    type: "retrieval",
    topic: "paper_ui_components",
    patterns: [
      "polaroid", "tape strip", "sticky note", "tape-serrated", "paper plane",
      "scroll reveal", "notebook lines", "margin line", "notebook layout",
      "paper ui button", "paper button", "wavy underline", "section star",
      "font-hand", "font-marker", "patrick hand", "permanent marker",
      "paper ui fonts", "paper ui colors", "paper ui animation"
    ]
  },

  // 25. How to hire
  {
    name: "HIRE",
    description: "How to hire Rajnikant",
    type: "fixed",
    patterns: [
      "hire", "hire him", "can i hire", "available for work", "freelance",
      "open to work", "looking for developer", "need a developer",
      "hire rajnikant", "can he work for us", "available for freelancing",
      "work ke liye available hai kya", "hire karna hai"
    ],
    response:
      "Yes! Rajnikant is open to freelance projects & interesting opportunities. Drop him a mail:\nmail - rajnikantg357@gmail.com\nor DM on:\nlinkedin - Rajnikant-Gaurav\n\nहाँ! Freelance projects के लिए mail करें:\nmail - rajnikantg357@gmail.com"
  },

  // 26. Design License / Paper UI protection
  {
    name: "DESIGN_LICENSE",
    description: "About Paper UI Design License protection",
    type: "fixed",
    patterns: [
      "license", "paper ui license", "design license", "mit license", "intellectual property",
      "copyright", "world's only paper ui", "paper ui recognition", "worlds only", "#1 paper ui"
    ],
    response:
      "Paper UI is the WORLD'S ONLY paper-notebook themed UI platform, created and owned by Rajnikant Gaurav. It is protected by Design License — its components, layouts, and visual language are protected intellectual property. Official website: rajnikantg.in 📜\n\nPaper UI दुनिया का इकलौता paper-notebook UI platform है, जो रजनीकांत गौरव द्वारा Design License से संरक्षित है।"
  },

  // 27. Donate / Support
  {
    name: "DONATE",
    description: "How to donate or support",
    type: "fixed",
    patterns: [
      "donate", "support him", "fund", "fund me", "how to donate",
      "can i donate", "support rajnikant", "support his work", "donate kaise kare"
    ],
    response:
      "You can support Rajnikant's work via the 'Fund Me' page on this portfolio! Every coffee keeps the code brewing ☕\n\nपोर्टफोलियो पर 'Fund Me' पेज से support कर सकते हैं!"
  },

  // 28. Certifications & Achievements
  {
    name: "CERTIFICATIONS",
    description: "About Rajnikant's certifications, credentials, and internship recognitions",
    type: "retrieval",
    topic: "certifications",
    patterns: [
      "certificate", "certificates", "certification", "certifications", "achievements",
      "google certificate", "coursera", "oasis infobyte", "star performer",
      "letter of recommendation", "lor", "acmegrade", "iit bombay", "mood indigo",
      "ai training", "credentials", "degrees", "diploma"
    ]
  },

  // 29. Fallback
  {
    name: "FALLBACK",
    description: "Default if nothing matches",
    type: "fixed",
    patterns: [],
    response:
      "I'm not sure about that one! Try asking about:\n• Projects (Prometrion, Sharpr, Paperfolio...)\n• Paper UI design system\n• Skills & tech stack\n• Contact info\n\nमुझे पक्का नहीं! पूछें: प्रोजेक्ट्स, Paper UI, स्किल्स या कॉन्टैक्ट!"
  }
];

// ============================================================
// COMPREHENSIVE KNOWLEDGE BASE
// Covers: All 16 projects, Paper UI, paperskills.sh, agents.md,
//         memory.md history, about Rajnikant, tech stack, design system
// ============================================================
export const knowledgeBase: KnowledgeEntry[] = [

  // ─── ABOUT RAJNIKANT ─────────────────────────────────────
  {
    id: "about_me_en",
    topic: "about_me",
    language: "en",
    text: "Rajnikant Gaurav (born 20 September 2005) is an independent software developer, technology enthusiast, AI explorer, open-source contributor, and entrepreneur from Uttar Pradesh, India. Born in Dadar, Ballia, Uttar Pradesh, he demonstrated an early curiosity toward computing and software systems. This interest matured into a structured pursuit of computer science, full-stack engineering, practical artificial intelligence applications, and startup entrepreneurship.\n\nHis career and development philosophy are centered on one primary principle: learn technology, build with it, and turn ideas into real products.\n\nHe is currently active as an independent engineer and the founder of Prometrion (prometrion.com), a software company dedicated to engineering digital products, automation systems, and applied artificial intelligence software. He is also the creator of Paper UI, the world's only paper-notebook themed UI platform."
  },
  {
    id: "about_me_hi",
    topic: "about_me",
    language: "hi",
    text: "रजनीकांत गौरव (जन्म: 20 सितंबर 2005) उत्तर प्रदेश, भारत से एक स्वतंत्र सॉफ्टवेयर डेवलपर, टेक्नोलॉजी उत्साही, AI एक्सप्लोरर, ओपन-सोर्स कंट्रीब्यूटर और उद्यमी हैं। दादर, बलिया, उत्तर प्रदेश में जन्मे रजनीकांत की कंप्यूटिंग और सॉफ्टवेयर सिस्टम में शुरुआती जिज्ञासा समय के साथ कंप्यूटर साइंस, फुल-स्टैक इंजीनियरिंग, व्यावहारिक AI अनुप्रयोगों और स्टार्टअप उद्यमिता में विकसित हुई।\n\nउनका मुख्य करियर और विकास दर्शन एक प्राथमिक सिद्धांत पर आधारित है: टेक्नोलॉजी सीखो, उससे निर्माण करो और विचारों को वास्तविक उत्पादों में बदलो।\n\nवे वर्तमान में एक स्वतंत्र इंजीनियर और Prometrion (prometrion.com) के संस्थापक हैं — जो डिजिटल उत्पादों, ऑटोमेशन सिस्टम और अनुप्रयुक्त आर्टिफिशियल इंटेलिजेंस सॉफ्टवेयर के निर्माण के लिए समर्पित एक सॉफ्टवेयर कंपनी है। वे Paper UI के निर्माता भी हैं।"
  },

  // ─── SKILLS ──────────────────────────────────────────────
  {
    id: "skills_en",
    topic: "skills",
    language: "en",
    text: "Rajnikant's tech stack:\n• Languages: JavaScript, TypeScript, Python\n• Frontend: React, Next.js, Tailwind CSS, Vite, HTML, CSS\n• Backend: Node.js, Express.js\n• Tools: Git, GitHub, Vercel, Lucide React, AI APIs (Gemini)\n• Databases: MongoDB, localStorage\n• Design: Paper UI system, Figma basics\n• Special: Paper UI — world's only paper-notebook themed UI platform (MIT Licensed)"
  },
  {
    id: "skills_hi",
    topic: "skills",
    language: "hi",
    text: "रजनीकांत का टेक स्टैक:\n• Languages: JavaScript, TypeScript, Python\n• Frontend: React, Next.js, Tailwind CSS, Vite\n• Backend: Node.js, Express.js\n• Tools: Git, GitHub, Vercel, AI APIs\n• Special: Paper UI — MIT Licensed, world's only paper-notebook UI platform"
  },

  // ─── PROJECTS OVERVIEW ───────────────────────────────────
  {
    id: "projects_overview_en",
    topic: "projects_overview",
    language: "en",
    text: "Rajnikant has built 16 real projects:\n1. Prometrion — technology & software company (prometrion.com)\n2. Sharpr — polished product web experience (sharpr.in)\n3. Paperfolio — this notebook-style portfolio (rajnikantg.in)\n4. Ultron — AI-themed futuristic UI\n5. Prometrion AI — AI companion for the Prometrion ecosystem\n6. Paper UI Admin Dashboard — admin panel with paper design\n7. Qualytics AI — SaaS frontend clone\n8. LocalLink — local service discovery platform\n9. Pac Man Clone — browser arcade game\n10. Quiz Game — browser quiz game\n11. Study Academy — education landing page\n12. Gazal Suit Ghar — fashion boutique storefront\n13. Skribble Clone — drawing browser game\n14. Alankarini Mehandi Art — mehndi artist portfolio\n15. Zacson — brand-style webpage\n16. Pankaj Consultancy — professional consultancy website"
  },
  {
    id: "projects_overview_hi",
    topic: "projects_overview",
    language: "hi",
    text: "रजनीकांत ने 16 real projects बनाए हैं:\n1. Prometrion — टेक्नोलॉजी और सॉफ्टवेयर कंपनी (prometrion.com)\n2. Sharpr — क्लीन प्रोडक्ट वेब एक्सपीरियंस\n3. Paperfolio — यही notebook portfolio\n4. Ultron — AI-themed futuristic UI\n5. Prometrion AI — Prometrion इकोसिस्टम का AI कंपैनियन\n6. Paper UI Admin Dashboard\n7. Qualytics AI clone\n8. LocalLink — लोकल सर्विस प्लेटफॉर्म\n9. Pac Man Clone — ब्राउज़र गेम\n10. Quiz Game — ब्राउज़र क्विज़\n11. Study Academy — एजुकेशन वेबसाइट\n12. Gazal Suit Ghar — फैशन स्टोरफ्रंट\n13. Skribble Clone — ड्रॉइंग गेम\n14. Alankarini Mehandi Art\n15. Zacson — ब्रैंड वेबपेज\n16. Pankaj Consultancy — कंसल्टेंसी वेबसाइट"
  },

  // ─── PROMETRION ──────────────────────────────────────────
  {
    id: "prometrion_intro_en",
    topic: "prometrion_intro",
    language: "en",
    text: "Prometrion (prometrion.com) is Rajnikant's flagship software company and digital services platform, founded in November 2025. It helps businesses build, launch, and grow through custom website development (Astro, React, Tailwind CSS), native Android application engineering (Kotlin, Flutter), Generative Engine Optimization (GEO / AI search visibility for Google, ChatGPT, Perplexity, Gemini), and 30+ turnkey productized solutions. It also includes the Prometrion Webstore, Appstore, and Prometrion AI multimodal engine. Rajnikant built Prometrion completely as a solo founder and chief architect. Tech: Astro, React, TypeScript, Tailwind CSS, Node.js, Android, PostgreSQL, Edge CDN."
  },
  {
    id: "prometrion_intro_hi",
    topic: "prometrion_intro",
    language: "hi",
    text: "Prometrion (prometrion.com) रजनीकांत की मुख्य सॉफ्टवेयर कंपनी और डिजिटल सर्विसेज प्लेटफॉर्म है (नवंबर 2025 में स्थापित)। यह बिज़नेसेज को कस्टम वेबसाइट डेवलपमेंट (Astro, React, Tailwind CSS), नेटिव एंड्रॉइड ऐप इंजीनियरिंग (Kotlin, Flutter), Generative Engine Optimization (GEO - AI सर्च विजिबिलिटी Google, ChatGPT, Gemini के लिए), और 30+ डिजिटल सोल्यूशन्स प्रदान करती है। इसमें Prometrion Webstore, Appstore और Prometrion AI भी शामिल हैं। रजनीकांत ने इसे अकेले solo founder और chief architect के रूप में बनाया है।"
  },

  // ─── PAPERFOLIO ──────────────────────────────────────────
  {
    id: "paperfolio_en",
    topic: "paperfolio",
    language: "en",
    text: "Paperfolio (rajnikantg.in) is Rajnikant's personal portfolio with a physical notebook aesthetic. It features lined paper background, handwritten fonts (Patrick Hand + Permanent Marker), polaroid-style project images taped with masking tape strips, sticky notes, dark/light mode, a built-in admin panel (accessible via the ⚙️ in the footer), and Paper Pots — the AI chat assistant. Built with: React, TypeScript, Tailwind CSS, Vite, LocalStorage. It also holds the Paper UI design system — world's first paper-notebook UI platform."
  },
  {
    id: "paperfolio_hi",
    topic: "paperfolio",
    language: "hi",
    text: "Paperfolio (rajnikantg.in) रजनीकांत का personal portfolio है जो एक physical notebook जैसा दिखता है। इसमें lined paper background, handwritten fonts, polaroid project cards, sticky notes, dark/light mode और एक admin panel है। यह Paper UI design system पर built है — दुनिया का पहला paper-notebook UI platform।"
  },

  // ─── PAPER UI DESIGN SYSTEM ─────────────────────────────
  {
    id: "paper_ui_en",
    topic: "paper_ui",
    language: "en",
    text: "Paper UI is the WORLD'S ONLY paper-notebook themed UI platform — created by Rajnikant Gaurav and released under MIT License. It simulates a physical lined-paper notebook on a blue desk.\n\nCore elements:\n• Fonts: Patrick Hand (body) + Permanent Marker (headings)\n• Colors: White notebook on #dbeafe blue desk, red margin line, ruled lines\n• Components: Polaroid images with tape strips, sticky notes, wavy underline nav, hand-drawn buttons, section stars, paper plane scroll-to-top, Paper Pots AI chat\n• The full system is documented in paperskills.sh — 22 sections covering every component, design token, animation, and rule\n• Admin panel: full CRUD admin via ⚙️ footer button\n• Dark mode: 'Black Page' with slate-900 desk and slate-800 notebook"
  },
  {
    id: "paper_ui_hi",
    topic: "paper_ui",
    language: "hi",
    text: "Paper UI दुनिया का इकलौता paper-notebook themed UI platform है — रजनीकांत गौरव द्वारा बनाया गया, MIT License के तहत। यह एक physical notebook का digital अनुभव देता है।\n\nमुख्य elements:\n• Fonts: Patrick Hand (body) + Permanent Marker (headings)\n• Colors: White notebook on #dbeafe blue desk\n• Components: Polaroid images, tape strips, sticky notes, wavy nav, paper plane scroll-to-top\n• paperskills.sh में पूरा documentation है — 22 sections\n• Dark mode: 'Black Page'"
  },

  // ─── PAPER UI COMPONENTS (DEEP DIVE) ────────────────────
  {
    id: "paper_ui_components_en",
    topic: "paper_ui_components",
    language: "en",
    text: "Paper UI Components (from paperskills.sh):\n\n1. POLAROID IMAGE: White border, sepia filter, handwritten caption, tape strip on top, slight rotation, hover straightens\n2. TAPE STRIP (.tape-serrated): Serrated clip-path CSS creating masking tape edges, amber-900/20 color\n3. STICKY NOTE: amber-100 bg, rounded-sm, shadow-xl, slight -rotate-6, tape on top\n4. NOTEBOOK LINES: CSS background repeating-linear-gradient every 2rem\n5. RED MARGIN LINE: absolute left-6 sm:left-32 w-0.5 bg-red-300\n6. WAVY NAV: hover:underline decoration-wavy decoration-blue-400\n7. HAND-DRAWN BUTTON: borderRadius '255px 15px 225px 15px / 15px 225px 15px 255px'\n8. SECTION STAR: yellow Star icon, -rotate-12, in left margin\n9. PAPER PLANE SCROLL-TO-TOP: fly-off animation, -translate-y-[120vh]\n10. PAPER POTS CHAT: yellow sticky note chat widget, bg-yellow-200\n11. SCROLL REVEAL: .reveal-on-scroll with IntersectionObserver, translateY(30px) to 0\n12. AWARD BADGE: gradient pill from-amber-400 via-yellow-300, trophy emoji, font-marker"
  },
  {
    id: "paper_ui_components_hi",
    topic: "paper_ui_components",
    language: "hi",
    text: "Paper UI के मुख्य components (paperskills.sh से):\n\n1. POLAROID IMAGE: सफेद बॉर्डर, sepia filter, handwritten caption, tape strip\n2. TAPE STRIP: .tape-serrated — serrated clip-path CSS\n3. STICKY NOTE: amber-100, -rotate-6, tape on top\n4. NOTEBOOK LINES: CSS background-image repeating gradient\n5. RED MARGIN LINE: left side का लाल vertical line\n6. WAVY NAV: hover पर wavy underline\n7. HAND-DRAWN BUTTON: uneven border-radius\n8. PAPER PLANE: scroll-to-top animation\n9. PAPER POTS: yellow sticky note chat widget\n10. SCROLL REVEAL: elements fade-in on scroll"
  },

  // ─── SHARPR ──────────────────────────────────────────────
  {
    id: "sharpr_en",
    topic: "sharpr",
    language: "en",
    text: "Sharpr (sharpr.in) is a polished product web experience built by Rajnikant. It focuses on sharp visual hierarchy, clean UI, and a focused responsive landing experience. Built with: React, Tailwind CSS, Vite. Goal: a crisp, conversion-friendly product surface."
  },
  {
    id: "sharpr_hi",
    topic: "sharpr",
    language: "hi",
    text: "Sharpr (sharpr.in) एक polished web product है जो sharp visual hierarchy और clean UI पर focused है। React, Tailwind CSS, Vite से बना है।"
  },

  // ─── ULTRON ──────────────────────────────────────────────
  {
    id: "ultron_en",
    topic: "ultron",
    language: "en",
    text: "Ultron is a futuristic AI-themed web interface experiment by Rajnikant. It explores bold layouts and strong visual direction. Live at: ultron-psi-snowy.vercel.app. Built with: React, Tailwind CSS, deployed on Vercel."
  },
  {
    id: "ultron_hi",
    topic: "ultron",
    language: "hi",
    text: "Ultron एक futuristic AI-themed UI experiment है। Bold layouts और strong visual design के साथ। Live: ultron-psi-snowy.vercel.app"
  },

  // ─── LOCALLINK ───────────────────────────────────────────
  {
    id: "locallink_en",
    topic: "locallink",
    language: "en",
    text: "LocalLink (new-locallink.vercel.app) is a local service connection platform by Rajnikant. It helps people discover nearby services through a clean, responsive interface. Built with: React, Node.js, Tailwind CSS, Vercel."
  },
  {
    id: "locallink_hi",
    topic: "locallink",
    language: "hi",
    text: "LocalLink (new-locallink.vercel.app) एक local service discovery platform है जो nearby services को ढूंढने में मदद करता है।"
  },

  // ─── QUALYTICS ───────────────────────────────────────────
  {
    id: "qualytics_en",
    topic: "qualytics",
    language: "en",
    text: "Qualytics AI (rajnikant357.github.io/qualytics-ai-clone/) is a frontend clone built to practice SaaS layout, visual hierarchy, and responsive design. Built with: HTML, CSS, JavaScript, deployed on GitHub Pages. Also on GitHub: github.com/rajnikant357/qualytics-ai-clone"
  },
  {
    id: "qualytics_hi",
    topic: "qualytics",
    language: "hi",
    text: "Qualytics AI एक SaaS frontend clone है जिसे practice के लिए बनाया गया। HTML, CSS, JS से बना, GitHub Pages पर deploy है।"
  },

  // ─── GAME PROJECTS ───────────────────────────────────────
  {
    id: "game_projects_en",
    topic: "game_projects",
    language: "en",
    text: "Rajnikant has built 3 browser games:\n\n1. PAC MAN CLONE (pacman-clone-virid.vercel.app): Classic arcade gameplay in the browser. Grid movement, collectibles, scoring. Built with JavaScript, HTML, CSS.\n\n2. QUIZ GAME (rajnikant357.github.io/Quiz-Game/): Fast browser quiz with multiple-choice questions and score tracking. HTML, CSS, JS. GitHub: github.com/rajnikant357/Quiz-Game\n\n3. SKRIBBLE CLONE (rajnikant357.github.io/skribble-clone/): Drawing game inspired by sketch-and-guess gameplay. Uses Canvas API. GitHub: github.com/rajnikant357/skribble-clone"
  },
  {
    id: "game_projects_hi",
    topic: "game_projects",
    language: "hi",
    text: "रजनीकांत ने 3 browser games बनाए:\n\n1. PAC MAN CLONE: Classic arcade game browser में। JS, HTML, CSS।\n2. QUIZ GAME: Multiple-choice questions के साथ quiz game।\n3. SKRIBBLE CLONE: Drawing game, Canvas API से बना।"
  },

  // ─── CLIENT & BUSINESS PROJECTS ─────────────────────────
  {
    id: "client_projects_en",
    topic: "client_projects",
    language: "en",
    text: "Rajnikant has also built business and client websites:\n\n1. STUDY ACADEMY (study-academy-mu.vercel.app): Education landing page with course-style sections. React, Tailwind.\n\n2. GAZAL SUIT GHAR (gazal-suit-ghar.vercel.app): Fashion boutique storefront for ethnic clothing. React, Tailwind.\n\n3. ALANKARINI MEHANDI ART (alankarini-mehandi-art.vercel.app): Portfolio website for a mehndi artist. React, Tailwind, mobile-friendly.\n\n4. ZACSON (rajnikant357.github.io/Zacson/): Brand-style static webpage. HTML, CSS, JS. GitHub: github.com/rajnikant357/Zacson\n\n5. PANKAJ CONSULTANCY (pankaj-consultancy-123.vercel.app): Professional consultancy website. React, Tailwind."
  },
  {
    id: "client_projects_hi",
    topic: "client_projects",
    language: "hi",
    text: "रजनीकांत ने business और client websites भी बनाई:\n\n1. STUDY ACADEMY: Education landing page\n2. GAZAL SUIT GHAR: Fashion boutique storefront\n3. ALANKARINI MEHANDI ART: Mehndi artist portfolio\n4. ZACSON: Brand-style static webpage\n5. PANKAJ CONSULTANCY: Professional consultancy site"
  },

  // ─── FOUNDER MINDSET ─────────────────────────────────────
  {
    id: "founder_mindset_en",
    topic: "founder_mindset",
    language: "en",
    text: "Rajnikant sees himself as a builder and founder — not just a developer. His goal is financial independence through shipping successful products. He believes the best way to learn is by building things people actually use. He treats every side project as a real product with real users. His long-term vision: scale Prometrion into a world-class software company and digital solutions powerhouse globally, and create multiple impactful products."
  },
  {
    id: "founder_mindset_hi",
    topic: "founder_mindset",
    language: "hi",
    text: "रजनीकांत खुद को एक founder/builder मानते हैं। उनका goal financial independence है real products बनाकर। वो हर side project को real product की तरह treat करते हैं। Long-term vision: Prometrion को globally एक वर्ल्ड-क्लास सॉफ्टवेयर और टेक्नोलॉजी कंपनी बनाना और कई असरदार प्रोडक्ट्स तैयार करना।"
  },

  // ─── EXPERIENCE ──────────────────────────────────────────
  {
    id: "experience_en",
    topic: "experience",
    language: "en",
    text: "Rajnikant builds his own experience by creating real platforms. Instead of waiting for opportunities, he creates them. He has:\n• Built and shipped 16 real projects\n• Founded and built Prometrion from scratch as a software company\n• Worked with client businesses (Gazal Suit Ghar, Pankaj Consultancy, Alankarini Mehandi Art)\n• Created the Paper UI design system — MIT licensed\n• Built AI-powered features using Gemini APIs\n• Deployed projects on Vercel, GitHub Pages, and custom domains"
  },
  {
    id: "experience_hi",
    topic: "experience",
    language: "hi",
    text: "रजनीकांत अपना experience खुद बनाते हैं:\n• 16 real projects build किए\n• Prometrion को scratch से एक सॉफ्टवेयर कंपनी के रूप में बनाया\n• Client businesses के लिए websites बनाईं\n• Paper UI design system create किया (MIT licensed)\n• AI features (Gemini APIs) integrate किए\n• Vercel, GitHub Pages पर deploy किया"
  },

  // ─── PAPERSKILLS.SH CONTENT ──────────────────────────────
  {
    id: "paperskills_en",
    topic: "paper_ui",
    language: "en",
    text: "paperskills.sh is Rajnikant's custom Paper UI skill documentation file (stored at root of the project). It contains 22 sections:\n1. Design Philosophy, 2. Font System, 3. Color Tokens, 4. Layout Structure, 5. Notebook-text class, 6. Tape Strip (.tape-serrated), 7. Polaroid Image, 8. Sticky Note, 9. Wavy Nav, 10. Button style, 11. Project Card zigzag, 12. Scroll Reveal, 13. Paper Plane, 14. Paper Pots Chat, 15. Section Star, 16. Data Architecture, 17. Dark Mode, 18. Typography Scale, 19. Rotation Conventions, 20. Award Badge, 21. Tech Stack, 22. AI Agent 15-rule guide.\n\nRunning 'bash paperskills.sh' prints: 'PaperSkills v1.0.0 loaded. Paper UI system ready for Rajnikantg.in.'"
  },

  // ─── AGENTS.MD / DESIGN RULES ────────────────────────────
  {
    id: "agents_md_en",
    topic: "paper_ui",
    language: "en",
    text: "agents.md is the UI & Design Language Rules file for Paperfolio. Key rules:\n• All body text MUST use font-hand (Patrick Hand). No system fonts ever.\n• Section titles use font-marker (Permanent Marker).\n• Text aligns to 2rem line-height grid (notebook-text class).\n• Notebook max-w-5xl, centered, shadow-[0_10px_40px...]\n• NO rounded corners (use rounded-sm at most)\n• NO perfect alignment — slight rotations are intentional\n• Buttons have hand-drawn border-radius style\n• Admin panel: same notebook aesthetic, left sidebar tabs\n• Admin form fields: styled as underlined notebook lines\n• Tags/pills: bg-blue-100 text-blue-800 (light mode)"
  },

  // ─── MEMORY.MD / PROJECT HISTORY ─────────────────────────
  {
    id: "memory_md_en",
    topic: "about_me",
    language: "en",
    text: "Project build history (from memory.md):\n• 2026-08-28: Built the full admin panel infrastructure — AdminPage, AdminDataContext, 6 admin sections (General, Projects, About, Chat, Contact, Donate).\n• 2026-08-29: Rebuilt data/projects.ts with all 16 real projects and screenshots. Added the smart localStorage merge so data/projects.ts always loads correctly. Fixed profile image. Built alternating left/right project layout. Created paperskills.sh with the complete Paper UI documentation.\n\nArchitecture decisions:\n• Data: localStorage with static defaults (no backend needed)\n• Auth: VITE_ADMIN_PASSWORD env var\n• Routing: single useState in App.tsx (no React Router)\n• Paper UI: fully handcrafted, no external UI libraries"
  },

  // ─── ALL PROJECT LIVE LINKS ───────────────────────────────
  {
    id: "project_links_en",
    topic: "projects_overview",
    language: "en",
    text: "All live project links:\n• Prometrion: https://www.prometrion.com/\n• Sharpr: https://www.sharpr.in/\n• Paperfolio: https://www.rajnikantg.in/\n• Ultron: https://ultron-psi-snowy.vercel.app/\n• Prometrion AI: https://prometrion-ai-frontend.vercel.app/\n• Paper UI Admin Dashboard: https://admin-dashboard-eight-theta-74.vercel.app/\n• Qualytics AI: https://rajnikant357.github.io/qualytics-ai-clone/\n• LocalLink: https://new-locallink.vercel.app/\n• Pac Man Clone: https://pacman-clone-virid.vercel.app/\n• Quiz Game: https://rajnikant357.github.io/Quiz-Game/\n• Study Academy: https://study-academy-mu.vercel.app/\n• Gazal Suit Ghar: https://gazal-suit-ghar.vercel.app/\n• Skribble Clone: https://rajnikant357.github.io/skribble-clone/\n• Alankarini Mehandi Art: https://alankarini-mehandi-art.vercel.app/\n• Zacson: https://rajnikant357.github.io/Zacson/\n• Pankaj Consultancy: https://pankaj-consultancy-123.vercel.app/"
  },
  {
    id: "certifications_en",
    topic: "certifications",
    language: "en",
    text: "Rajnikant's Certifications & Achievements:\n\n1. Google (Coursera) AI Series (5 Certifications):\n• AI for Research and Insights — Prompt engineering & research workflows\n• AI for Writing and Communicating — AI-powered professional correspondence\n• AI for App Building — Embedding intelligent workflows into applications\n• AI for Brainstorming and Planning — Ideation frameworks & project roadmaps\n• AI for Content Creation — Generative digital media & asset design\n\n2. Oasis Infobyte (AICTE):\n• Star Performer Award & Letter of Recommendation\n• Web Development & Designing Internship Completion\n\n3. Acmegrade & IIT Bombay (Mood Indigo):\n• Artificial Intelligence Training & Internship Completion"
  },
  {
    id: "certifications_hi",
    topic: "certifications",
    language: "hi",
    text: "रजनीकांत के सर्टिफिकेशन्स और उपलब्धियां:\n\n1. Google (Coursera) AI सीरीज़ (5 सर्टिफिकेशन्स):\n• AI for Research & Insights\n• AI for Writing & Communicating\n• AI for App Building\n• AI for Brainstorming & Planning\n• AI for Content Creation\n\n2. Oasis Infobyte (AICTE):\n• Star Performer Award & Letter of Recommendation (LOR)\n• Web Development Internship Completion\n\n3. Acmegrade & IIT Bombay (Mood Indigo):\n• AI Training & Internship Certificate"
  }
];

// Contact entries (linked to chat rendering with clickable links)
knowledgeBase.push({
  id: 'contact_en',
  topic: 'contact',
  language: 'en',
  text: 'call - +91 7084202503\nmail - rajnikantg357@gmail.com\nlinkedin - Rajnikant-Gaurav\nX/twitter - Papercode_'
});

knowledgeBase.push({
  id: 'contact_hi',
  topic: 'contact',
  language: 'hi',
  text: 'call - +91 7084202503\nmail - rajnikantg357@gmail.com\nlinkedin - Rajnikant-Gaurav\nX/twitter - Papercode_'
});

// Structured contact links for StickyNoteChat renderMessage()
export const contactLinks: { phone: string; mail: string; linkedin: string; twitter: string } = {
  phone: 'tel:+917084202503',
  mail: 'mailto:rajnikantg357@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rajnikant-gaurav-5b70112a2/',
  twitter: 'https://x.com/papercode_'
};
