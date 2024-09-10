import { useQuasar } from 'quasar'
import type { NuxtError } from '#app'

export function useErrorNotifications(
  error: Ref<unknown>,
) {
  const $q = useQuasar()
  const err = error.value as NuxtError
  // if (error.value && error.value.statusCode === 401) {
  //   error.value.message = error.value.message
  // }

  $q.notify({
    message: err?.message,
  })
}
