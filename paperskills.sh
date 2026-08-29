#!/bin/bash
# =============================================================================
#  PAPERSKILLS - Paper UI Skill Library for Rajnikantg.in Portfolio
#  Created by: Rajnikant Gaurav
#  Project: Paperfolio (rajnikantg.in)
#  License: MIT
#  Version: 1.0.0
# =============================================================================
#
#  This file documents and defines the custom "Paper UI" design system used
#  in the Rajnikantg.in portfolio. It is a reusable skill reference for any
#  AI agent or developer building on this project.
#
#  The Paper UI is the WORLD'S ONLY paper-notebook themed UI platform,
#  developed and recognised under MIT Licensing.
#  Created by Rajnikant Gaurav.
#
# =============================================================================

# ---------------------------------------------------------
# SECTION 1: DESIGN PHILOSOPHY
# ---------------------------------------------------------
#
# The Paper UI design language mimics a real physical notebook desk experience:
#
#   - White A4-style notebook page on a light-blue desk background
#   - Ruled lines printed across the notebook (like graph/ruled paper)
#   - A red vertical margin line on the left side
#   - Handwritten fonts for all content (Patrick Hand + Permanent Marker)
#   - Polaroid-style images taped with sticky tape strips (tape-serrated)
#   - Sticky notes with tape on top
#   - Slight random rotations on cards/images (human imperfection)
#   - Wabi-sabi aesthetic - not pixel-perfect, intentionally handmade
#   - Paper Plane scroll-to-top ("Take off!")
#   - Paper Pots AI chat bubble (sticky note style)
#

# ---------------------------------------------------------
# SECTION 2: FONT SYSTEM
# ---------------------------------------------------------
#
# Paper UI uses exactly TWO Google Fonts:
#
#   font-hand   -> "Patrick Hand"     (body text, labels, UI copy)
#   font-marker -> "Permanent Marker" (headings, emphasis, badges)
#
# HTML import:
#   <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Permanent+Marker&display=swap" rel="stylesheet">
#
# Tailwind config:
#   fontFamily: {
#     hand:   ['"Patrick Hand"',     'cursive'],
#     marker: ['"Permanent Marker"', 'cursive'],
#   }
#
# Rules:
#   - NEVER use system fonts for visible UI text
#   - font-marker ONLY for headings / big labels / badges
#   - font-hand for all other content
#

# ---------------------------------------------------------
# SECTION 3: COLOR TOKENS
# ---------------------------------------------------------
#
# Light Mode (default):
#   Desk background:  #dbeafe  (bg-blue-100)
#   Notebook page:    #ffffff
#   Ruled lines:      #94a3b8  (bg-slate-400)
#   Margin line:      #fca5a5  (bg-red-300)
#   Body text:        #1e293b  (text-slate-800)
#   Muted text:       #64748b  (text-slate-500)
#
# Dark Mode ("Black Page"):
#   Desk background:  #0f172a  (bg-slate-900)
#   Notebook page:    #1e293b  (bg-slate-800)
#   Ruled lines:      #334155
#   Body text:        #e2e8f0  (text-slate-200)
#
# Accent Colors:
#   Blue links:       #3b82f6  (text-blue-500)
#   Yellow tape/note: #fef3c7  (bg-amber-100)
#   Tape strip:       bg-amber-900/20
#   Star/award:       #eab308  (text-yellow-500)
#   Purple (resume):  #a855f7  (text-purple-500)
#

# ---------------------------------------------------------
# SECTION 4: LAYOUT STRUCTURE
# ---------------------------------------------------------
#
# Root Layout (App.tsx):
#
#   <div class="min-h-screen flex justify-center py-8 px-2 sm:px-8 bg-[#dbeafe]">
#     <!-- DESK: blue background simulating a desktop surface -->
#
#     <div class="relative w-full max-w-5xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] bg-white">
#       <!-- NOTEBOOK: white A4 page, max 5xl wide, deep shadow -->
#
#       <!-- Ruled lines overlay (pointer-events-none, z-0) -->
#       <div style="background-image: linear-gradient(transparent 1.95rem, #94a3b8 2rem);
#                   background-size: 100% 2rem; background-position: 0 1.5rem;" />
#
#       <!-- Red margin line -->
#       <div class="absolute top-0 bottom-0 left-6 sm:left-32 w-0.5 bg-red-300 z-0" />
#
#       <!-- Content: z-10 layer, padded to clear margin line -->
#       <main class="pl-6 sm:pl-36 pr-4 sm:pr-12 relative z-10">
#         ...sections...
#       </main>
#     </div>
#   </div>
#
# KEY RULE: pl-6 sm:pl-36 clears the margin line on desktop.
#

