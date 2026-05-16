import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const dataEngineering = defineCollection({
  loader: glob({ base: './src/content/data-engineering', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    repo: z.string().optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    readingTime: z.number().optional(),
    cover: image().optional(),
    external: z.string().optional(),
  }),
});

const dataScience = defineCollection({
  loader: glob({ base: './src/content/data-science', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    readingTime: z.number().optional(),
    cover: image().optional(),
    external: z.string().optional(),
  }),
});

const mlEngineering = defineCollection({
  loader: glob({ base: './src/content/ml-engineering', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    readingTime: z.number().optional(),
    cover: image().optional(),
    external: z.string().optional(),
  }),
});

const hobbies = defineCollection({
  loader: glob({ base: './src/content/hobbies', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    sub: z.enum(['travel', 'music', 'languages']),
    tags: z.array(z.string()).default([]),
    summary: z.string().optional(),
    readingTime: z.number().optional(),
    cover: image().optional(),
  }),
});

const podcast = defineCollection({
  loader: glob({ base: './src/content/podcast', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['listening', 'own']),
    show: z.string().optional(),
    episode: z.string().optional(),
    host: z.string().optional(),
    listenUrl: z.string().optional(),
    summary: z.string().optional(),
    cover: image().optional(),
  }),
});

const photos = defineCollection({
  loader: glob({ base: './src/content/photos', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    tags: z.array(z.string()).default([]),
    images: z.array(z.string()).default([]),
    summary: z.string().optional(),
  }),
});

const labNotes = defineCollection({
  loader: glob({ base: './src/content/lab-notes', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string().default('lab-notes'),
    tags: z.array(z.string()).default([]),
    context: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    stack: z.array(z.string()).default([]),
    links: z.object({
      demo: z.string().optional(),
      repo: z.string().optional(),
    }).optional(),
    impact: z.string(),
  }),
});

export const collections = {
  'data-engineering': dataEngineering,
  'data-science': dataScience,
  'ml-engineering': mlEngineering,
  hobbies,
  podcast,
  photos,
  labNotes,
  projects,
};
