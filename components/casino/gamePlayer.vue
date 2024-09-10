<script setup lang="ts">
const props = defineProps<{
  gameLink: string
}>()

const emit = defineEmits<{
  close: [void]
}>()

const dialog = ref(true)
const { $authentication } = useNuxtApp()
const { data, error } = await useFetch('/api/casino/get-hmac', {
  method: 'get',
  headers: {
    Authorization: `Bearer ${$authentication.accessToken.value}`,
  },
})
if (error.value) {
  useErrorNotifications(error)
} else {
  console.log(`${props.gameLink + $authentication.accessToken.value}&${data.value}`)
  console.log('hmac', data.value)
}
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

        <q-card-section>
          <div class="text-h6">
            Play
          </div>
        </q-card-section>

        <q-card-section v-if="data" class="q-pt-none tw-h-full">
          {{ `${props.gameLink}&${data}` }}
          <iframe
            id="contentiframe"
            :src=" `${props.gameLink + $authentication.accessToken.value}&${data}`"
            :allowfullscreen="true" style="width: 100%; height: 100%;"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
