# Summer Et Al — Production, Talent & Consulting Website

A marketing + booking site for Summer Et Al, Jessica's Dubai-based production
coordination, talent booking, and creative direction studio, also offering
strategic growth consulting. Built with Next.js (App Router), TypeScript, and
Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Content

All of the site's facts, copy, services, and campaign case studies live in a
single file: [`content/site.ts`](./content/site.ts). Update copy there rather
than hunting through page components. The brand name is a single config value
(`siteConfig.name`).

## Admin, blog, and database

The site has an authenticated admin at `/admin` where Jessica can write blog
posts, upload photography, edit campaign case studies and site copy, and read
incoming inquiries. It runs on Supabase (Postgres + Auth + Storage).

**Setup takes ~15 minutes and is documented in [SETUP.md](./SETUP.md).**

### Graceful degradation

Supabase is optional. With no env vars set, the site serves the static
content from `content/site.ts`, `/admin` redirects away, and forms fall back
to writing local files. This keeps the build green and the public site
rendering before the database exists — and means a Supabase outage degrades
the site to static rather than breaking it.

Precedence once configured:

- **Campaigns / highlights** — database rows replace the static list entirely
  once any row exists.
- **Site settings** — layered over the static defaults, so blank fields keep
  their built-in value.
- **Blog** — database only; there is no static fallback.

## The four working forms

- **Book Jessica** (`/book`, `app/api/book/route.ts`) — booking/inquiry form.
- **Talent Registration** (`/talent`, `app/api/talent/route.ts`) — model
  sign-up with required headshot upload and required measurements.
- **Creative Registration** (`/talent`, `app/api/creative/route.ts`) —
  photographers, editors, videographers, producers, directors, and content
  creators. Same tabbed page as Talent Registration, switched client-side by
  `components/forms/RegistrationTabs.tsx`. The key difference from Talent is
  a required portfolio/website link (doubling as proof of work) and a
  multi-select **role(s)** field, in place of headshot + measurements.
- **Contact** (`/contact`, `app/api/contact/route.ts`) — general inquiry.

All four validate on the client and again on the server, show a loading
state while submitting, and show a clear success/error state. Submissions go
to the `submissions` table and appear under **Inquiries** in the admin,
filterable by kind.

Uploaded headshots and briefs go to a **private** storage bucket — they
contain personal data, so they're never publicly readable. The admin views
them through signed URLs that expire after an hour.

### Email notifications

Optional, via `nodemailer`. Set the SMTP vars in `.env.example` to have
Jessica emailed on each submission; without them, submissions still save and
the email is skipped with a console warning.

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

## Project layout

```
app/(site)/     public pages — the marketing site and blog
app/admin/      authenticated dashboard (own layout, no site chrome)
app/api/        form endpoints
lib/content.ts  data layer: Supabase when configured, static fallback otherwise
lib/supabase/   clients — public (cookie-free), server (session), service role
supabase/       schema.sql — run once to provision the database
content/site.ts static content and fallback defaults
```

## What's intentionally out of scope

- The RJ4 retail consultancy engagement is referenced only as a one-line
  credibility note (`content/site.ts` → `aboutConsultingNote`), not as a
  published case study, per the brief.
- Services content is still static in `content/site.ts` — it changes rarely,
  so it isn't editable from the admin.
