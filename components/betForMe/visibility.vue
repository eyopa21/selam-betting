<script setup lang="ts">
const { $authentication } = useNuxtApp()
const loading = ref(false)

async function toggleVisibility(value: boolean) {
  loading.value = true
  try {
    const response = await $fetch(`/api/betForMe/update-visiblity`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      body: {
        visibility: value,
      },
    })
    if (response) {
      useSuccessNotification('Visibility Updated Successfully')
    }
  } catch (err) {
    useErrorNotifications(ref(err))
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="text-h6 tw-font-semibold tw-uppercase tw-tracking-tighter">
    Make My self Visible
  </div>
  <div class="tw-m-8 tw-space-x-4">
    <q-btn :loading color="red-10" @click="toggleVisibility(false)">
      Hide visibility
    </q-btn>
    <q-btn :loading color="green-10" @click="toggleVisibility(true)">
      Make me Visible
    </q-btn>
  </div>
</template>
