# Setup — admin, blog, and database

The site runs fine without any of this: with no Supabase keys it serves the
static content from `content/site.ts`, and `/admin` redirects away. Follow
these steps to switch on the login, blog, media uploads, editable copy, and
the inquiries inbox.

Budget about 15 minutes. Everything below is on free tiers.

---

## 1. Create the Supabase project

1. Sign up at [supabase.com](https://supabase.com) and create a new project.
2. Choose a region close to your audience — **Frankfurt** or **Singapore**
   are the sensible picks for Dubai.
3. Save the database password somewhere safe when prompted.

## 2. Create the tables

This step runs one file of setup code once, in Supabase's SQL editor. You're
copying text from GitHub and pasting it into Supabase — no editing needed.

1. Open this link:
   [`supabase/schema.sql` on GitHub](https://github.com/loyeloye/Jessica-Consultancy-Website/blob/claude/jessica-chukwu-website-1dev6w/supabase/schema.sql)
2. Near the top right of the file, there's a small clipboard/copy icon —
   click it to copy the whole file. (If you don't see it, click **Raw**
   instead, then select all the text on that page — Ctrl+A on Windows,
   Cmd+A on Mac — and copy it — Ctrl+C or Cmd+C.)
3. Go to your Supabase project → **SQL Editor** in the left sidebar →
   **New query**.
4. Click into the empty text box and paste — Ctrl+V or Cmd+V.
5. Click the green **Run** button (bottom right).

You should see "Success. No rows returned." That means it worked — it just
created the tables, the storage buckets, and the security rules. It's safe
to run again if you're ever unsure whether it worked.

## 3. Create the login

1. Go to **Authentication → Users → Add user**.
2. Enter Jessica's email and a strong password, and tick
   **Auto Confirm User** so no confirmation email is needed.

This is the only account that can sign in. There's deliberately no public
sign-up — to add another person, create them here the same way.

## 4. Collect the keys

In Supabase, go to **Project settings** (bottom of the left sidebar) →
**API**. You'll see a page with several values on it — you need three of
them, copied one at a time.

## 5. Add them to Vercel

Now switch to your **Vercel** project → **Settings → Environment Variables**.
This page lets you add a **Key** (a name) and a **Value** (the thing it
equals). For each row below: copy the value from the Supabase API page,
then in Vercel type the exact key name shown, paste the value in, and save.
Do this three times:

| In Vercel, set this key →       | To the value Supabase calls →           |
| -------------------------------- | ---------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`       | **Project URL**                          |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | **Project API keys** → `anon` `public`   |
| `SUPABASE_SERVICE_ROLE_KEY`      | **Project API keys** → `service_role`    |

For each one, tick all three boxes — **Production**, **Preview**, and
**Development** — so it applies everywhere.

> ⚠️ The `service_role` key is powerful — it can bypass every security rule
> on the database. Only ever paste it into Vercel's environment variables
> (server-side). Never put it in a variable starting with `NEXT_PUBLIC_`,
> never paste it into the site itself, and never send it over email or chat.

Once all three are saved, go to **Deployments**, open the latest one, and
click **Redeploy** — environment variables only take effect on a new build,
they won't apply to a deployment that's already running.

For local development on your own machine, copy `.env.example` to a new
file named `.env.local` in the project folder and fill in the same three
values there.

## 6. Sign in

Visit `/admin/login` and sign in with the account from step 3.

---

## What you can manage

| Section       | What it does                                                                    |
| ------------- | ------------------------------------------------------------------------------- |
| **Dashboard** | Unread inquiry count and the latest submissions                                  |
| **Blog**      | Write posts in Markdown, save as draft, publish when ready                       |
| **Media**     | Upload photography and copy image URLs to use elsewhere                          |
| **Work**      | Campaign case studies and the highlights grid                                    |
| **Inquiries** | Bookings, talent registrations, and contact messages — with headshots            |
| **Settings**  | Headline, stats, pull quote, contact details, brand name                         |

### How content falls back

Campaigns and the highlights grid show the built-in content from
`content/site.ts` until you add rows in the admin. Add one campaign and the
database takes over that section entirely — so add all of them, or none.
Site settings work differently: they layer on top, so any field you leave
blank keeps its built-in value.

### Publishing a blog post

Posts are written in Markdown:

```
## A heading

A paragraph with **bold**, *italic*, and a [link](https://example.com).

- A list item
- Another one

> A pull quote
```

For a cover image: upload it under **Media**, click **Copy URL**, and paste
that into the post's cover image field.

The **Journal** link only appears in the site navigation once at least one
post is published — drafts stay private.

---

## Where things are stored

- **Blog, campaigns, settings, inquiries** — Postgres tables in Supabase.
- **Site photography and blog covers** — the public `media` bucket.
- **Headshots and client briefs** — the private `uploads` bucket. These
  contain personal data, so they're never publicly readable; the admin views
  them through links that expire after an hour.

## Troubleshooting

**"Those details didn't match" when signing in.** Confirm the user exists
under Authentication → Users and is marked confirmed.

**`/admin` redirects to the homepage.** The Supabase env vars aren't visible
to the running deployment. Check they're set for the right environment in
Vercel and that you've redeployed since adding them.

**Images don't load after uploading.** The `media` bucket must be public —
re-running `schema.sql` fixes this.

**Forms return "Something went wrong".** Usually `SUPABASE_SERVICE_ROLE_KEY`
is missing or wrong. Without it the code falls back to writing to local
disk, which serverless hosts don't allow.