# ---------------------------------------------------------
# SECTION 5: .notebook-text CLASS
# ---------------------------------------------------------
#
# CSS (index.html):
#   .notebook-text { line-height: 2rem; }
#
# Apply to ALL paragraph text, lists, labels.
# Snaps content to the ruled-line grid.
#

# ---------------------------------------------------------
# SECTION 6: TAPE STRIP COMPONENT (.tape-serrated)
# ---------------------------------------------------------
#
# Creates the serrated tape edge effect above polaroids and sticky notes.
#
# CSS (index.html <style> block):
#   .tape-serrated {
#     clip-path: polygon(
#       0% 0%, 100% 0%,
#       100% 10%, 96% 15%, 100% 20%, 96% 25%, 100% 30%, 96% 35%,
#       100% 40%, 96% 45%, 100% 50%, 96% 55%, 100% 60%, 96% 65%,
#       100% 70%, 96% 75%, 100% 80%, 96% 85%, 100% 90%, 96% 95%, 100% 100%,
#       0% 100%,
#       4% 95%, 0% 90%, 4% 85%, 0% 80%, 4% 75%, 0% 70%, 4% 65%,
#       0% 60%, 4% 55%, 0% 50%, 4% 45%, 0% 40%, 4% 35%, 0% 30%,
#       4% 25%, 0% 20%, 4% 15%, 0% 10%
#     );
#   }
#
# React JSX (tape strip above a card):
#   <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6
#                   bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm
#                   tape-serrated" />
#

# ---------------------------------------------------------
# SECTION 7: POLAROID IMAGE COMPONENT
# ---------------------------------------------------------
#
# Props: src, alt, rotate (default 'rotate-2'), caption?, imgHeight?
#
# TSX (defined in App.tsx, passed as prop to sub-pages):
#
#   const PolaroidImage = ({ src, alt, rotate = 'rotate-2', caption, imgHeight = "h-24 sm:h-32" }) => (
#     <div className={`relative shrink-0 z-10 group ${rotate} hover:rotate-0
#                     transition-transform duration-300 w-32 sm:w-40 mx-auto md:mx-0 cursor-pointer`}>
#       <div className="bg-white p-2 shadow-md border border-gray-200 flex flex-col">
#         <img src={src} alt={alt}
#              className={`w-full ${imgHeight} object-cover filter sepia-[.2] border border-gray-100`} />
#         {caption && (
#           <div className="font-hand text-center mt-2 text-gray-600 leading-tight text-sm pb-1">
#             {caption}
#           </div>
#         )}
#       </div>
#       <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6
#                       bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm tape-serrated" />
#     </div>
#   );
#
# Design Rules:
#   - bg-white border border-gray-200 = polaroid white border
#   - filter sepia-[.2] = vintage color shift
#   - Tape strip always centered above
#   - Default slight rotation, hover:rotate-0 straightens
#

