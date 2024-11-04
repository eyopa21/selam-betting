import { Notify } from 'quasar'

import type { NuxtError } from '#app'
import { useNuxtApp } from '#app'

export function useErrorNotifications(error: Ref<unknown>) {
//   const { $authentication } = useNuxtApp()
  const err = error.value as NuxtError
  parseErrorNotification(err)
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
