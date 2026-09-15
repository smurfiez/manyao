# Manyao Player PWA (慢摇播放器) — Cloudflare Edition ☁️

A multi-platform Progressive Web App (PWA) designed for seamless streaming of Manyao (嗨曲/慢摇) nonstop club mixes across **YouTube** (SkipCut ad-free engine), **SoundCloud** (>1 hr nonstop sets), and **Mixcloud** (>1 hr cloudcasts).

Built with zero server maintenance, 100% native to **Cloudflare Pages** and **Cloudflare Pages Functions**.

---

## ⚡ Features

- **☁️ Cloudflare Edge Native**: Runs completely serverless on Cloudflare Pages. API routes (`/api/search`, `/api/soundcloud/search`, `/api/mixcloud/search`) run as V8 edge functions on Cloudflare Workers.
- **🎛️ 3 Platform Versions**:
  - `index.html`: YouTube edition with SkipCut player & SponsorBlock auto-skip.
  - `soundcloud.html`: SoundCloud edition with `> 1 hour` nonstop mix filter.
  - `mixcloud.html`: Mixcloud edition with `> 1 hour` continuous clubcast filter.
- **⏱️ > 1 Hour Filter**: SoundCloud & Mixcloud backends automatically filter and deliver nonstop sets `> 1 hr` (3600s).
- **📡 AirPlay & Remote Playback**: Native Apple AirPlay picker for Safari (iOS/macOS) and Google Cast / RemotePlayback for Chromium.
- **🎲 Random Mix Generator**: 1-click generation of 10 new random tracks via edge API.
- **📱 PWA Ready**: Installable to iOS/Android home screens, offline caching for app shell via Service Worker v4.

---

## 🚀 Local Development

You can run the full Cloudflare Pages environment (frontend + edge functions) locally using Wrangler:

```bash
# Run Cloudflare Pages development server
npx wrangler pages dev . --port 8788
```

Open:
- **YouTube Edition**: [http://localhost:8788/](http://localhost:8788/)
- **SoundCloud Edition (>1hr)**: [http://localhost:8788/soundcloud.html](http://localhost:8788/soundcloud.html)
- **Mixcloud Edition (>1hr)**: [http://localhost:8788/mixcloud.html](http://localhost:8788/mixcloud.html)

*(Optional: If you prefer running without Node.js, `python3 server.py 8080` remains available as a local fallback.)*

---

## 🌐 Deploying to Cloudflare

### Option 1: Cloudflare Pages Dashboard (Recommended, Continuous Deployment)

1. Push this repository to **GitHub** or **GitLab**.
2. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select your repository.
4. Set build settings:
   - **Framework preset**: `None`
   - **Build command**: *(leave blank)*
   - **Build output directory**: `.` (or root)
5. Click **Save and Deploy**.

Cloudflare will automatically deploy your static assets and wire up the serverless APIs from the `functions/` directory!

---

### Option 2: Wrangler CLI Deployment

From your terminal:

```bash
# Login to your Cloudflare account (first time only)
npx wrangler login

# Deploy directly to Cloudflare Pages
npm run deploy
# or:
npx wrangler pages deploy . --project-name=manyao
```

---

## 🔧 Environment Variables (Optional)

In your Cloudflare Pages project settings (**Settings** → **Environment variables**), you can optionally add:

| Variable | Description |
|---|---|
| `YOUTUBE_API_KEY` | *(Optional)* Google Cloud YouTube Data API v3 key for YouTube search quota. If omitted, the edge function scrapes YouTube search directly. |
| `SOUNDCLOUD_CLIENT_ID` | *(Optional)* Custom SoundCloud v2 API client ID. Defaults to standard built-in ID. |

---

## 📁 Architecture

```
manyao/
├── functions/                     # Cloudflare Pages Functions (Edge API)
│   └── api/
│       ├── search.js              # /api/search (YouTube search edge function)
│       ├── soundcloud/
│       │   └── search.js          # /api/soundcloud/search (>1hr mix edge function)
│       └── mixcloud/
│           └── search.js          # /api/mixcloud/search (>1hr mix edge function)
├── index.html                     # YouTube PWA interface
├── soundcloud.html                # SoundCloud PWA interface (>1hr)
├── mixcloud.html                  # Mixcloud PWA interface (>1hr)
├── app.js                         # YouTube SkipCut & player controller
├── soundcloud.js                  # SoundCloud Widget API & queue controller
├── mixcloud.js                    # Mixcloud PlayerWidget API & queue controller
├── style.css                      # Unified dark neon design system
├── sw.js                          # Service Worker v4 (PWA offline caching)
├── manifest.json                  # PWA installation manifest
├── wrangler.toml                  # Cloudflare Pages configuration
└── package.json                   # NPM commands for Wrangler
```
