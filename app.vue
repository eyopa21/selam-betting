<script setup lang="ts">
import { QSpinnerFacebook, useQuasar } from 'quasar'

const $q = useQuasar()

const { $authentication } = useNuxtApp()
const userStore = useUserStore()
if ($authentication.loggedIn.value) {
  const { data, error, status } = await useFetch('/api/auth/user-info', {
    method: 'GET',
    cache: 'reload',
    headers: {
      Authorization: `Bearer ${$authentication.accessToken.value}`,
    },
  })
  if (error.value) {
    useErrorNotifications(error)
  } else if (data.value) {
    // console.log('app', data.value)
    userStore.user = data.value
  }

  watchEffect(() => {
    if (status.value === 'pending') {
      $q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        message: 'Some important process is in progress. Hang on...',
        messageColor: 'black',
      })
    } else if (status.value === 'success') {
      $q.loading.hide()
    } else {
      $q.loading.hide()
    }
  })
}
</script>

<template>
  <NuxtLoadingIndicator :height="7" color="red" />
  <NuxtLayout class="tw-min-h-screen tw-scroll-smooth">
    <NuxtPage />
  </NuxtLayout>
</template>