# ---------------------------------------------------------
# SECTION 8: STICKY NOTE COMPONENT
# ---------------------------------------------------------
#
# Yellow card for callouts, awards, and floating notes.
#
# Core classes:
#   bg-amber-100  text-slate-900  p-2.5 sm:p-3.5  rounded-sm  shadow-xl
#   border-2 border-amber-300/80  font-hand  leading-tight
#   transform -rotate-6 hover:rotate-0 transition-transform duration-300
#
# Award sticky note (fixed, top-left, visible on all non-admin pages):
#
#   <div className="fixed top-10 left-1 sm:top-14 sm:left-2 md:left-3 lg:left-4
#                   z-50 transform -rotate-6 hover:rotate-0 transition-transform duration-300
#                   pointer-events-auto">
#     <div className="relative bg-amber-100 text-slate-900 p-2.5 sm:p-3.5
#                     rounded-sm shadow-xl border-2 border-amber-300/80 w-40 sm:w-52
#                     font-hand leading-tight">
#       <!-- Tape strip -->
#       <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5
#                       bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm tape-serrated" />
#       <!-- Badge -->
#       <div className="inline-flex items-center gap-1
#                       bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400
#                       text-amber-950 font-marker text-xs sm:text-sm
#                       px-2.5 py-0.5 rounded-full border border-amber-500 shadow-sm
#                       font-bold transform -rotate-1">
#         <span>trophy_emoji</span>
#         <span>#1 WORLD'S ONLY</span>
#       </div>
#       <span className="font-marker text-amber-900 text-[10px] sm:text-xs tracking-widest pl-1 mt-0.5">
#         PAPER UI PLATFORM
#       </span>
#       <p className="font-hand font-extrabold text-slate-800 text-[11px] sm:text-xs leading-snug">
#         World's only Paper UI developed & recognised under MIT licensing.
#         Created by Rajnikant Gaurav.
#       </p>
#     </div>
#   </div>
#

# ---------------------------------------------------------
# SECTION 9: WAVY UNDERLINE NAVIGATION
# ---------------------------------------------------------
#
# Nav links on hover use wavy pen-drawn underline:
#   hover:text-blue-500  hover:underline  decoration-2  decoration-wavy
#   decoration-blue-400  underline-offset-4  transition-all  cursor-pointer
#
# "Fund Me" variant (gold):
#   hover:text-yellow-700  decoration-wavy  decoration-yellow-400  text-yellow-800
#

# ---------------------------------------------------------
# SECTION 10: PAPER UI BUTTON STYLE
# ---------------------------------------------------------
#
# Hand-drawn uneven border-radius (never perfect rect):
#   style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
#
# Combined with:
#   font-marker  font-bold  border-[3px]
#   transform -rotate-2 hover:rotate-0 transition-all duration-300
#

# ---------------------------------------------------------
# SECTION 11: PROJECT CARD (NOTEBOOK LIST ZIGZAG)
# ---------------------------------------------------------
#
# Alternating left/right polaroid layout per project:
#
#   {projects.map((project, index) => (
#     <div className={`group flex flex-col gap-6 items-start ${
#       index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
#     }`}>
#       <!-- Polaroid side (alternates) -->
#       <div className="shrink-0" onClick={() => onProjectClick(project)}>
#         {PolaroidImage({
#           src: project.image,
#           alt: project.title,
#           rotate: index % 2 === 0 ? '-rotate-2' : 'rotate-2',
#           caption: project.title,
#           imgHeight: "h-20 sm:h-24"
#         })}
#       </div>
#       <!-- Text side -->
#       <div className={`flex-1 w-full ${index % 2 !== 0 ? 'sm:text-right' : ''}`}>
#         <div className="notebook-text text-xl leading-[2rem] hover:text-blue-600 cursor-pointer">
#           <span className="font-bold text-2xl">{index+1}. {project.title} - </span>
#           <span className="font-bold">{project.tagline}</span>
#         </div>
#         <div className="notebook-text text-xl leading-[2rem] pl-6 text-slate-700">
#           {project.subTagline}
#         </div>
#         <!-- Paper chip link buttons -->
#         <a href={project.demoLink} target="_blank"
#            className="inline-flex items-center px-2 bg-yellow-100/50 hover:bg-yellow-200
#                       text-blue-600 font-bold border border-transparent rounded
#                       transition-colors shadow-sm transform hover:-rotate-1">
#           LIVE DEMO
#         </a>
#       </div>
#     </div>
#   ))}
#

# ---------------------------------------------------------
# SECTION 12: SCROLL REVEAL ANIMATION
# ---------------------------------------------------------
#
# CSS (index.html):
#   .reveal-on-scroll {
#     opacity: 0;
#     transform: translateY(30px);
#     transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
#     will-change: opacity, transform;
#   }
#   .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
#
# JS (App.tsx useEffect, re-runs on view change):
#   const observer = new IntersectionObserver((entries) => {
#     entries.forEach(entry => {
#       if (entry.isIntersecting) entry.target.classList.add('is-visible');
#     });
#   }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
#   document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
#
# Usage: Add reveal-on-scroll to any section/card wrapper div.
#

