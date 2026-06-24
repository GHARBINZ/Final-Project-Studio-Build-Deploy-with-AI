# WavePlay — Studio: Build & Deploy with AI

This repository contains the WavePlay music player project for **Studio: Build & Deploy with AI**.

**Live demo (React app):** [https://gharbinz.github.io/Final-Project-Studio-Build-Deploy-with-AI/](https://gharbinz.github.io/Final-Project-Studio-Build-Deploy-with-AI/)

---

## Projects

| Folder | Description | Status |
|--------|-------------|--------|
| [`waveplay-react/`](waveplay-react/) | React checkpoint — navbar, heading, and cards with React Bootstrap | Deployed to GitHub Pages |
| Root (`index.html`, `js/`, `css/`) | Original vanilla JS music player with Deezer API | Local / legacy |

See [`waveplay-react/README.md`](waveplay-react/README.md) and [`waveplay-react/PROJECT_SPEC.md`](waveplay-react/PROJECT_SPEC.md) for the React checkpoint documentation.

---

## Quick Start (React App)

```bash
cd waveplay-react
npm install
npm start
```

---

## Deployment

Pushes to `main` trigger GitHub Actions to build `waveplay-react` and deploy to GitHub Pages.

**One-time setup** — open [Repository Settings → Pages](https://github.com/GHARBINZ/Final-Project-Studio-Build-Deploy-with-AI/settings/pages) and choose one:

- **GitHub Actions** (recommended) — set **Source** to **GitHub Actions**, then re-run the [Deploy workflow](https://github.com/GHARBINZ/Final-Project-Studio-Build-Deploy-with-AI/actions/workflows/deploy.yml) if needed.
- **Deploy from branch** — set **Source** to branch **`main`**, folder **`/docs`**.

---

## Author

Built with AI-assisted development and Mohamed Amine Gharbi

