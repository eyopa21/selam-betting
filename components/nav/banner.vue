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
    <q-carousel-slide name="1" img-src="/images/image 63.png" class="tw-h-full tw-w-full" />
    <q-carousel-slide name="6" img-src="/images/image 64.png" class="tw-h-full tw-w-full" />
    <q-carousel-slide name="7" img-src="/images/image 65.png" class="tw-h-full tw-w-full" />
    <q-carousel-slide name="2" img-src="/images/Fenan pay.png" class="tw-h-full tw-w-full" />
    <q-carousel-slide name="3" img-src="/images/Fly emrates.png" class="tw-h-full tw-w-full" />
    <q-carousel-slide name="4" img-src="/images/Pepsi banner.png" class="tw-h-full tw-w-full" />
    <q-carousel-slide name="5" img-src="/images/ITSC banner.png" class="tw-h-full tw-w-full" />
  </q-carousel>
</template>
