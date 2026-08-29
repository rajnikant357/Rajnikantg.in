# 🎨 Paperfolio — UI & Design Language Rules (agents.md)

> This file documents the visual identity, design tokens, and UI component rules for the `rajnikantg.in` portfolio project ("Paperfolio"). All agents and contributors MUST follow these rules to maintain a consistent aesthetic.

---

## 🎭 Design Philosophy: "The Notebook"

The UI simulates a **physical lined-paper notebook** placed on a blue desk. Every component should feel **handwritten, tactile, and nostalgic** — like a student's personal diary brought to life on screen.

**Core Tenets:**
- **Handcrafted**: Nothing should look "perfectly digital". Slight rotations, wobbles, and imperfections are intentional.
- **Ink on Paper**: Text should feel like it's written with a pen on ruled lines.
- **Physical Metaphors**: Photos are "taped" with masking tape. Sections use sticky notes, polaroids, and hand-drawn stars.
- **Playful but Professional**: The aesthetic is fun and memorable without sacrificing clarity.

---

## 🎨 Color Palette

### Light Mode ("White Page")
| Role | Value | Usage |
|------|-------|-------|
| Background (desk) | `#dbeafe` (blue-100) | Page outer background |
| Paper (notebook) | `#ffffff` | Main notebook card |
| Paper lines | `#94a3b8` (slate-400) | Horizontal notebook lines |
| Margin line | `#fca5a5` (red-200/300) | Left margin red stripe |
| Primary text | `#1e293b` (slate-800) | Body text on paper |
| Nav text | `#0f172a` (slate-900) | Navigation links |
| Blue accent | `#3b82f6` (blue-500) | Interactive highlights, links |
| Yellow accent | `#fef08a` (yellow-200) | Sticky note, CTA backgrounds |
| Pink accent | `#fbcfe8` (pink-200) | Sponsor button |
| Purple accent | `#a855f7` (purple-500) | Resume doodle |

### Dark Mode ("Black Page")
| Role | Value | Usage |
|------|-------|-------|
| Background (desk) | `#0f172a` (slate-950) | Page outer background |
| Paper (notebook) | `#1e293b` (slate-800) | Main notebook card |
| Paper lines | `#334155` (slate-700) | Horizontal notebook lines |
| Margin line | `#7f1d1d` (red-900/50) | Left margin red stripe |
| Primary text | `#e2e8f0` (slate-200) | Body text on paper |

---

## 🔤 Typography

| Token | Font | Class |
|-------|------|-------|
| Handwritten body | Patrick Hand | `font-hand` |
| Display / Title | Permanent Marker | `font-marker` |

**Rules:**
- ALL body text uses `font-hand` (Patrick Hand). No system fonts.
- Section titles and big display text use `font-marker` (Permanent Marker).
- Text must align to `2rem` line height to sit on notebook lines: use `notebook-text` class (`line-height: 2rem`).
- `text-xl` or larger for body paragraphs. `text-2xl` for section headers.

---

## 📐 Layout

### Notebook Card
```
max-w-5xl, centered
shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]
min-h-[95vh], flex-column
```

### Notebook Lines (CSS background)
```css
background-image: linear-gradient(transparent 1.95rem, #94a3b8 2rem);
background-size: 100% 2rem;
background-position: 0 1.5rem;
```

### Left Margin Red Line
```
absolute, left-6 (mobile) / left-32 (desktop)
w-0.5, full height
bg-red-300 (light) / bg-red-900/50 (dark)
```

### Content Padding
- Left padding: `pl-6 sm:pl-36` (leaves space for margin + binding)
- Right padding: `pr-4 sm:pr-12`

---

## 🧩 Components

### Polaroid Image
- White border `bg-white p-2 shadow-md border border-gray-200`
- Slight rotation: `rotate-2` or `-rotate-2` (alternating)
- Tape strip on top: `.tape-serrated` with amber/brown tint
- Caption uses `font-hand`, small, gray
- Hover → `hover:rotate-0 transition-transform duration-300`
- Width: `w-32 sm:w-40`

### Tape / Masking Tape Strip
```css
/* Custom clip-path for jagged tape edges */
.tape-serrated { clip-path: polygon(...) }
bg-amber-900/20 rotate-1 backdrop-blur-sm drop-shadow-sm
```

### Section Star (Margin Decoration)
- Lucide `<Star>` icon, `size={32}`, `fill="currentColor"`
- Color: `text-yellow-500`
- Absolute positioned at `-left-8 sm:-left-20 top-2`
- Rotated `-rotate-12`

### Navigation Links
```
font-hand font-bold text-2xl tracking-wide
hover:text-blue-500 hover:underline
decoration-2 decoration-wavy decoration-blue-400
underline-offset-4 transition-all
```

### Back Button
```
group flex items-center gap-2 text-xl font-bold
hover:text-blue-500 transition-colors
ArrowLeft icon: group-hover:-translate-x-1 transition-transform
```

