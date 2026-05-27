# Stone Atlas

> Where ancient history videos become living maps. The place to keep the conversation going after the YouTube comments disappear.

🔗 **Live:** [stoneatlas.dev](https://stoneatlas.dev)
📝 **Case study:** in progress, link will land here.

> This is a showcase repository. The product itself is closed-source. What's here is an overview, the architecture, the stack, and the parts of the build worth pointing at.

---

## Screenshots

![Video-led landing](./screenshots/video-led.png)
![World map with sites](./screenshots/map.png)
![Site page with timestamps and traits](./screenshots/site.png)

Placeholder image refs. PNGs go in `./screenshots/` with these names.

---

## What it is

Ancient-history YouTube already has the attention. What it doesn't have is structured continuity. A video drops, the comments explode, someone at 22:13 notices a masonry nub that looks exactly like Baalbek, someone else says they live there and can go photograph it, and two weeks later the whole conversation is buried forever.

Stone Atlas is the place that conversation goes instead. A creator drops an episode, and the platform turns it into tagged sites with timestamped claims. Viewers contribute photos, sources, and observations. Traits (polygonal masonry, equinox alignment, flood myths, etc.) get shared across sites as they show up. Patterns are the clusters that emerge when several sites share the same trait. The strongest community submissions can be promoted onto the official map, with attribution preserved through the promotion.

The audience is curious viewers, not academics. Evidence-forward, but not gatekept.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, Turbopack dev) on Vercel |
| UI | React 19, Tailwind, shadcn/ui (Radix), Framer Motion, `react-joyride` for onboarding tours |
| Map | Leaflet + React Leaflet, `leaflet.markercluster` |
| State | Zustand for map state, TanStack Query for server cache |
| Data | Supabase Postgres, Supabase Auth, Supabase Storage for photos, RLS-first, isolated `megalithic` schema |
| Payments | Stripe (Supporter tier live, Creator Pro on the roadmap) |
| Email | Resend with `@react-email` templates |
| PWA | Serwist |
| Testing | Playwright |

---

## Architecture at a glance

The product hierarchy goes `video → timestamps → sites → traits → patterns → connections → investigations`. The video is the front door, the map is the spatial anchor, and traits and patterns are the structure underneath. The landing surface leads with video and active investigation rather than a cold full-screen map, because a full map is a powerful tool once you know what you're looking at and a confusing one when you don't.

The data model has one quirk worth calling out. The same `sites` table backs both the curated official map and the community-submissions layer. A `status` field plus RLS decides what each viewer sees on which layer. Promotion to the official map is a status transition with provenance preserved, rather than a copy from one table to another. That keeps contributor attribution intact across promotion and avoids the long-term mess of two parallel datasets that drift.

Traits, patterns, and connections are first-class relations rather than free text. A site can carry several traits, a trait can recur across many sites, and a connection is a user-authored link between two sites with reasoning attached. The whole thing is built so emerging structure can be queried, not just clicked through.

Map state lives in Zustand (pan, zoom, active site, filters), and data state lives in TanStack Query (anything touching Postgres). Keeping those two separated stops the map from re-rendering on every data revalidation, which matters when the data layer is doing a lot of work.

---

## Implementation details worth a look

### Video to mapped investigation

The pipeline is the product. An ancient-history video is the spark, and the platform's job is to turn its content into navigable research: timestamps anchor claims, claims anchor sites, sites carry traits, traits cluster into patterns, patterns become investigations the community can keep open across episodes from the same creator and across creators.

### Curation pipeline

The interesting product question wasn't "how do you let anyone add a pin," it was "how do you let anyone add a pin without diluting the official map." The answer was to treat community submissions as first-class data with the same shape as official sites, kept on a separate visual layer, with a documented promotion path that's a status transition.

### Map performance with sparse global data

A world map of sparsely-distributed ancient sites breaks the assumptions baked into most clustering tutorials, which assume dense urban data. The cluster radii had to be tuned per zoom level rather than left at defaults, with separate icon weighting for community vs. official so the visual hierarchy reads cleanly at every zoom level.

### Pricing that doesn't gate participation

Three transparent layers, with timing visible on the public pricing page:

1. **Supporter tier** (live), $5/month or $50/year. Unlimited saves, follow creators, alerts when new mapped videos drop, "My Atlas" personal research board, advanced search and timeline filters.
2. **Creator Pro** (Q1 2027, 90-day grandfather window). Creator pages, embed widgets, analytics on which sites and episodes drive traffic.
3. **Audience Tipping** (Q2 to Q3 2027). Native tipping with revenue-share to creators.

The product principle is that the basic act of contributing is never gated. The schema reflects this: there's no `is_paid` flag guarding submissions, and Stripe state only unlocks features that are orthogonal to participation (privacy, export, richer search).

---

## Project status

Live with map, site pages, the traits and patterns model, community submissions, threaded discussion, and the Supporter tier.

The YouTube-first repositioning is in flight, covering landing copy, creator pages, and a video-led entry surface that replaces the older map-first homepage.

Creator Pro is designed and scheduled for Q1 2027.

---

## About

Built solo by Cristian Tohatan.

- 🌐 [cristian-tohatan.com](https://cristian-tohatan.com)
- 💼 [LinkedIn](https://linkedin.com/in/cristian-tohatan)

Source is closed. Happy to walk through the codebase live; the portfolio site has the easiest way to reach me.
