import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        index: defineCollection({
            type: 'page',
            source: 'index.md'
        }),
        posts: defineCollection({
            type: 'page',
            source: "posts/**/*.md",
        })
    }
})
