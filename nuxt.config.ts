// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['./app/assets/markdown.css'],

  future: {
    compatibilityVersion: 4,
  },

  googleFonts: {
    families: {
      'Space Mono': [400, 600, 700],
    },
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxt/eslint',
  ],

  eslint: {
    config: {
      stylistic: true
    }
  }
})