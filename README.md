# Developer Portfolio

A minimal, performant, and accessible personal developer portfolio built with **Next.js 16**, **TypeScript**, and **CSS Modules**. No UI frameworks — just clean code.

## Features

- **Light + Dark mode** with system preference detection and persistent toggle
- **Hero section** with background image, gradient overlay transition (bright → dark)
- **Typewriter effect** in the hero headline
- **Live "time since" timer** with milliseconds — throttled updates, pauses on hidden tab, respects `prefers-reduced-motion`
- **Code-snippet philosophy card** with terminal-style UI
- **Project cards** with status badges and filters (by status + tech stack)
- **Experience timeline** with tech chips
- **Contact form** with honeypot spam protection, rate limiting, and server-side validation
- **Scroll-reveal animations** (disabled for reduced motion)
- **Fully responsive** mobile-first layout
- **Accessible**: keyboard navigation, focus states, ARIA attributes, semantic HTML
- **SEO basics**: meta tags, Open Graph

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── app/
│   ├── api/contact/route.ts    # Contact form API with rate limiting
│   ├── imprint/page.tsx        # Legal imprint placeholder
│   ├── privacy/page.tsx        # Privacy policy placeholder
│   ├── globals.css             # Design tokens + CSS reset
│   ├── layout.tsx              # Root layout with theme script
│   └── page.tsx                # Main single-page layout
├── components/
│   ├── Header.tsx              # Sticky header with nav + mobile menu
│   ├── Hero.tsx                # Hero with BG image + typewriter
│   ├── ThemeToggle.tsx         # Light/dark mode toggle
│   ├── ThemeScript.tsx         # Inline script to prevent theme flash
│   ├── Section.tsx             # Reusable section wrapper + scroll reveal
│   ├── Snapshot.tsx            # Quick-facts card grid
│   ├── Timer.tsx               # Live coding timer
│   ├── ExperienceItem.tsx      # Timeline item component
│   ├── Philosophy.tsx          # Code card component
│   ├── ProjectCard.tsx         # Project card component
│   ├── ProjectFilter.tsx       # Filter chips for projects
│   ├── ProjectsSection.tsx     # Projects grid + filter state
│   ├── ContactForm.tsx         # Contact form with honeypot
│   └── Footer.tsx              # Footer with legal links
├── content/
│   ├── experience.json         # Experience data — edit here
│   └── projects.json           # Project data — edit here
└── public/
    └── images/
        └── hero-bg.png         # Hero background image — replace here
```

## Where to Edit Content

### Personal info
- **Name & headline**: `components/Hero.tsx` — update the `<h1>` and description
- **Snapshot cards**: `components/Snapshot.tsx` — update the `CARDS` array
- **Timer start date**: `components/Timer.tsx` — change `START_DATE`
- **Philosophy code**: `components/Philosophy.tsx`
- **Footer name**: `components/Footer.tsx`
- **SEO metadata**: `app/layout.tsx`

### Experience & Projects
- **Experience**: `content/experience.json` — add/edit roles, bullets, tech
- **Projects**: `content/projects.json` — add/edit projects, statuses, links

### Assets to Replace
- **Hero background**: Replace `public/images/hero-bg.png` with your own image (recommended: 1920×1080+)
- **CV download**: Place your CV PDF at `public/cv.pdf`
- **Favicon**: Replace `app/favicon.ico`
- **GitHub link**: Update URL in `components/Header.tsx`

### Email Integration
The contact form API at `app/api/contact/route.ts` includes detailed comments showing how to integrate an email provider (e.g., Resend, SendGrid). Currently it logs submissions to the console.

### Legal Pages
Update `app/imprint/page.tsx` and `app/privacy/page.tsx` with your actual legal content.

## Tech Stack

- [Next.js 16](https://nextjs.org/) with App Router
- TypeScript
- CSS Modules + CSS custom properties (design tokens)
- System fonts (no web font downloads)
- Zero external UI dependencies

## License

MIT