# ---------------------------------------------------------
# SECTION 13: PAPER PLANE SCROLL-TO-TOP
# ---------------------------------------------------------
#
# State: showScrollTop (bool), isFlying (bool)
# Show after 300px scroll. Clicking triggers fly-off animation.
#
# Button position: fixed bottom-6 left-6 z-40
# Animation:
#   Flying:  -translate-y-[120vh] rotate-[-10deg] opacity-0  (duration-1000)
#   Visible:  translate-y-0 opacity-100
#   Hidden:   translate-y-32 opacity-0
#
# SVG paper plane (inline, -rotate-45, w/h 50):
#   <path d="M22 2L11 13" />
#   <path d="M22 2L15 22L11 13L2 9L22 2Z" />
#
# Hover tooltip: "Take off!" absolute below icon.
#

# ---------------------------------------------------------
# SECTION 14: PAPER POTS AI CHAT (StickyNoteChat)
# ---------------------------------------------------------
#
# File: components/StickyNoteChat.tsx
# Position: fixed bottom-6 right-6 z-50
#
# Closed button:
#   Layered yellow sticky note (shadow div + main div)
#   bg-yellow-200  text-yellow-900  font-hand  font-bold
#   "Paper Pots" label + MessageCircle icon
#
# Open panel (w-80 sm:w-96):
#   bg-yellow-200  shadow-[4px_4px_10px_rgba(0,0,0,0.2)]  rounded-sm  -rotate-1
#   Tape strip: w-32 h-8 bg-amber-900/20 tape-serrated
#   Messages (h-64 overflow-y-auto):
#     User:   bg-yellow-300 text-yellow-900 rotate-1
#     AI:     bg-white/60 text-gray-800 -rotate-1
#   Input: bg-yellow-100 border-b-2 border-yellow-400 font-hand
#
# AI: getChatResponse() from services/chatService.ts
#     Uses intents + knowledge from AdminDataContext
#

# ---------------------------------------------------------
# SECTION 15: SECTION STAR (MARGIN DECORATION)
# ---------------------------------------------------------
#
# Small yellow star in margin beside headings:
#
#   const SectionStar = () => (
#     <div className="absolute -left-8 sm:-left-20 top-2 text-yellow-500 transform -rotate-12">
#       <Star size={32} fill="currentColor" strokeWidth={2} className="drop-shadow-sm" />
#     </div>
#   );
#
# Usage: Put section in relative container, then add <SectionStar /> inside.
#

# ---------------------------------------------------------
# SECTION 16: DATA ARCHITECTURE
# ---------------------------------------------------------
#
# Static defaults:
#   data/projects.ts   - Project[] with Vite-imported screenshot images
#   data/chatData.ts   - Chat intents and knowledge base defaults
#
# Runtime (src/context/AdminDataContext.tsx):
#   - AdminDataProvider wraps the entire app
#   - loadFromStorage() does smart merge (localStorage over static defaults)
#   - useAdminData() hook: { data, setData, save }
#   - localStorage key: 'paperfolio_admin_data'
#
# Admin panel:
#   - Route: ?admin query param
#   - Auth: VITE_ADMIN_PASSWORD env var -> sessionStorage
#   - Sections: General, Projects, About, Chat, Contact, Donate/Sponsor
#   - Layout: FULL SCREEN, outside notebook wrapper
#

# ---------------------------------------------------------
# SECTION 17: DARK MODE ("BLACK PAGE")
# ---------------------------------------------------------
#
# State: isDarkMode (boolean, App.tsx useState)
# All dark classes use ternary: isDarkMode ? 'dark' : 'light'
#
# Class pairs:
#   Desk:   bg-[#0f172a]    vs  bg-[#dbeafe]
#   Page:   bg-[#1e293b]    vs  bg-white
#   Text:   text-slate-200  vs  text-slate-800
#   Lines:  #334155         vs  #94a3b8
#   Margin: bg-red-900/50   vs  bg-red-300
#
# Toggle: Moon / Sun icons (lucide-react)
# Button text: "White Page" / "Black Page"
#

