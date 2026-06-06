import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One folder per event under content/events/<slug>/index.md (at the repo root).
// Photos live next to it in a `photos/` subfolder and are picked up
// automatically by the Gallery component — they are NOT listed here.
// Paths here are relative to this Astro project (web/), so the repo-root
// content/ folder is one level up.
const events = defineCollection({
  loader: glob({ pattern: '**/index.md', base: '../content/events' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      startDate: z.date(),
      endDate: z.date(),
      location: z.string(),
      // Short teaser shown on event cards.
      summary: z.string(),
      // Optional list of workshops that happened that year.
      workshops: z.array(z.string()).default([]),
      // Cover image, validated and optimized. Path is relative to index.md,
      // e.g. "./photos/cover.jpg".
      cover: image().optional(),
      // Hide an event from listings without deleting it.
      draft: z.boolean().default(false),
    }),
});

// Editable prose for the homepage (home.md). Non-technical maintainers edit
// this Markdown file; no code changes needed.
const site = defineCollection({
  loader: glob({ pattern: '*.md', base: '../content/site' }),
  schema: z.object({
    title: z.string().optional(),
    // The big headline + one-line tagline in the hero:
    heroTitle: z.string().optional(),
    tagline: z.string().optional(),
  }),
});

export const collections = { events, site };
