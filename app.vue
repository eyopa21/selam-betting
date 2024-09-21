<script setup lang="ts">
const { fetchUserInfo } = useUserInfo()
await fetchUserInfo()
</script>

<template>
  <ClientOnly>
    <NuxtLoadingIndicator :height="5" color="linear-gradient(to right, rgba(255,255,255,1), rgba(0,0,255,0.8))" />
    <NuxtLayout class="tw-min-h-screen tw-scroll-smooth">
      <NuxtPage />
    </NuxtLayout>
  </ClientOnly>
</template>
