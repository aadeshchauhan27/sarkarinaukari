import { defineCollection, z } from 'astro:content';

const jobs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    posts: z.number(),
    lastDate: z.string(),
    category: z.enum(['latest-jobs', 'admit-cards', 'results', 'syllabus', 'answer-key', 'documents', 'admission']),
    featured: z.boolean().default(false),
    salary: z.string().optional(),
    qualification: z.string(),
    location: z.string(),
    applyMode: z.enum(['online', 'offline']),
    publishedAt: z.string(),
    updatedAt: z.date().optional(),
    tags: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const notifications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    type: z.enum(['important', 'new', 'updated']),
    category: z.enum(['admit-card', 'result', 'notification', 'answer-key']),
    publishedAt: z.date(),
    featured: z.boolean().default(false),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

export const collections = {
  jobs,
  notifications,
};