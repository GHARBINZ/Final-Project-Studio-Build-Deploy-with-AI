# Project Specification — WavePlay Music Player

## Overview

**Project Name:** WavePlay  
**Type:** Static web application (mini music player)  
**API:** Deezer Public API  
**Deployment Target:** GitHub Pages  
**Repository:** [Final-Project-Studio-Build-Deploy-with-AI](https://github.com/GHARBINZ/Final-Project-Studio-Build-Deploy-with-AI)

---

## Goal

Build and deploy a functional music player that demonstrates AI-assisted development workflow: design, code generation, documentation, version control, and live deployment.

---

## User Stories

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US-1 | As a user, I want to see trending music when I open the app | Chart tracks load automatically on page load |
| US-2 | As a user, I want to search for music | Search form returns Deezer results |
| US-3 | As a user, I want to play track previews | Clicking a track plays its 30s preview |
| US-4 | As a user, I want playback controls | Play/pause, next/prev, seek, volume work |
| US-5 | As a user, I want a polished experience | Responsive layout, loading states, error handling |

---

## Functional Requirements

1. **Data Layer**
   - Fetch trending tracks from `/chart/0/tracks`
   - Search tracks via `/search?q={query}`
   - Use JSONP to avoid CORS restrictions

2. **Player**
   - HTML5 audio playback for preview URLs
   - Auto-advance to next track on end
   - Progress bar with click-to-seek

3. **UI**
   - Track list with album art, title, artist, duration
   - Now-playing panel with cover art and metadata
   - Mobile-responsive two-panel layout

---

## Non-Functional Requirements

- **Performance:** No build step; fast static load
- **Accessibility:** ARIA labels, keyboard-friendly controls
- **Compatibility:** Modern evergreen browsers
- **Maintainability:** Plain JS modules, no framework lock-in

---

## Architecture

```
┌─────────────┐     JSONP      ┌──────────────┐
│  index.html │ ◄────────────► │  Deezer API  │
│  app.js     │                └──────────────┘
│  api.js     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ HTML5 Audio │
└─────────────┘
```

---

## Out of Scope

- User authentication
- Full-length streaming (requires Deezer premium/partner API)
- Playlists or favorites persistence
- Backend server

---

## Success Metrics

- [x] App loads trending tracks without errors
- [x] Search returns playable results
- [x] Deployed and accessible via GitHub Pages URL
- [x] README and project spec documented

---

## Timeline

| Phase | Task | Status |
|-------|------|--------|
| 1 | Project spec & UI design | Complete |
| 2 | API integration (JSONP) | Complete |
| 3 | Player logic & styling | Complete |
| 4 | Documentation | Complete |
| 5 | GitHub push & Pages deploy | Complete |

---

## AI Tools Used

- **Cursor AI** — Code generation, UI design, README/spec authoring, deployment workflow setup