# ---------------------------------------------------------
# SECTION 18: TYPOGRAPHY SCALE
# ---------------------------------------------------------
#
# All sizes snap to 2rem line-height grid (notebook-text):
#
#   Page title:       text-3xl sm:text-4xl   font-marker   uppercase  tracking-widest
#   Section heading:  text-2xl               font-bold     notebook-text
#   Project title:    text-xl sm:text-2xl    font-bold
#   Body/tagline:     text-xl                font-hand     notebook-text
#   Small labels:     text-sm                font-hand
#   Badge:            text-xs sm:text-sm     font-marker   uppercase
#

# ---------------------------------------------------------
# SECTION 19: ROTATION CONVENTIONS
# ---------------------------------------------------------
#
# Always pair with hover:rotate-0 (except tape/badge):
#
#   Sticky note:   -rotate-6   hover:rotate-0
#   Polaroid even: -rotate-2   hover:rotate-0
#   Polaroid odd:   rotate-2   hover:rotate-0
#   Theme button:  -rotate-2   hover:rotate-0
#   Badge pill:    -rotate-1   (no hover)
#   Tape strip:     rotate-1   (no hover)
#   Profile photo: -rotate-2   hover:rotate-0 (via .group)
#
# Rule: Keep rotations 1-12deg. Never exceed 15deg.
#

# ---------------------------------------------------------
# SECTION 20: AWARD BADGE PATTERN
# ---------------------------------------------------------
#
# Gradient pill with trophy:
#
#   <div className="inline-flex items-center gap-1
#                   bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400
#                   text-amber-950 font-marker text-xs sm:text-sm
#                   px-2.5 py-0.5 rounded-full border border-amber-500
#                   shadow-sm font-bold transform -rotate-1">
#     [trophy] #1 WORLD'S ONLY
#   </div>
#   <span className="font-marker text-amber-900 text-[10px] sm:text-xs tracking-widest pl-1 mt-0.5">
#     PAPER UI PLATFORM
#   </span>
#

# ---------------------------------------------------------
# SECTION 21: TECH STACK
# ---------------------------------------------------------
#
#   React 19 + TypeScript (TSX)
#   Tailwind CSS (CDN dev / Vite prod)
#   Vite (build tool)
#   Lucide React (icons)
#   Google Fonts (Patrick Hand + Permanent Marker)
#   LocalStorage (admin persistence, no backend)
#   Google Analytics GA4 (gtag.js)
#
# NO external UI component libraries.
# NO routing library (view state = single useState in App.tsx).
# ALL components hand-crafted.
#

# ---------------------------------------------------------
# SECTION 22: AI AGENT USAGE GUIDE (15 RULES)
# ---------------------------------------------------------
#
#  1. ALWAYS use font-hand or font-marker. Never system fonts.
#  2. ALWAYS apply notebook-text class to body text for line alignment.
#  3. ALWAYS add tape strip (tape-serrated) above any card/note/polaroid.
#  4. ALWAYS apply slight rotation + hover:rotate-0 to cards and images.
#  5. ALWAYS use amber/yellow palette for sticky notes and tape elements.
#  6. NEVER use perfectly rounded corners on content cards (use rounded-sm).
#  7. ALWAYS check isDarkMode prop and provide both light/dark class variants.
#  8. NEW sections need <SectionStar /> in margin (use relative container).
#  9. Project lists MUST alternate polaroid placement (zigzag left/right).
# 10. New pages MUST be gated behind view state switch in App.tsx.
# 11. Admin pages are OUTSIDE notebook wrapper - full-screen layout.
# 12. Add reveal-on-scroll to all section wrappers for scroll animations.
# 13. New projects: add to data/projects.ts + import screenshot from Screenshots/.
# 14. Footer ALWAYS: "Built with laptop & coffee. By Rajnikant Gaurav + gear icon".
# 15. The gear icon (bottom of footer) is the hidden admin panel entry point.
#

echo "PaperSkills v1.0.0 loaded. Paper UI system ready for Rajnikantg.in."
echo "World's Only Paper UI Platform - MIT Licensed - By Rajnikant Gaurav"

# EOF
