# WavePlay — Mini Music Player

A lightweight, browser-based music player built with vanilla HTML, CSS, and JavaScript. WavePlay lets you discover trending tracks and search the Deezer catalog, then stream 30-second previews directly in your browser.

**Live demo:** [https://gharbinz.github.io/Final-Project-Studio-Build-Deploy-with-AI/](https://gharbinz.github.io/Final-Project-Studio-Build-Deploy-with-AI/)

---

## Features

- **Trending tracks** — Loads top chart tracks from Deezer on startup
- **Search** — Find songs, artists, or albums by keyword
- **Playback controls** — Play, pause, skip, seek, and volume
- **Responsive UI** — Works on desktop and mobile with a modern dark theme
- **No backend required** — Static site deployable to GitHub Pages

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | HTML5, CSS3, Vanilla JavaScript     |
| API        | [Deezer API](https://developers.deezer.com/) (JSONP) |
| Deployment | GitHub Pages                        |
| AI Tools   | Cursor AI (design, code generation, documentation) |

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- No API key required — Deezer's public endpoints are used

### Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/GHARBINZ/Final-Project-Studio-Build-Deploy-with-AI.git
   cd Final-Project-Studio-Build-Deploy-with-AI
   ```

2. Serve the files with any static server, or open `index.html` directly:

   ```bash
   # Python 3
   python -m http.server 8080

   # Node.js (npx)
   npx serve .
   ```

3. Open `http://localhost:8080` in your browser.

---

## Project Structure

```
Final-Project-Studio-Build-Deploy-with-AI/
├── index.html          # App shell and layout
├── css/
│   └── styles.css      # Styling and responsive layout
├── js/
│   ├── api.js          # Deezer API client (JSONP)
│   └── app.js          # Player logic and UI
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Pages deployment
├── PROJECT_SPEC.md     # Short project specification
└── README.md           # This file
```

---

## How It Works

The Deezer API does not support CORS from browser `fetch` calls, so this app uses **JSONP** to load data. Tracks with available preview URLs are played through the HTML5 `<audio>` element.

**Endpoints used:**
- `GET /chart/0/tracks` — Trending tracks
- `GET /search?q={query}` — Search results

---

## Deployment (GitHub Pages)

Code is pushed to `main`. Enable GitHub Pages once:

### Option A — Deploy from branch (fastest)

1. Open [Repository Settings → Pages](https://github.com/GHARBINZ/Final-Project-Studio-Build-Deploy-with-AI/settings/pages)
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**
3. Select branch **`main`**, folder **`/ (root)`**, then click **Save**
4. Wait 1–2 minutes, then visit: **https://gharbinz.github.io/Final-Project-Studio-Build-Deploy-with-AI/**

### Option B — GitHub Actions (automatic on push)

1. Open [Repository Settings → Pages](https://github.com/GHARBINZ/Final-Project-Studio-Build-Deploy-with-AI/settings/pages)
2. Set **Source** to **GitHub Actions**
3. Re-run the [Deploy workflow](https://github.com/GHARBINZ/Final-Project-Studio-Build-Deploy-with-AI/actions) or push a new commit

---

## Limitations

- Only **30-second previews** are available (Deezer API restriction)
- Tracks without a `preview` URL are filtered out
- Requires an internet connection

---

## License

This project was created as a final studio assignment. Music data and previews are provided by Deezer and subject to their terms of service.

---

## Author

Built with AI-assisted development as part of **Studio: Build & Deploy with AI**.
