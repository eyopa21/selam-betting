// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-quasar-ui',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
  ],
  css: ['~/assets/css/main.css'],

  quasar: {
    plugins: [
      'Notify',
    ],
    config: {
      brand: {
        primary: 'rgb(var(--secondary-800))',
        secondary: 'rgb(var(--secondary-500))',
      },
    },

  },

  eslint: {
    config: { stylistic: false, standalone: false },
  },
  runtimeConfig: {
    public: {
      financeApiEndpoint: '',
    },
    serverApiKey: '',
    restApiEndpoint: '',
    baseApiEndpoint: '',
  },

  compatibilityDate: '2024-07-04',
})
