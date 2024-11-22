<script setup lang="ts">
const props = defineProps<{
  relativePath: string
}>()
const image = await getAuthenticatedImage(props.relativePath)
</script>

<template>
  <q-img :src="image" class="tw-h-full " alt="picture" />
</template>
