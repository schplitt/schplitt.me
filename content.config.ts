import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.md',
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        tags: z.array(z.string()).optional(),
        icon: z.string(),
        date: z.string().date(),
        title: z.string(),
        description: z.string().optional(),
      }),
    }),
  },
})
