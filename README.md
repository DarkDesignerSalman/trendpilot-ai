# TrendPilot AI — starter website

A bilingual (Bangla/English) Next.js publishing starter with:
- Public magazine-style homepage and article pages
- MongoDB article storage
- AI-assisted article draft generation
- Admin dashboard with draft review and manual publishing
- Basic AI visitor assistant API
- Protected scheduled draft-generation endpoint
- AdSense placeholder (not an ad network integration)

## Important limitations
This is a starter project, not a deployed or revenue-generating business. It does not guarantee viral traffic or income. AI drafts are intentionally saved as **drafts** and require human fact-checking and approval. Do not use fake traffic, incentivized clicks, click exchanges, or click your own ads. AdSense approval and bank payments are handled by Google after eligibility and verification. No bank credentials should be stored in this application.

## 1. Requirements
- Node.js 20+
- MongoDB Atlas database
- Google AI Studio API key (free quota available, with limits)
- Hosting account supporting Next.js (e.g. Vercel)

## Free-first setup
Use the free tiers of Vercel, MongoDB Atlas and Google AI Studio where available. Deploy with the free `*.vercel.app` subdomain; a custom domain usually costs money. Free AI quotas are limited and may change. Do not enable billing if you need a hard zero-cost setup.

## 2. Run locally
```bash
npm install
cp .env.example .env.local
```
Fill in `MONGODB_URI`, `GOOGLE_AI_API_KEY`, a strong `ADMIN_PASSWORD`, and `CRON_SECRET`.
Then:
```bash
npm run dev
```
Open http://localhost:3000. Visit `/admin` to log in.

## 3. AI draft workflow
In `/admin`, enter a topic, choose language/category, and generate a draft. Check facts, add reliable source links, edit as needed, then click Publish.

## 4. Scheduled drafts
Deploy the site, then configure a trusted scheduler (for example, a free external scheduler (for example, GitHub Actions scheduled workflow or another free cron service)) to call:
`GET https://YOUR_DOMAIN/api/cron/generate`
with header:
`Authorization: Bearer YOUR_CRON_SECRET`
The endpoint creates one draft. Review before publishing. Protect the secret and do not expose it in browser code.

## 5. AdSense
The homepage contains a visual ad placeholder only. After the site has original, useful content and meets Google's current publisher policies, apply to AdSense. Add the official AdSense script and approved ad units only after approval. Do not put ads on empty/thin pages or generate invalid traffic. Revenue is not guaranteed.

## 6. Analytics
Connect Google Analytics/Search Console after deployment and configure consent/privacy disclosures as required. The starter intentionally does not fake visitor or earnings metrics. AI responses depend on Google AI Studio's free quota and model availability; if quota is exhausted, AI features pause until it resets.

## 7. Production hardening before launch
- Replace simple shared-password admin auth with proper user sessions (Auth.js/Clerk/etc.) and rate limiting.
- Add CAPTCHA/rate limits to public chat; monitor token costs.
- Add privacy policy, terms, contact/about pages, cookie/consent controls where required.
- Add source citations, editorial review, plagiarism checks, corrections policy.
- Add image licensing and accessibility checks.
- Add backups, monitoring, logging, HTTPS, security headers and database indexes.
- Add real analytics and verified ad reporting.
- Never collect bank login details. Configure payouts only in the ad provider's official dashboard.
