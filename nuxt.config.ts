// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },

  css: ['./app/assets/main.css'],

  ui: {
    colorMode: false,
  },

  compatibilityDate: '2024-11-01',

  eslint: {
    config: {
      stylistic: true,
    },
  },

})
