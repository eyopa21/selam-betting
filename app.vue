<script setup lang="ts">
const general = useGeneralClientInfo()
const { fetchUserInfo } = useUserInfo()
await fetchUserInfo()

const { data, error } = await useFetch('/api/general/get-client-preference', {
  method: 'get',
  cache: 'force-cache',
})

if (data.value) {
  general.setGeneralInfo(data.value)
}
</script>

<template>
  <div>
    <div v-if="error">
      <VUEMainError />
    </div>
    <div v-else>
      <NuxtLoadingIndicator :height="5" color="linear-gradient(to right, rgba(255,255,255,1), rgba(0,0,255,0.8))" />
      <NuxtLayout class="tw-min-h-screen tw-scroll-smooth">
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>
