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

1. In the Supabase dashboard, open **SQL Editor → New query**.
2. Paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql).
3. Click **Run**.

That creates the tables, the storage buckets, and the security rules. It's
safe to re-run if you need to.

## 3. Create the login

1. Go to **Authentication → Users → Add user**.
2. Enter Jessica's email and a strong password, and tick
   **Auto Confirm User** so no confirmation email is needed.

This is the only account that can sign in. There's deliberately no public
sign-up — to add another person, create them here the same way.

## 4. Collect the keys

Go to **Project settings → API** and copy three values:

| Supabase label      | Environment variable            |
| ------------------- | ------------------------------- |
| Project URL         | `NEXT_PUBLIC_SUPABASE_URL`      |
| `anon` `public` key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `service_role` key  | `SUPABASE_SERVICE_ROLE_KEY`     |

> The `service_role` key bypasses all security rules. Keep it server-side
> only — never put it in a `NEXT_PUBLIC_` variable and never commit it.

## 5. Add them to Vercel

In your Vercel project: **Settings → Environment Variables**. Add all three
for **Production**, **Preview**, and **Development**, then **redeploy** —
env vars are only picked up by a new build.

For local development, copy `.env.example` to `.env.local` and fill in the
same values.

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
