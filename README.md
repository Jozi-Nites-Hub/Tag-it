# TAGit 🍍 — Tag It. Own Your Content.

![TAGit Logo](./public/logo.png)

> Property of **Jozi Nites (Pty) Ltd** — All Rights Reserved

**Live:** [https://tag-it-sigma.vercel.app](https://tag-it-sigma.vercel.app)  
**Studio:** [https://tag-it-sigma.vercel.app/studio](https://tag-it-sigma.vercel.app/studio)

---

### What is TAGit?

**TAGit** is a free, privacy-first, browser-based watermark studio.  
Upload your logo (or enter a text watermark) + any single image or batch of images, pick a style preset, tweak size / opacity / rotation, and download individually or export as a ZIP — ready to share.

It's never been easier to watermark or tag your content before you share it.

**100% Free · No sign-up · Files stay in your browser**

---

### How it works

1. **Upload Logo or Text Watermark** — PNG, SVG, WebP, JPG or type custom text handle
2. **Upload Media (Single or Batch)** — Drop individual images or multiple files for batch processing
3. **Position & Quick Presets** — 9-point grid, free canvas drag, and 1-click presets (Corner Badge, Center Stamp, Subtle Overlay, Diagonal Tile)
4. **Live Preview** — Real-time canvas preview with batch queue navigation
5. **Download / ZIP Export** — Get your tagged image or export all watermarked media as a ZIP archive instantly

---

### Features

- **Drag & drop upload zones** with strict MIME validation & size limit protection (25MB cap)
- **Batch Processing & ZIP Export** — Upload multiple images and download all watermarked files in a single `.zip`
- **Logo AI Background Removal** — Integrated client-side background remover (`@imgly/background-removal`)
- **Text Watermark Support** — Add custom text handle (e.g. `@jozinites`), choose font size & color
- **Quick Style Presets** — Corner Badge, Center Stamp, Subtle Overlay, Diagonal Tile
- **Export Controls** — Export as PNG, JPEG, or WebP with configurable compression quality
- **Mobile PWA Support** — Installable Web App Manifest (`manifest.json`)
- **Security & Privacy First** — HTTP Security Headers, Content Security Policy, and zero server upload (all files stay in local browser memory)
- **Performance Monitoring** — Vercel Speed Insights integration for Core Web Vitals tracking
- **Dark neon Jozi-inspired design**

---

### Security & Governance

- **Repository Security Configs:** Includes `.gitignore` protecting build artifacts and environment variables.
- **Security Policy (`SECURITY.md`):** Formal vulnerability disclosure process.
- **Dependency Hardening:** Updated Next.js framework dependencies (`^14.2.35`) to remediate known security advisories.
- **HTTP Security Headers:** Configured HSTS, CSP, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy headers.
- **Performance Monitoring:** Vercel Speed Insights for continuous Core Web Vitals tracking in production.

---

### Tech Stack

- Next.js 14 (App Router)
- TypeScript & React 18
- Tailwind CSS
- HTML Canvas API
- JSZip (Batch Archiving)
- @imgly/background-removal (AI transparent logo processing)
- @vercel/speed-insights (Performance monitoring)
- Vercel (Deployment & Edge Functions)

---

### Progress

- [x] Project scaffolded
- [x] Studio live at `/studio`
- [x] Branding locked (yellow + green pineapple style)
- [x] 3D logo
- [x] Vercel deployment live (`tag-it-sigma`)
- [x] Security Policy (`SECURITY.md`), security headers & file validation
- [x] Batch processing & ZIP download
- [x] Mobile PWA support (`app/manifest.ts`)
- [x] Vercel Speed Insights integration
- [ ] Auth / user accounts (optional)
- [ ] Save projects / history
- [ ] Video watermark support

**Current Version:** `v0.3.0` — Batch & Security Hardened Phase

---

### Local Development

```bash
git clone https://github.com/Jozi-Nites-Hub/Tag-it.git
cd Tag-it
npm install
npm run dev
```

#### Development Commands

- `npm run dev` — Start Next.js dev server (http://localhost:3000)
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint

#### Environment Setup

No environment variables required for local development. All file processing happens client-side in the browser.

**Vercel deployment:** Speed Insights data will be automatically collected on Vercel deployments.

---

### Project Structure

```
Tag-it/
├── app/
│   ├── layout.tsx          Root layout with SpeedInsights
│   ├── page.tsx            Home page (marketing)
│   ├── studio/             Watermark studio routes
│   └── globals.css         Global styles
├── components/             React components (UI, Canvas, Upload)
├── lib/                    Utilities (canvas helpers, file validation)
├── public/                 Static assets (images, favicon, manifest)
├── package.json            Dependencies & scripts
├── tsconfig.json           TypeScript configuration
├── next.config.js          Next.js build & security config
├── vercel.json             Vercel deployment & edge headers
└── tailwind.config.ts      Tailwind CSS theme
```

---

### Deployment

The project is deployed to **Vercel** at https://tag-it-sigma.vercel.app

- **Static Export:** Configured as `output: "export"` for static site generation
- **Edge Security Headers:** Applied via `vercel.json` for Vercel Edge Network
- **Performance Monitoring:** Core Web Vitals tracked via Speed Insights dashboard
- **GitHub Pages:** Fallback deployment available via GitHub Actions

---

### Contributing

Security issues should be reported via the [SECURITY.md](./SECURITY.md) vulnerability disclosure process.

For feature requests or bug reports, create an issue on the [GitHub repository](https://github.com/Jozi-Nites-Hub/Tag-it/issues).

---

**Made with 🍍 by Jozi Nites (Pty) Ltd**
