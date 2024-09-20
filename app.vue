<script setup lang="ts">
const { fetchUserInfo } = useUserInfo()
await fetchUserInfo()
</script>

<template>
  <ClientOnly>
    <NuxtLoadingIndicator :height="7" color="red" />
    <NuxtLayout class="tw-min-h-screen tw-scroll-smooth">
      <NuxtPage />
    </NuxtLayout>
  </ClientOnly>
</template>
