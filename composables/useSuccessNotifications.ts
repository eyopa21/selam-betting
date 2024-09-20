import { Notify } from 'quasar'

export function useSuccessNotification(
  message: string,
) {
  Notify.create({
    message,
    color: 'green',
  })
}
