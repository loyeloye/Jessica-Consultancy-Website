# Jessica — Production, Talent & Consulting Website

A marketing + booking site for Jessica, a Dubai-based production coordinator,
talent booker, and creative director, also offering strategic growth
consulting. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Content

All of Jessica's facts, copy, services, and campaign case studies live in a
single file: [`content/site.ts`](./content/site.ts). Update copy there rather
than hunting through page components. The brand name is a single config value
(`siteConfig.name`) in case a formal business name is chosen later.

## The two working forms

- **Book Jessica** (`/book`, `app/api/book/route.ts`) — booking/inquiry form.
- **Talent Registration** (`/talent`, `app/api/talent/route.ts`) — model
  sign-up with required headshot upload.
- **Contact** (`/contact`, `app/api/contact/route.ts`) — general inquiry.

Both booking and talent forms do client-side validation, show a loading
state while submitting, and a clear success/error state. Server-side
validation is duplicated in the API routes since client-side checks can be
bypassed.

### Current storage (prototype-grade — read before deploying)

- Form submissions are appended to local JSON files in `/data`
  (`bookings.json`, `talent.json`, `contact.json`), created on first
  submission. This directory is gitignored.
- Uploaded headshots/briefs are saved to a local `/uploads` folder
  (gitignored), validated for type (JPG/PNG/WEBP, plus PDF for briefs) and
  size (8MB max).
- Email notifications go out via `nodemailer` if SMTP env vars are set (see
  `.env.example`). If they're not set, submissions still save — the email
  is just skipped, with a console warning.

**This works as-is on a normal Node server** (`npm run build && npm start`),
where `/data` and `/uploads` persist on disk. **It will not work unmodified
on most serverless hosts** (e.g. Vercel's default runtime), because their
filesystem is read-only/ephemeral outside of `/tmp` — a fresh deploy or
scaled-out instance won't see previous submissions or uploads.

Before a production deploy, swap:
- `lib/storage.ts` → a durable store (Airtable, Google Sheets via API, or a
  hosted database like Postgres/Supabase).
- `lib/uploads.ts` → a cloud bucket (S3, Cloudinary, Supabase Storage, etc.)
  for headshots and moodboard/brief files.

Both files are small and isolated specifically so this swap doesn't require
touching the forms or API route validation logic.

### Email setup

Copy `.env.example` to `.env.local` and fill in SMTP credentials (e.g. a
Gmail app password, or a transactional provider like Postmark/Resend/SES)
to enable notification emails to `NOTIFY_EMAIL`.

## Design notes

- Palette: near-black + off-white base with a single warm gold accent.
- Type: Fraunces (serif, display/headlines) + Inter (grotesk, UI/body).
- Motion: a single signature moment on the homepage hero (cursor-reactive
  parallax glow + a one-time physics-y text settle on the headline), a
  magnetic pull on primary CTA buttons, and a grayscale→color hover reveal
  on campaign/portfolio tiles. All motion respects
  `prefers-reduced-motion` and is implemented with plain CSS
  transitions/transforms — no animation library, no third-party embeds.
## Imagery

Campaign and highlight photography lives in `public/images/`, extracted
from Jessica's portfolio deck and re-encoded as WebP (max 1400px, ~1.1MB
total for 19 images). Every image is referenced from `content/site.ts`
with its alt text, so swapping or adding photography is a content-file
change, not a component change:

- `campaigns/<slug>-NN.webp` — per-campaign hero (`image`) and `gallery`
- `highlights/NN.webp` — the "More from the archive" grid
- `about/portrait.webp` — the About page portrait

All photography renders through `components/HoverChromaTile.tsx`
(grayscale at rest, colour on hover) and `next/image` for responsive
sizing and lazy loading.

## What's intentionally out of scope

- The RJ4 retail consultancy engagement is referenced only as a one-line
  credibility note (`content/site.ts` → `aboutConsultingNote`), not as a
  published case study, per the brief.
- No CMS — content lives in `content/site.ts` by design, to keep the stack
  simple for a v1.
