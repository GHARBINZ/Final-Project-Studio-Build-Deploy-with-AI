# WavePlay React

A React introduction checkpoint for **Studio: Build & Deploy with AI**. WavePlay React is the first React version of the WavePlay music player concept — a landing page built with Create React App and React Bootstrap.

**Live demo:** [https://gharbinz.github.io/Final-Project-Studio-Build-Deploy-with-AI/](https://gharbinz.github.io/Final-Project-Studio-Build-Deploy-with-AI/)

**Repository:** [https://github.com/GHARBINZ/Final-Project-Studio-Build-Deploy-with-AI](https://github.com/GHARBINZ/Final-Project-Studio-Build-Deploy-with-AI)

---

## Features

- **React Bootstrap navbar** — Responsive navigation with brand and links
- **Feature cards** — Three cards highlighting Trending, Search, and Preview playback
- **Bootstrap styling** — Clean, mobile-friendly layout out of the box
- **GitHub Pages deployment** — Automated build and deploy via GitHub Actions

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | React 19 (Create React App)         |
| UI Library   | React Bootstrap 2, Bootstrap 5      |
| Deployment   | GitHub Pages + GitHub Actions       |
| AI Tools     | Cursor AI (scaffolding, docs, deploy) |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (included with Node.js)

### Run Locally

```bash
cd waveplay-react
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The optimized static files are written to the `build/` folder.

---

## Project Structure

```
waveplay-react/
├── public/
│   └── index.html       # HTML shell
├── src/
│   ├── App.js           # Main App component (navbar, heading, cards)
│   ├── index.js         # React entry point
│   └── reportWebVitals.js
├── package.json
├── PROJECT_SPEC.md      # Short project specification
└── README.md            # This file
```

---

## Deployment (GitHub Pages)

Pushing to `main` triggers the GitHub Actions workflow, which:

1. Installs dependencies in `waveplay-react/`
2. Runs `npm run build`
3. Deploys the `build/` output to GitHub Pages

Ensure **Settings → Pages → Source** is set to **GitHub Actions**.

---

## AI Tools Used

- **Cursor AI** — React app scaffolding, React Bootstrap integration, README/spec authoring, and deployment workflow setup

---

## Author

Built as part of **Studio: Build & Deploy with AI**.
