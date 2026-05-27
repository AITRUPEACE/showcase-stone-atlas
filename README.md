# Stone Atlas

> A collaborative map of ancient sites — community submissions, evidence threads, and the connections curious people are piecing together across civilizations.

🔗 **Live:** [stoneatlas.dev](https://stoneatlas.dev)
📝 **Case study:** *In progress — link will land here.*

> This is a **showcase repository**. The product is closed-source. What's here: overview, architecture, stack, and the parts of the build I'd want to point a hiring manager or collaborator at.

---

## Screenshots

![World map](./screenshots/map.png)
![Site detail](./screenshots/site.png)
![Community submission flow](./screenshots/submission.png)

> Placeholder image refs. Drop PNGs into `./screenshots/` with these names.

---

## What it is

Stone Atlas is an evidence-forward, curious community around megalithic architecture, ancient sites, and the patterns that emerge when you map them all in one place. The hook: the map. The depth: per-site media libraries, linked videos, discussion threads, and connections between sites on different continents.

- **Official map** of curated sites
- **Community submissions** filterable in/out, promotable to the official map when the evidence is strong enough
- **Per-site pages** with photos, linked YouTube content, threaded discussion
- **Connections** between sites — a contributor can link two locations and explain why, others can build on it
- **Three-layer transparent pricing.** Supporter tiers today; Creator Pro and Audience Tipping on a public roadmap. No participation gating, ever.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, Turbopack dev) on Vercel |
| UI | React 19, Tailwind, shadcn/ui (Radix primitives), Framer Motion |
| Map | Leaflet + React Leaflet, `leaflet.markercluster` |
| State | Zustand for map state, TanStack Query for server cache |
| Data | Supabase Postgres + Auth + Storage (photos), RLS-first |
| Payments | Stripe (supporter tiers, Creator Pro on roadmap) |
| Email | Resend + `@react-email` templates |
| Onboarding | `react-joyride` for first-run tours |
| PWA | Serwist |
| Testing | Playwright |

---

## Architecture at a glance

- **Two-track data model.** The same `sites` table backs both the curated official map and the community submissions layer; a `status` field plus RLS decides what each viewer sees. Promotion to the official map is a status change with provenance preserved, not a copy.
- **Schema-bounded.** All product tables live in a `megalithic` Postgres schema, isolated from Supabase's `auth`/`storage` schemas. Manual type declarations live alongside generated types in `src/types/`.
- **Map state in Zustand, data state in React Query.** Pan/zoom/active-site/filter state is pure UI and stays in Zustand. Everything that talks to Postgres goes through React Query for cache + revalidation. This separation kept the map from re-rendering on data churn.
- **Marker clustering tuned for sparse-but-global data.** Ancient sites don't cluster like restaurants do. Tuned `disableClusteringAtZoom`, custom cluster icons by region density, and a separate icon set for community vs. official.
- **Media library per site.** Supabase Storage with thumbnail variants; uploads go through a server action that writes the row and the file together.
- **Stripe webhooks → server actions.** Subscription state lives in Postgres so RLS can reason about it; the webhook is just a sync mechanism.

---

## Implementation details worth a look

### Curation pipeline
The interesting product question wasn't "how do you let anyone add a pin" — it was "how do you let anyone add a pin without diluting the official map." The answer: submissions are first-class data with the same shape as official sites, kept on a separate visual layer, with a documented promotion path that's a status transition rather than a re-keying. Contributors get attribution that survives promotion.

### Map performance with global data
A world map of sparsely-distributed ancient sites breaks the assumptions baked into most clustering tutorials (which assume dense urban data). Cluster radii scale with zoom non-linearly; per-region icon weights stop Mesoamerica from visually drowning Stonehenge at zoom 3.

### Pricing surface that doesn't gate participation
Three-tier roadmap (Supporter live, Creator Pro Q1 2027 with 90-day grandfather, Audience Tipping Q2–Q3 2027) is visible on the public pricing page. The product principle — never gate the basic act of contributing — shows up in the schema: there's no `is_paid` flag guarding submissions, and the Stripe state only unlocks orthogonal features (privacy, export, richer search).

### Onboarding via `react-joyride`
First-run tour walks new users through the map, filters, and submission flow without modal-trapping them. State-tracked so the tour doesn't re-fire across sessions.

---

## Project status

- **Live** with map, community submissions, site pages, discussion, and supporter tiers.
- **Creator Pro** designed, scheduled.
- **Case study** pending — will cover the curation pipeline and the global-scale clustering work.

---

## About

Built solo by **Cristian Tohatan**.

- 🌐 [cristian-tohatan.com](https://cristian-tohatan.com)
- 💼 [LinkedIn](https://linkedin.com/in/cristian-tohatan)

Source is closed. Happy to walk through the codebase live — reach out via the portfolio.
