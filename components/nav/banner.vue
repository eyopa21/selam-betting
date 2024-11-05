<script setup lang="ts">
const general = useGeneralClientInfo()
const banners = general.generalClientInfo?.banners
const slide = ref('1')
</script>

<template>
  <q-carousel
    v-model="slide" transition-prev="slide-right" transition-next="slide-left" infinite animated
    control-color="white" navigation padding arrows height="300px" :autoplay="true"
    class="text-white shadow-1 rounded-border"
  >
    <q-carousel-slide v-for="i in banners" :key="i.id" :name="i.note" :img-src="i.image" class="tw-h-full tw-w-full" />
  </q-carousel>
</template>
