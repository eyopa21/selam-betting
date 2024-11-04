import type { NuxtError } from '#app'

export function parseErrorNotification(error: NuxtError) {
  const { $authentication } = useNuxtApp()
  if (error.statusCode === 401) {
    $authentication.logout()
    navigateTo('/')
  }
}
