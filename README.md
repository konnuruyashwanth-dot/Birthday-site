# 🌸 A Birthday Website

A handcrafted single-page birthday site — React + Vite + Tailwind + Framer Motion.

## ✏️ Before you deploy — set the names
Open **`src/config.js`** and set:
- `HER_NAME` — the birthday girl's name (shows in the hero + finale)
- `YOUR_NAME` — your name / sign-off (shows in the cake message)
- `AGE` — the age she's turning (default 21)

## ▶️ Run locally
```bash
npm install
npm run dev
```

## 📦 Build for production
```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

## 🚀 Deploy
Deploy the **`dist/`** folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
- Netlify/Vercel/Cloudflare: build command `npm run build`, publish directory `dist`.
- The video lives in **`public/montage.mp4`** and the song in `src/assets/our-song.mp3`.

## 🗂️ Personal assets
Photos, the letter paper, flowers and label live in the parent folder and are imported by the
sections. Swap them there (keep the same filenames) to update the site.

## 🎞️ The flow
Preloader → Hero → Letter → Gallery → 21 Reasons → 21 Tiny Letters → Our Memories (video) → Make-a-Wish 🎂
