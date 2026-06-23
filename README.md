# Duowingo

A mobile-friendly, Duolingo-style quiz for learning to identify UK bird species by their calls and songs, using recordings from [Xeno-canto](https://xeno-canto.org). Hear a clip, then answer multiple-choice or free text — no accounts, progress is saved in your browser's `localStorage`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm test` — run the unit test suite (Vitest)
- `npm run lint` — lint the codebase

## Data

Species and lesson tiers are defined in `data/species.ts`. The actual recordings (audio URLs, recordist, license) live in `data/birds.json`, which is committed to the repo and read at build/runtime — no API calls happen in the deployed app.

To (re)fetch recordings from Xeno-canto:

```bash
XC_API_KEY=your-key-here npx tsx scripts/fetch-recordings.ts
```

You'll need a Xeno-canto API key (see their [API docs](https://xeno-canto.org/explore/api)). The key is only read from the environment for this one-off script — it is never written to disk or committed. Copy `.env.example` to `.env.local` if you'd rather keep it in a (gitignored) file:

```bash
cp .env.example .env.local
# edit .env.local, then:
XC_API_KEY=$(grep XC_API_KEY .env.local | cut -d= -f2) npx tsx scripts/fetch-recordings.ts
```

## Deploying

The app is zero-config deployable on Vercel — no `vercel.json` or serverless functions required. Connect this repo to a Vercel project and it will build with `next build` automatically.

## Attribution

Recordings are sourced from [Xeno-canto](https://xeno-canto.org) contributors under their respective Creative Commons licenses. See the in-app `/about` page for full credits.
