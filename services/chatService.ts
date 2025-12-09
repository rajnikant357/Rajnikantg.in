import { intents, knowledgeBase, Intent } from '../data/chatData';

// Helper: Simple language detection
const isHindiInput = (text: string): boolean => {
  // Check for Devanagari script characters
  if (/[\u0900-\u097F]/.test(text)) return true;
  
  // Common Hinglish words that strongly suggest Hindi preference
  const hinglishKeywords = [
    'kya', 'kaise', 'karo', 'hai', 'hain', 'ho', 'batao', 'sakte', 
    'nahi', 'ji', 'namaste', 'namaskar', 'bhai', 'bro', 'konsi', 'kem', 'cho',
    'bhi', 'se', 'ka', 'ki', 'ke', 'aur', 'kuch', 'wala'
  ];
  
  const words = text.toLowerCase().replace(/[?.,!]/g, '').split(/\s+/);
  return words.some(w => hinglishKeywords.includes(w));
};

// Helper: Split dual-language fixed responses
const getLocalizedFixedResponse = (fullResponse: string, isHindi: boolean): string => {
  const parts = fullResponse.split('\n\n');
  if (parts.length < 2) return fullResponse;

  const hindiPartIndex = parts.findIndex(p => /[\u0900-\u097F]/.test(p));
  
  if (isHindi && hindiPartIndex !== -1) {
    return parts[hindiPartIndex];
  } else if (!isHindi && hindiPartIndex !== -1) {
    // Return parts that are NOT the hindi part (assuming English)
    return parts.filter((_, i) => i !== hindiPartIndex).join('\n\n');
  }
  
  return fullResponse;
};

// Helper: Clean input (remove punctuation, lower case, keep Hindi chars)
const cleanText = (text: string): string => {
  return text
    .toLowerCase()
    // Remove characters that are NOT: word chars, whitespace, or Hindi range
    .replace(/[^\w\s\u0900-\u097F]/g, '')
    .trim();
};

// Helper: Keyword Map for fallback matching
const KEYWORD_MAP: Record<string, string> = {
  'prometrion': 'PROMETRION_INTRO',
  'startup': 'PROMETRION_INTRO',
  'skills': 'SKILLS',
  'stack': 'SKILLS',
  'tech': 'SKILLS',
  'coding': 'SKILLS',
  'education': 'EDUCATION',
  'college': 'EDUCATION',
  'study': 'EDUCATION',
  'studying': 'EDUCATION',
  'resume': 'RESUME',
  'cv': 'RESUME',
  'contact': 'CONTACT',
  'email': 'CONTACT',
  'hire': 'CONTACT',
  'projects': 'PROJECTS_OVERVIEW',
  'work': 'PROJECTS_OVERVIEW',
  'experience': 'EXPERIENCE',
  'about': 'ABOUT_ME',
  'who': 'ABOUT_ME',
  'rajnikant': 'ABOUT_ME',
  'hi': 'GREETING',
  'hello': 'GREETING',
  'paper': 'GREETING',
  'pots': 'GREETING',
  'feedback': 'FEEDBACK',
  'bot': 'BOT_IDENTITY'
};

export const getChatResponse = async (input: string): Promise<string> => {
  // 1. Sanitize the user input: lowercase, remove punctuation
  // Example: "Hello Paper Pots!!!" -> "hello paper pots"
  const cleanInput = cleanText(input);
  const isHindi = isHindiInput(input); // Use original input for language check to detect script
  
  let matchedIntent: Intent | undefined = undefined;
  let maxMatchScore = 0;

  // Strategy 1: Pattern Matching on Cleaned Input
  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      // Clean the pattern too, just in case (e.g., if dataset has "Who?" -> "who")
      const cleanPattern = cleanText(pattern);
      
      // Check if the user's cleaned input includes the cleaned pattern
      // This handles: "Please show resume" (input) contains "resume" (pattern)
      // Or: "Who is Rajnikant?" (input) -> "who is rajnikant" contains "who is rajnikant" (pattern)
      if (cleanInput.includes(cleanPattern)) {
        // Longer patterns get higher scores (more specific)
        const score = cleanPattern.length; 
        if (score > maxMatchScore) {
          maxMatchScore = score;
          matchedIntent = intent;
        }
      }
    }
  }

  // Strategy 2: Fallback Keyword Matching
  // If no strong pattern match, look for isolated critical keywords in the cleaned string
  if (!matchedIntent) {
    const inputWords = cleanInput.split(/\s+/);
    for (const word of inputWords) {
      if (KEYWORD_MAP[word]) {
        // Find the intent that corresponds to this keyword
        const intentName = KEYWORD_MAP[word];
        matchedIntent = intents.find(i => i.name === intentName);
        if (matchedIntent) break; // Found a keyword match
      }
    }
  }

  // Fallback if still no intent matched
  if (!matchedIntent) {
    matchedIntent = intents.find(i => i.name === "FALLBACK");
  }

  if (!matchedIntent) return "I'm lost in the pages...";

  // 3. Response Generation
  if (matchedIntent.type === 'fixed') {
    if (!matchedIntent.response) return "...";
    return getLocalizedFixedResponse(matchedIntent.response, isHindi);
  } 
  
  if (matchedIntent.type === 'retrieval' && matchedIntent.topic) {
    const topic = matchedIntent.topic;
    const targetLang = isHindi ? 'hi' : 'en';
    
    // Fetch entries
    const entries = knowledgeBase.filter(k => k.topic === topic && k.language === targetLang);
    
    if (entries.length > 0) {
      return entries.map(e => e.text).join('\n\n');
    }
    
    // Cross-language fallback (if Hindi requested but not found, show English)
    const fallbackEntries = knowledgeBase.filter(k => k.topic === topic);
    if (fallbackEntries.length > 0) {
      return fallbackEntries.map(e => e.text).join('\n\n');
    }
  }

  return "I have some notes on this, but the ink is smudged.";
};
