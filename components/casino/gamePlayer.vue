<script setup lang="ts">
const props = defineProps<{
  gameLink: string
  gameId: string
}>()

const emit = defineEmits<{
  close: [void]
}>()
const loading = ref(true)
const dialog = ref(true)
const { fetchUserInfo } = useUserInfo()
const { $authentication } = useNuxtApp()
const { data, error } = await useFetch(`/api/casino/get-hmac?game_id=${props.gameId} `, {
  method: 'get',
  headers: {
    Authorization: `Bearer ${$authentication.accessToken.value}`,
  },
})
if (error.value) {
  useErrorNotifications(error)
}

onBeforeUnmount(async () => {
  await fetchUserInfo()
})
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="dialog" persistent maximized transition-show="slide-up" transition-hide="slide-down">
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />
          <q-btn v-close-popup dense flat icon="close" @click="emit('close')">
            <q-tooltip class="bg-white text-primary">
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>

        <div v-if="loading" class="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center">
          <q-spinner size="xl" />
        </div>

        <q-card-section v-if="data" class="q-pt-none tw-h-full">
          <iframe

            id="gamePlayer"
            :src=" `${props.gameLink + $authentication.accessToken.value}&${data}`"
            :allowfullscreen="true"
            style="width: 100%; height: 100%;" @load="loading = false"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
