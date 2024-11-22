<script setup lang="ts">
const general = useGeneralClientInfo()
const ads = general.generalClientInfo?.ads
const slide = ref('1')
</script>

<template>
  <q-carousel
    v-model="slide"
    control-color="white" navigation padding thumbnails height="300px" :autoplay="true"
    class="text-white shadow-1 rounded-border"
  >
    <q-carousel-slide v-for="i in ads" :key="i.id" :name="i.content" :img-src="i.image_url" class="tw-h-full tw-w-full">
      <!-- <div class="absolute-bottom custom-caption tw-bg-primary-400 tw-p-4">
        <div class="text-h2">
          {{ i.notes }}
        </div>
        <div class="text-subtitle1">
          {{ i.content }}
        </div>
      </div> -->
    </q-carousel-slide>
  </q-carousel>
</template>
