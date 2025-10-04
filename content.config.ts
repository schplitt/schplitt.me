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
        date: z.date(),
        title: z.string().min(5),
        description: z.string().min(10),
      }),
    }),
  },
})
