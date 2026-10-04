# Beti ❤️ – Romantic & Inspirational Web Page

![Demo Screenshot](assets/bg.gif)

## ✨ Overview
A **dark‑to‑light, elegant, mobile‑friendly** single‑page web experience dedicated to **Beti (Beatriz)**.  It combines:
- A **sakura‑petal background** (`bg.gif`) with a subtle animated canvas.
- A **rotating‑orbit heart** where the word **"BETI"** continuously follows the parametric heart curve.
- Central **"Te quiero mucho calvita"** text with a CSS heartbeat animation.
- A **glass‑morphism card** that displays a **typewriter‑style supportive message** that includes a halal‑friendly reference to Allah.
- Background **MP3 music** that starts after a user tap (required by browsers).
- Fully **responsive** layout, CSS variables for easy theming, and performance‑optimized canvases.

---

## 📁 Project Structure
```
project_root/
├─ index.html          # entry point (HTML markup)
├─ css/
│   └─ styles.css      # all styling, variables and animations
├─ js/
│   ├─ background.js   # falling sakura petals canvas
│   ├─ heart.js        # orbiting‑letter heart animation (uses CSS vars)
│   ├─ effects.js      # extra emoji effects (optional)
│   ├─ main.js         # orchestration, overlay handling
│   └─ typewriter.js   # typewriter effect with halal supportive text
├─ assets/
│   ├─ bg.gif          # background GIF (cherry‑blossom theme)
│   └─ song.mp3        # background music (your provided track)
└─ README.md           # **this file**
```

---

## 🚀 Getting Started
1. **Clone / download** the repository.
2. Open `index.html` in a modern browser (Chrome, Edge, Firefox, Safari).  No build step is required.
3. Click the **"Toca para tu sorpresa 🌸"** button to allow the music to play and reveal the animation.

> The page works offline – all assets are stored locally.

---

## 🎨 Customisation
- **Colors** – edit the CSS variables in `css/styles.css`:
  ```css
  :root {
    --primary-pink: #d81b60;   /* neon pink */
    --secondary-pink: #c2185b; /* dark rose */
    --glass-bg: rgba(255,255,255,0.55);
    --glass-border: rgba(255,255,255,0.8);
  }
  ```
- **Message** – change the `MESSAGE` constant in `js/typewriter.js`.
- **Background** – replace `assets/bg.gif` with any GIF you prefer; the CSS will automatically use it.
- **Music** – swap `assets/song.mp3` for another track (keep the same filename or update the `<source>` tag in `index.html`).

---

## 📱 Mobile Optimisation
- Canvas particle count is reduced on screens narrower than 600 px.
- Font sizes use `clamp()` for fluid scaling.
- All scroll bars are disabled (`overflow:hidden`).
- Touch interaction triggers the audio safely.

---

## 🛠️ Development Notes
- The heart animation uses the classic parametric equation:
  ```js
  x = 16 * sin³(t);
  y = 13*cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t);
  ```
- Colors for the orbiting letters are derived from CSS variables via the helper `getCssColor()` in `heart.js`.
- The typewriter effect highlights key words (including **Allah**) with a soft pink glow.
- All canvases share a single `requestAnimationFrame` loop defined in `js/main.js` for optimal FPS.

---

## 📜 License
Feel free to use, modify, and share this project for personal or educational purposes.  If you publish it publicly, a mention of the original author is appreciated.

---

## 🙏 Acknowledgements
- **Google Fonts** – `Dancing Script` & `Poppins`.
- **Sakura petal simulation** – adapted from open‑source canvas particle examples.
- **Heart parametric formula** – classic mathematical heart curve.
- **Halal‑friendly wording** – the supportive message was crafted to include a respectful reference to Allah.

---

**Enjoy the page and share the love!**
