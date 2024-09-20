import { QSpinnerFacebook, useQuasar } from 'quasar'

export function useUserInfo() {
  const $q = useQuasar()

  const { $authentication } = useNuxtApp()
  const userStore = useUserStore()
  const loading = ref(false)
  async function fetchUserInfo() {
    loading.value = true
    try {
      const response = await $fetch('/api/auth/user-info', {
        method: 'GET',
        cache: 'reload',
        immediate: false,
        headers: {
          Authorization: `Bearer ${$authentication.accessToken.value}`,
        },
      })

      userStore.user = response
    } catch (err) {
      useErrorNotifications(ref(err))
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (loading.value) {
      $q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        message: 'Loading user info. Hang on...',
        messageColor: 'black',
      })
    } else {
      $q.loading.hide()
    }
  })

  return {
    fetchUserInfo,
  }
}
