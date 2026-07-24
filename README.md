# MichiganHomeBuyerHQ

Minimal Next.js starting shell: homepage, guides index, and one working
article template rendering real content from `content/guides/`.

## Run it locally

1. Install [Node.js](https://nodejs.org) (LTS version) if you don't have it.
2. In this folder, run:
   ```
   npm install
   npm run dev
   ```
3. Open http://localhost:3000

## Add a new article

Drop a new `.md` file into `content/guides/`, following the same format as
`closing-costs-in-michigan.md` (title, description, category, updated, then
the content). It'll automatically show up on the homepage and `/guides` —
no code changes needed.

## Deploy it live

1. Push this folder to a new GitHub repo.
2. Go to vercel.com, sign in with GitHub, click "New Project," and select
   the repo. Vercel auto-detects Next.js — just click Deploy.
3. In Vercel's project settings, add your domain
   (michiganhomebuyerhq.com) under "Domains" and follow the DNS
   instructions it gives you at your registrar.
4. In Vercel's project settings under "Environment Variables," set
   `CONVERTKIT_API_KEY` and `CONVERTKIT_FORM_ID` — the homepage email
   signup form calls ConvertKit's API directly and returns an error to
   the user if either is missing. For local development, add the same
   two variables to `.env.local` (gitignored, never commit real keys).

## What's built so far

- Homepage with hero, live guide list, and email capture (submits to
  ConvertKit — see env vars above)
- `/guides` index page
- `/guides/[slug]` article template with FAQ section and soft CTA
- One real article: "How Much Are Closing Costs in Michigan?"

## Not built yet

- Calculators (`/calculators`)
- DPA Finder (`/down-payment-assistance`)
- Compliance footer language — placeholder text is in `components/Footer.tsx`,
  marked clearly — replace before launch
