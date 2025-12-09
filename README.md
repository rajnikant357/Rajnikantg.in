# Rajnikant Gaurav — Notebookfolio

Welcome — this repository contains my personal portfolio site `Notebookfolio`. The site showcases my projects, thinking, and ways you can support the work (donations, sponsorships, and collaborations).

This README is written as a living document: it describes who I am, my startup journey, the code in this repo, how to run it locally, and ways to get in touch.

**Quick links**

- Live site: (your site URL here)
- Email: `rajnikantg357@gmail.com`
- GitHub: `https://github.com/rajnikant357`
- LinkedIn: `https://www.linkedin.com/in/rajnikant-gaurav-5b70112a2/`

---

## About Me

I'm Rajnikant Gaurav — a Senior Frontend Engineer and Creative Developer who builds delightful, usable web experiences. I focus on React, TypeScript, and carefully-crafted UI work. I enjoy combining product thinking with polish — turning ideas into well-designed front-end applications.

Tech I use regularly:

- React + TypeScript
- Vite (build tooling)
- Tailwind CSS (utility-first styling)
- Node/Express for small backends (email / API endpoints)
- Familiar with integrating generative APIs

This repository is my public portfolio and a place where I experiment with UI patterns and small product ideas.

---

## My Startup Journey (short story)

My journey is a mix of curiosity, rapid prototyping, and learning through building. I began by shipping small ideas — playgrounds and utilities that solved narrow problems. Over time, those experiments grew into bigger projects and product-minded prototypes.

Highlights and approach:

- Idea → Prototype: I validate quickly by building a clickable prototype or minimal web app. This helps me learn whether users care and identify the riskiest assumptions.
- MVP & Iterate: For the ideas that show promise, I build an MVP, focus on core user flows, then iterate based on feedback.
- Efficient stack: I lean on a lightweight stack (React + Vite + TypeScript) to move quickly while keeping code quality high.
- Community & feedback: I use GitHub, small beta releases, and direct outreach to collect feedback and shape the product.

Lessons learned:

- Ship fast, but polish the experience. Early feedback is valuable — a tiny number of real users reveals the biggest problems.
- Scope ruthlessly. Every feature added increases complexity and slows iteration.
- Build for people, not awards. Frequent small wins and satisfied users beat big-but-delayed launches.

If you want the full timeline (milestones, funding attempts, launches), tell me what format you prefer and I’ll expand this section with specific dates and milestones.

---

## What’s in this repository

This repo powers the `Notebookfolio` portfolio site. Notable files and folders:

- `App.tsx` — central app component and routing between the pages.
- `index.tsx`, `index.html`, `vite.config.ts`, `tsconfig.json` — project configuration and entry.
- `src/pages/` — extracted page components (Notebook, About, Projects list, Project detail, Donate, Sponsor).
- `src/components/` — smaller shared components (e.g., `StickyNoteChat`).
- `src/data/projects.ts` — data used to populate project cards on the site.
- `server/` — small Express server used for email sending (Nodemailer) and related endpoints.

Features implemented in the site:

- Polished portfolio UI with project detail views.
- Donation & sponsor flows (tiered UPI QR and sponsor contact form).
- Contact & resume links.

---

## Run locally

Prerequisites:

- Node.js (16+ recommended)
- npm (or use `pnpm`/`yarn` if you prefer)

Install and run:

```powershell
npm install
npm run dev
```

Build for production:

```powershell
npm run build
```

Notes:

- The project uses Vite; if you see a message about `/index.css` at build time, it may be resolved at runtime depending on your hosting setup.
- There is a small Express server used to handle partner email submissions — see the `server/` folder and `.env` for configuration.

---

## Projects & demos

The `src/data/projects.ts` file lists my projects with metadata (title, tagline, images, links). The site shows a curated selection on the home page and a full list under “Projects”. Feel free to open or modify the data file to add/update projects.

---

## How to contribute or collaborate

If you want to collaborate, sponsor, or hire me for work:

- Email: `rajnikantg357@gmail.com`
- GitHub: `https://github.com/rajnikant357`

If you found an issue in this repo or want to suggest an improvement, please open an issue or a pull request.

---

## Sponsor / Donate

Donation and sponsor flows are included on the site (a few UPI QR images and a sponsor contact form). If you'd like to support the work:

- Use the Donate section on the live site to scan the UPI QR code.
- Use the Sponsor form to send partnership requests — the site uses a backend endpoint to forward messages.

---

## Contact

- Email: `rajnikantg357@gmail.com`
- Phone: `+91 7084202503`
- GitHub: `https://github.com/rajnikant357`

If you'd like, I can create a short public timeline (with dates), or expand the startup story into separate sections (Idea, Prototype, Launch, Growth, Current). Tell me which format you prefer and I’ll update this README.

---

## License

This repository is available under the MIT License. Replace or update this section if you need a different license.

---

_Last updated: December 2025_
