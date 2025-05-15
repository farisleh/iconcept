// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['vuetify-nuxt-module', '@pinia/nuxt'],
  css: ['@/assets/css/main.css'],
  nitro: {
    imports: {
      dirs: ['server/types', 'server/services']
    },
    experimental: {
      tasks: true
    },
  }
})