export default defineNuxtPlugin({
  name: 'authenticated-fetch',
  dependsOn: ['nuxt:router', 'authentication'],
  async setup(nuxtApp) {
    const { $authentication } = useNuxtApp()
    const accessToken = $authentication.session

    const runtimeConfig = useRuntimeConfig()

    const authenticatedFetch = $fetch.create({
      retry: 10,
      baseURL: runtimeConfig.baseApiEndpoint,
      onRequest({ options }) {
        if (!$authentication.loggedIn.value || accessToken.value) {
          const headers = options.headers ||= {}
          if (Array.isArray(headers)) {
            headers.push(['Authorization', `Bearer ${accessToken.value}`])
          } else if (headers instanceof Headers) {
            headers.set('Authorization', `Bearer ${accessToken.value}`)
            headers.set('X-API-KEY', runtimeConfig.serverApiKey)
          } else {
            headers.Authorization = `Bearer ${accessToken.value}`
          }
        } else {
          navigateTo('/')
          throw new Error(`[Auth Error] Authenticated fetch must be called after an authentication session has been established`)
        }
      },
      async onResponseError(error) {
        if (error.response.status === 401) {
          await nuxtApp.runWithContext(() => {
            console.log('hello')
          })
        }
        console.log(error)
        throw error
      },
    })

    // Expose to useNuxtApp().$authenticatedFetch
    return {
      provide: {
        authenticatedFetch,
      },
    }
  },
})