### Section Headers
```
notebook-text text-2xl font-bold mb-2 leading-[2rem]
```
For sub-pages: Use `font-marker text-4xl sm:text-5xl text-blue-600` for main title.

### Buttons
```
/* Primary CTA */
bg-yellow-300 hover:bg-yellow-400 text-yellow-900
px-6 py-2 rounded-sm shadow-md border border-yellow-500
transform hover:-rotate-1 transition-all font-bold text-xl

/* Secondary CTA */
bg-pink-300 hover:bg-pink-400 text-pink-900
transform hover:rotate-1 transition-all

/* Ghost / Text Button */
font-bold hover:underline decoration-wavy transition-all
```
Buttons should have slight rotation on hover (`hover:-rotate-1` or `hover:rotate-1`).

### Theme Toggle Button
```
style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
font-marker font-bold px-4 py-2 border-[3px] transform -rotate-2 hover:rotate-0
```

### Tags / Tech Stack Pills
```
bg-blue-100 text-blue-800 (light) / bg-blue-900/40 text-blue-300 (dark)
px-3 py-1 rounded-sm text-sm font-bold
```

---

## ✨ Animation

### Scroll Reveal
```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```
Apply `reveal-on-scroll` class to all major sections. Use IntersectionObserver to add `is-visible` on scroll.

### Page Transitions
Use Tailwind's animate-in: `animate-in fade-in slide-in-from-bottom-4 duration-500` on page container.

### Hover Micro-interactions
- Polaroids: `hover:rotate-0 transition-transform duration-300`
- Nav links: wavy underline appear
- Buttons: slight rotation shift
- Icons: `-translate-x-1` or `-translate-y-2`

---

## 🚫 Anti-patterns

- ❌ No rounded corners (use `rounded-sm` at most, or none)
- ❌ No gradients on the paper itself (only for background desk)
- ❌ No sans-serif body fonts (must be Patrick Hand)
- ❌ No perfect alignment — slight rotation/skew is the design
- ❌ No flat color boxes without texture or shadow
- ❌ Don't use `rounded-full` pills for main buttons
- ❌ No dark overlays or modal backdrops (use inline UI instead)

---

## 🏗️ Admin Panel Specific Rules

The admin panel lives at `/admin` route and follows the same notebook aesthetic with these **additional conventions**:

### Admin Layout
- Same outer wrapper: `bg-[#dbeafe] dark:bg-[#0f172a]` desk
- Same inner notebook card: `bg-white dark:bg-[#1e293b]` with notebook lines
- Left sidebar navigation styled like notebook tab/bookmark strip
- Sidebar tabs: notebook tab style with slight elevation on active

### Admin Form Fields
```
/* Input fields styled as underlined notebook lines */
bg-transparent border-0 border-b-2 border-slate-300
focus:border-blue-500 outline-none
font-hand text-xl w-full px-1 py-0.5
placeholder:text-slate-400 placeholder:italic
```

### Admin Action Buttons (Save/Delete/Add)
```
/* Save */
bg-green-200 hover:bg-green-300 text-green-900
border border-green-400 px-4 py-1 font-bold
transform hover:-rotate-1 transition-all

/* Delete */
bg-red-200 hover:bg-red-300 text-red-900
border border-red-400 px-4 py-1 font-bold
transform hover:rotate-1 transition-all

/* Add New */
bg-blue-200 hover:bg-blue-300 text-blue-900
border border-blue-400 px-4 py-1 font-bold
transform hover:-rotate-1 transition-all
```

### Admin Status Indicators (Sticky Note Style)
- Success: `bg-green-100 border-l-4 border-green-500 p-3 font-hand`
- Error: `bg-red-100 border-l-4 border-red-500 p-3 font-hand`
- Info: `bg-yellow-100 border-l-4 border-yellow-400 p-3 font-hand`

### Admin Section Cards
```
border-2 border-dashed border-slate-300
hover:border-blue-400 transition-colors
p-4 bg-white/50 dark:bg-slate-700/30
```

---

## 📁 File Structure Convention

```
src/
  pages/
    admin/
      AdminPage.tsx               # Main admin shell + sidebar + auth gate
      admin-sections/
        AdminProjects.tsx         # Projects CRUD
        AdminAbout.tsx            # About/Bio editor
        AdminChat.tsx             # Chat intents & knowledge editor
        AdminContact.tsx          # Contact info editor
        AdminDonate.tsx           # Donate tiers editor
        AdminGeneral.tsx          # General settings (name, tagline, links)
```

### Auth Gate
- Simple password-based gate stored in `localStorage`
- Admin password set via environment variable `VITE_ADMIN_PASSWORD`
- No backend required for the gate — pure client-side for simplicity
- Login form styled as a notebook entry: "Password: _______"

