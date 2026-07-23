# Perpetual Bad Trip — Official Website

An Awwwards-inspired, interactive, dark-cinematic web experience for **Perpetual Bad Trip**, an alternative rock band based in Kolkata blending Hindi rock, Bollywood rock, and English alternative into loud, emotional live performances.

---

## 🎨 Theme & Aesthetic References
- **Aesthetic**: Shoegaze, Grunge, Dark, Minimal, Experimental.
- **Inspirations**: Deftones, Nine Inch Nails, Radiohead (*Kid A* era), Slowdive, Fleshwater, Apple UI precision.
- **Color Palette**:
  - **Black**: `#090909`
  - **Dark Red**: `#7B0000`
  - **Crimson Glow**: `#900000` / `#FF1A1A`
  - **White**: `#F4F4F4`

---

## 🚀 Technical Highlights
- **Framework-free**: Built with pure HTML5, Vanilla CSS, Vanilla JavaScript.
- **Smooth Scroll**: Powered by Lenis smooth scroll engine.
- **Animations**: GSAP ScrollTrigger timeline reveals, mask skew transforms, kinetic typography word scrub.
- **Interactive Loading Intro**: Blackout entrance ("ENTER THE TRIP") with dark red glitch transition and audio unlocking.
- **Custom Cursor**: Glowing magnetic stretch cursor reacting to velocity vector and magnetizing to interactive elements.
- **Web Audio API**: Built-in dark shoegaze atmospheric drone synthesizer and subtle click sound effects with mute/unmute control.
- **Band Member Cards**: Canvas displacement slice distortion on hover for all 6 members.
- **Live Gallery**: High-performance gallery with 40+ photos directly extracted from the band's Google Drive and a blurred full-screen Lightbox modal.
- **Easter Egg**: Secret Konami Code (`↑ ↑ ↓ ↓ ← → ← → B A`) listener triggering full cyber-glitch chaos mode.
- **SEO & Manifest**: Includes complete OpenGraph, Twitter card metadata, favicon.svg, robots.txt, sitemap.xml, site.webmanifest, and custom 404 page.

---

## 📂 Project Structure

```
.
├── index.html              # Main experience page
├── 404.html                # Custom 404 page ("You got lost on the trip.")
├── robots.txt              # Search engine robots configuration
├── sitemap.xml             # Search engine sitemap
├── site.webmanifest        # PWA Web Manifest
├── favicon.svg             # Vector favicon logo
├── README.md               # Documentation & setup guide
└── assets/
    ├── css/
    │   ├── style.css       # Design tokens, variables, typography, resets
    │   ├── components.css  # Hero, About, Gallery, Lightbox, Members, Booking, Footer
    │   ├── animations.css  # Keyframes, glitch effects, Konami mode CSS
    │   └── mobile.css      # Mobile & tablet responsive media queries
    ├── js/
    │   ├── app.js          # App orchestrator, Lenis scroll, GSAP triggers
    │   ├── cursor.js       # Magnetic glowing velocity-stretching cursor
    │   ├── background.js   # HTML5 dust particle canvas & spotlight
    │   ├── gallery.js      # Gallery grid & full keyboard Lightbox modal
    │   ├── audio.js        # Web Audio API shoegaze synth soundscape
    │   ├── glitch.js       # Glitch screen flash & Konami code easter egg
    │   └── member-hover.js # Canvas slice distortion for member portraits
    └── images/
        ├── band_live_*.jpg # Live performance photos from Google Drive
        └── members/        # Band member portrait photos
```

---

## 🎸 Band Members
1. **Shagnik Dutta** — Drums
2. **Abhimanyu Dhar** — Guitar / Vocals
3. **Debjit Biswas** — Bass
4. **Debarghya Chanda** — Vocals
5. **Debargha Chowdhury** — Guitar
6. **Ayan Sylvester Gomes** — Keyboard

---

## 🌐 Deploying to GitHub Pages

1. **Initialize Git repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Perpetual Bad Trip experience"
   ```

2. **Create GitHub repository named `perpetualbadtrip`**:
   - Go to GitHub -> New Repository -> Name: `perpetualbadtrip`
   - Link remote and push:
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/perpetualbadtrip.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to Repository Settings -> **Pages**.
   - Under **Source**, select `Deploy from a branch` -> `main` -> `/ (root)`.
   - Click **Save**. The website will be live in seconds at `https://<YOUR-USERNAME>.github.io/perpetualbadtrip/`.
