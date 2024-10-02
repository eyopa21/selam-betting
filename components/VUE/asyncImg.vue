<script setup lang="ts">
const props = defineProps<{
  relativePath: string
}>()
const image = await getAuthenticatedImage(props.relativePath)
</script>

<template>
  <img :src="image">
</template>
