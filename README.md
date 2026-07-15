# Athllo

The marketplace where athletes showcase their reach and brands find, vet, and sponsor the right talent — with secure payments built in.

Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS · Supabase · Stripe**, deployable to **Vercel**.

> Architecture: see `design.md`. Scope & roadmap: see `project.md`.

---

## What's in this scaffold

- **Marketing site** — landing page (with the "reach telemetry" signature), pricing, responsive nav/footer.
- **Auth** — working Supabase email/password sign-up (with athlete/brand role selection) and login.
- **Dashboards** — athlete and sponsor dashboard shells behind an auth guard.
- **Discovery** — search page with filters + public athlete profile pages (ISR-ready).
- **Payments** — Stripe client + signature-verified webhook handler.
- **Database** — full Postgres schema with enums, indexes, and Row Level Security (`supabase/migrations/0001_init.sql`).
- **Design system** — tokens in `tailwind.config.ts` + `app/globals.css`, primitives in `components/ui`.

---

## Prerequisites

- **Node.js 20+**
- **pnpm** (`npm install -g pnpm`)
- A **Supabase** project (free tier is fine)
- A **Stripe** account (test mode)

---

## Step-by-step: run it locally

### 1. Install dependencies
```bash
pnpm install
```

### 2. Configure environment
```bash
cp .env.example .env.local
```
Fill in `.env.local`:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API (keep secret) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe → Developers → API keys |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | from `stripe listen` (step 5) |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` |

### 3. Set up the database
Using the Supabase CLI:
```bash
supabase link --project-ref <your-project-ref>
supabase db push          # applies supabase/migrations/0001_init.sql
```
Then seed the lookup tables (sports, industries) — paste `supabase/seed.sql` into the Supabase SQL editor, or:
```bash
psql "$DATABASE_URL" -f supabase/seed.sql
```

> No CLI? Open the Supabase **SQL Editor**, paste `0001_init.sql`, run it, then paste `seed.sql` and run it.

### 4. Start the app
```bash
pnpm dev
```
Open **http://localhost:3000**.

### 5. Forward Stripe webhooks (second terminal)
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
Copy the printed `whsec_...` into `STRIPE_WEBHOOK_SECRET` and restart `pnpm dev`.

---

## Scripts

| Command | Does |
|---|---|
| `pnpm dev` | Run locally |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check |

---

## Deploy to production (Vercel)

1. Push this repo to GitHub.
2. Import it in **Vercel** → New Project.
3. Add all env vars from `.env.local` to the Vercel project (set `NEXT_PUBLIC_APP_URL` to your domain).
4. Deploy. Every PR gets a preview URL automatically.
5. In Stripe, add a webhook endpoint pointing to `https://<your-domain>/api/webhooks/stripe` and put its signing secret in Vercel.

---

## Project structure

```
app/
  (marketing)/     landing, pricing  + shared nav/footer
  (auth)/          login, signup (Supabase auth)
  (dashboard)/     athlete + sponsor dashboards (auth-guarded)
  athletes/[slug]/ public athlete profiles (ISR)
  search/          discovery + filters
  api/             health check, stripe webhook
components/
  ui/              button, card, badge, input
  marketing/       nav, footer, stat-ticker (signature)
lib/
  supabase/        browser, server, middleware clients
  stripe/          server client + plans
  validation/      zod schemas (shared client + server)
supabase/
  migrations/      schema + RLS
  seed.sql         lookup data
middleware.ts      session refresh + route protection
```

---

## Notes

- Athlete profiles and search currently render demo data so the UI is viewable without a database. Swap the demo arrays for Supabase queries (`lib/supabase/server.ts`) to go live — the schema and RLS are already in place.
- Stripe uses two models: **Billing** (subscriptions) and **Connect** (marketplace payouts). See `design.md §9`.
- The webhook is the source of truth for payment state — never mark a deal paid from the client.
