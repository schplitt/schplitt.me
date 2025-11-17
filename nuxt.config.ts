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

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'catppuccin-latte',
        },
      },
    },
  },

  ui: {
    colorMode: false,
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://schplitt.me',
    },
  },

  compatibilityDate: '2024-11-01',

  eslint: {
    config: {
      stylistic: true,
    },
  },

  icon: {
    clientBundle: {
      scan: true,
    },
    provider: 'iconify',
    serverBundle: false,
  },

})
