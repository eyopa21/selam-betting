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
      message: err?.data.message ?? 'Something went wrong, please try again',
      color: 'red',
      timeout: 5000,
    })
  }
}
