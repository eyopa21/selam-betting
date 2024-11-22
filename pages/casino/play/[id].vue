<script setup lang="ts">
definePageMeta({
  layout: 'casino',

  validate(route) {
    return validateUUID(route.params.id as string)
  },

})

const isIframeError = ref(false)
const loading = ref(true)
const route = useRoute('casino-play-id')

const isMobile = useMediaQuery('(max-width: 768px)')
const isDesktop = useMediaQuery('(min-width: 769px)')

const isPractice = computed(() => {
  if (route.query.practice) {
    return true
  } else {
    return false
  }
})
const { $authentication } = useNuxtApp()
const { data: hmacData, error: hmacError, status: hmacStatus } = await useFetch(`/api/casino/get-hmac?game_id=${route.params.id} `, {
  method: 'get',

  headers: {
    Authorization: `Bearer ${$authentication.accessToken.value}`,
  },
})
const { data, error, status } = await useFetch(`/api/casino/game-detail/${route.params.id}`, {
  method: 'get',

})

if (error.value) {
  useErrorNotifications(error)
} else if (hmacError.value) {
  useErrorNotifications(hmacError)
}
const isDeviceTypeError = computed(() => {
  if (isMobile.value && !data.value?.mobile) {
    return 'This game cannot be played in mobile devices'
  } else if (isDesktop.value && !data.value?.desktop) {
    return 'This game cannot be played in desktop devices'
  } else {
    return null
  }
})
</script>

<template>
  <div class="tw-max-h-screen tw-min-h-screen">
    <div class="tw-m-1 tw-mt-8 tw-h-[calc(100vh-200px)]  md:tw-m-8 md:tw-h-[46rem]">
      <q-card class="text-white tw-relative tw-h-full tw-bg-transparent">
        <div
          v-if="status === 'pending' || hmacStatus === 'pending' || loading"
          class="tw-absolute tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center "
        >
          <q-skeleton class="tw-h-full tw-w-full tw-opacity-40" square />
        </div>

        <div
          v-if="isDeviceTypeError"
          class="tw-absolute tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-bg-primary-700 tw-text-white"
        >
          {{ isDeviceTypeError }}
        </div>

        <div
          v-else-if="error || hmacError || isIframeError"
          class="tw-absolute tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-bg-primary-700 tw-text-white"
        >
          We are unable to fetch the game right now, please try again later
        </div>

        <q-card-section v-else-if="data && hmacData" class="q-pt-none tw-absolute tw-h-full tw-w-full tw-p-1 md:tw-p-4">
          <iframe
            id="gamePlayer"
            :src="isPractice ? `${`${data.play_url}demo`}&${hmacData}` : `${data?.play_url}${$authentication.accessToken.value}&${hmacData}`"
            :allowfullscreen="true" style="width: 100%; height: 100%;" @load="loading = false"
            @error="isIframeError = true" @abort="isIframeError = true"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
