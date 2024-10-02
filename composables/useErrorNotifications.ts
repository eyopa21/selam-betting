import { Notify } from 'quasar'
import type { NuxtError } from '#app'

export function useErrorNotifications(
  error: Ref<unknown>,
) {
  const err = error.value as NuxtError
  // if (error.value && error.value.statusCode === 401) {
  //   error.value.message = error.value.message
  // }

  const route = useRoute()
  if (err.statusCode === 401 && route.meta.pageType === 'authenticated') {
    navigateTo('/')
  }

  Notify.create({
    message: err?.message,
    color: 'red',
  })
}
