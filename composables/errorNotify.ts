import { Notify } from 'quasar'

import type { NuxtError } from '#app'

export function useErrorNotifications(error: Ref<unknown>) {
  // const { handleError } = useErrorHandler()

  const err = error.value as NuxtError
  // handleError(err)
  if (typeof unref(error) === 'string') {
    Notify.create({
      message: error.value as string,
      color: 'red',
    })
  } else {
    Notify.create({
      message: err?.message,
      color: 'red',
    })
  }
}
