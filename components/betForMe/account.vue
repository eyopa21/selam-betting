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
    <div class="text-h6 tw-items-centers tw-flex tw-justify-between tw-font-extrabold tw-leading-tight tw-tracking-tight">
      <div>Your Account</div>
      <q-btn v-if="props.info.profile_picture" :loading="loading" color="primary" @click="request()">
        Send Request
      </q-btn>
    </div>
    <div v-if="props.info.profile_picture " class="tw-p-8">
      <div class="tw-flex tw-gap-4">
        <q-avatar rounded class="tw-size-16">
          <VUEAsyncImg :relative-path="props.info.profile_picture" />
        </q-avatar>
        <p class="tw-text-xl">
          {{ props.info.user_account.first_name }} {{ props.info.user_account.last_name }}
          <br>
          {{ props.info.user_account.phone_number }}
        </p>
      </div>
      <div class="tw-mt-4">
        <p class="tw-text-lg tw-underline">
          Id pictures
        </p>
        <div class="tw-flex tw-gap-4">
          <VUEAsyncImg :relative-path="props.info.profile_picture" />
          <VUEAsyncImg :relative-path="props.info.profile_picture" />
        </div>
      </div>
    </div>
    <div v-else>
      <BetForMeCreateAccount />
    </div>
  </div>
</template>
