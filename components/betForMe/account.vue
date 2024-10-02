<script setup lang="ts">
import type { BetForMeRoot } from '~/types/betForMe'

const props = defineProps<{
  info: BetForMeRoot
}>()
const { $authentication } = useNuxtApp()
const loading = ref(false)
async function request() {
  loading.value = true
  try {
    const response = await $fetch('/api/betForMe/request', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
    })
    if (response) {
      useSuccessNotification('You have submitted your request, and we will notify the result soon')
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div class="text-h6 tw-font-extrabold tw-leading-tight tw-tracking-tight">
      Your Account
    </div>
    <div class="tw-p-8">
      <q-avatar rounded>
        <img src="/arsenal.jpg" alt="">
      </q-avatar>
      <div>
        {{ props.info.user_account.first_name }} {{ props.info.user_account.last_name }}
      </div>
      Id picture
      <div class="tw-flex tw-gap-4">
        <q-img
          src="/arsenal.jpg"
          spinner-color="white"
          style="height: 140px; max-width: 150px"
        />
        <q-img
          src="/arsenal.jpg"
          spinner-color="white"
          style="height: 140px; max-width: 150px"
        />
      </div>
      <div v-if="props.info.is_bet_for_me_agent">
        You are aready an agent
      </div>
      <div class="tw-m-8">
        <q-btn :disable="props.info.is_bet_for_me_agent" :loading="loading" @click="request()">
          Send Request
        </q-btn>
      </div>
    </div>
  </div>
</template>
