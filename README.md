# Stone Atlas

> Where ancient history videos become living maps. The place to continue the investigation after the YouTube comments disappear.

🔗 **Live:** [stoneatlas.dev](https://stoneatlas.dev)
📝 **Case study:** *In progress — link will land here.*

> This is a **showcase repository**. The product is closed-source. What's here: overview, architecture, stack, and the parts of the build worth pointing at.

---

## Screenshots

![Video-led landing](./screenshots/video-led.png)
![World map with sites](./screenshots/map.png)
![Site page with timestamps and traits](./screenshots/site.png)

> Placeholder image refs. Drop PNGs into `./screenshots/` with these names.

---

## What it is

Ancient-history YouTube has the attention. What it doesn't have is **structured continuity** — a video drops, the comments explode, someone at 22:13 notices a masonry nub that looks exactly like Baalbek, and two weeks later the conversation is buried forever.

Stone Atlas preserves that moment and gives it somewhere to go:

```
video → timestamps → sites → traits → patterns → connections → investigations
```

A creator drops an episode. The platform turns it into tagged sites with timestamped claims. Viewers contribute photos, sources, and observations. Traits (polygonal masonry, astronomical alignment, flood myth) get shared across sites. Patterns emerge. The best contributions get promoted onto the official map with attribution preserved.

Not academic. Not fringe. **Evidence-forward curious.**

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, Turbopack dev) on Vercel |
| UI | React 19, Tailwind, shadcn/ui (Radix), Framer Motion, `react-joyride` for onboarding tours |
| Map | Leaflet + React Leaflet, `leaflet.markercluster` |
| State | Zustand for map state, TanStack Query for server cache |
| Data | Supabase Postgres + Auth + Storage (photos), RLS-first, isolated `megalithic` schema |
| Payments | Stripe (Supporter tier live; Creator Pro Q1 2027) |
| Email | Resend + `@react-email` templates |
| PWA | Serwist |
| Testing | Playwright |

---

## Architecture at a glance

- **Video-led entry, map-anchored research.** The landing surface is video + investigation, not a cold full-screen map. The map becomes central once users enter the app.
- **Two-track data model.** The same `sites` table backs both the curated official map and the community-submissions layer. A `status` field plus RLS decides what each viewer sees. Promotion to the official map is a status transition with provenance preserved — not a copy.
- **Traits & patterns as first-class relations.** Sites have traits (polygonal masonry, equinox alignment, etc.). Patterns are clusters of traits that recur across sites. Connections are user-authored links between two sites with reasoning attached. The whole graph is built so emerging structure can be queried, not just clicked through.
- **Creator pages.** A YouTuber's channel becomes a profile with their mapped videos and the conversations downstream of each episode.
- **Map state in Zustand, data state in React Query.** Pan/zoom/active-site/filter is pure UI in Zustand. Everything that talks to Postgres goes through React Query for cache + revalidation. Keeps the map from re-rendering on data churn.
- **Onboarding via `react-joyride`** — first-run tour walks users through map, filters, video threads, and contribution flow.

---

## Implementation details worth a look

### Video → mapped investigation pipeline
The pipeline is the product. An ancient-history video is the spark; the platform's job is to turn its content into structured, navigable research: timestamps anchor claims, claims anchor sites, sites carry traits, traits cluster into patterns, patterns become investigations the community can keep open across episodes.

### Curation pipeline
The interesting product question wasn't "how do you let anyone add a pin" — it was "how do you let anyone add a pin without diluting the official map." The answer: submissions are first-class data with the same shape as official sites, kept on a separate visual layer, with a documented promotion path that's a status transition rather than a re-keying. Contributor attribution survives promotion.

### Map performance with sparse global data
A world map of sparsely-distributed ancient sites breaks the assumptions baked into most clustering tutorials (which assume dense urban data). Tuned cluster radii, region-aware weighting, and a separate icon set for community vs. official so the visual hierarchy of "verified vs. submitted" reads at every zoom level.

### Layered monetization that never gates participation
Three-layer transparent pricing:
- **Supporter tier** (live) — $5/mo or $50/yr. Unlimited saves, follow creators, alerts on new mapped episodes, "My Atlas" personal research board, advanced search and timeline filters.
- **Creator Pro** (Q1 2027, 90-day grandfather window) — creator pages, embed widgets, analytics on which sites/episodes drive traffic.
- **Audience Tipping** (Q2–Q3 2027) — revenue-share with creators, native to the platform.

The product principle — **never gate the basic act of contributing** — shows up in the schema. There's no `is_paid` flag guarding submissions; Stripe state only unlocks orthogonal features (privacy, export, richer search).

---

## Project status

- **Live** with map, site pages, traits/patterns model, community submissions, threaded discussion, and the Supporter tier.
- **YouTube-first repositioning** in flight — landing copy, creator pages, video-led entry.
- **Creator Pro** designed, scheduled Q1 2027.

---

## About

Built solo by **Cristian Tohatan**.

- 🌐 [cristian-tohatan.com](https://cristian-tohatan.com)
- 💼 [LinkedIn](https://linkedin.com/in/cristian-tohatan)

Source is closed. Happy to walk through the codebase live — reach out via the portfolio.
