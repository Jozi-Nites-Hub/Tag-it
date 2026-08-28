# TAGit 🍍 — Tag It. Find It. Jozi Nites.

![TAGit Logo](./public/tagit-3d-logo.png)

> Property of **Jozi Nites (Pty) Ltd** — All Rights Reserved

Live: [https://tag-it-sigma.vercel.app](https://tag-it-sigma.vercel.app)
Studio: [https://tag-it-sigma.vercel.app/studio](https://tag-it-sigma.vercel.app/studio)

### Project Description
**TAGit** is a location-based discovery platform built by Jozi Nites Hub. Users can TAG locations, products, and experiences across Jozi and let others find them instantly. Built for nightlife, retail, and lifestyle discovery.

The core idea: **TA** — you tag it, **Git** — they get it. Yellow pineapple block represents Jozi gold + tropical energy. Green leaves = growth + location pin.

### Function / Features
- **Tag Creation** — Users create tags with image, location, category, description
- **Discovery Feed** — Real-time feed of tags near you
- **Sanity CMS Studio** — Embedded at `/studio` for content management (products, tags, categories)
- **Vercel Deployment** — Fast edge deployment with auto-redeploy from GitHub
- **Search & Filter** — By tag, location, category
- **Responsive UI** — Mobile-first, built with Next.js + Tailwind

Tech Stack:
- Next.js 14 / App Router
- Sanity.io v3 (CMS)
- Tailwind CSS
- Vercel
- TypeScript

### Progress
- [x] Project scaffolded (Next.js + Sanity)
- [x] Studio deployed at `/studio`
- [x] Branding locked — TA (yellow) + Git (white G + green it) + pineapple crown
- [x] 3D logo rendered (glossy, TA style matched)
- [x] Vercel deployment live: `tag-it-sigma`
- [ ] Auth & user accounts
- [ ] Tag creation API + Sanity schema finalization
- [ ] Map integration (Google Maps / Mapbox)
- [ ] Discovery feed + search
- [ ] Admin moderation panel
- [ ] Mobile PWA build

Current Version: `v0.2.0-beta` — Studio + Branding Phase

### Installation
```bash
git clone https://github.com/Jozi-Nites-Hub/Tag-it.git
cd Tag-it
npm install
# set env vars in.env.local
npm run dev
