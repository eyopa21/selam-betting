// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-quasar-ui", "@nuxtjs/tailwindcss", "@nuxt/image", '@pinia/nuxt', '@vueuse/nuxt',],
  css: ["~/assets/css/main.css"],

  quasar: {
    plugins: [
      'Notify'
    ],
    config: {
      brand: {
        primary: "rgb(var(--secondary-800))",
        secondary: "rgb(var(--secondary-500))",
      }
    },

  },

  runtimeConfig: {
    serverApiKey: process.env.API_KEY,
    restApiEndpoint: process.env.API_BASE_URL,
  },

  compatibilityDate: "2024-07-04",
});