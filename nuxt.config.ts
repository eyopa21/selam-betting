// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-quasar-ui", "@nuxtjs/tailwindcss", "@nuxt/image"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://162.55.223.95:8000',
      apiKey: process.env.API_KEY || 'RUDKb1iueBuAtFhYGKQxyXhSc2rVKYxe5TNIuTxtEDv6o2jcefPb6p7jXeZlu_LgHExd-_USDVruUS2LjHrSnTOXQnrhIrw9vHLlg7eJDNg'
    }
  },
  quasar: {
    config: {
      brand: {
        primary: "rgb(var(--secondary-800))",
        secondary: "rgb(var(--secondary-500))",
      },
    },
  }
});