<template>
  <div>
    <NuxtImg src="/images/HeroImage.png" class="tw-mb-3 tw-w-full" />
    <GamesList />
  </div>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp();

const { data, error, pending } = await $api.sports.getSports();
console.log(data.value);
</script>
