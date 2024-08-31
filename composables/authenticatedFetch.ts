import { defu } from 'defu'
import type { UseFetchOptions } from '#app'
import type { NitroFetchRequest } from '#build'

export function useAuthenticatedFetch<T>(url: NitroFetchRequest, options: UseFetchOptions<T>) {
  const { $authentication } = useNuxtApp()
  const router = useRouter()
  if (!$authentication.loggedIn.value) {
    throw new Error(`[Auth Error] Authenticated fetch must be called after an authentication session has been established`)
  }
  const runtimeConfig = useRuntimeConfig()
  const defaults = {
    headers: {
      Authorization: `Bearer ${$authentication.accessToken.value}`,
    },
    async onResponseError(error) {
      if (error.response.status === 401) {
        const currentPath = router.currentRoute.value.path
        return navigateTo('/test')
      }
      throw error
    },
  } satisfies UseFetchOptions<T>

  const params = defu(options, defaults)
  return useFetch(url, params)
}
