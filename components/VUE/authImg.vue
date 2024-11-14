<script setup lang="ts">
const props = defineProps<{
  url: string
  name?: string
}>()

const getName = computed(() => {
  if (props.name === 'COMMERCIAL BANK OF ETHIOPIA') {
    return 'CBE'
  } else {
    return props.name
  }
})
const { $authentication } = useNuxtApp()
const imageData = ref<string | null>(null)

onMounted(async () => {
  try {
    console.log('proo', props.url)
    const response = await $fetch<Blob>(`http://162.55.223.95:8000${props.url}`, {

      headers: {
        Authorization: `Bearer ${$authentication.accessToken.value}`,
      },
      cache: 'force-cache',
    })
    if (response) {
      imageData.value = URL.createObjectURL(response)
    } else {
      console.error('Failed to fetch the image:')
      useErrorNotifications(ref('Failed to fetch the image'))
    }
  } catch (err) {
    console.error('Failed to fetch the image:', err)
    useErrorNotifications(ref('Failed to fetch the image'))
  }
})
</script>

<template>
  <div v-if="props.name" class="tw-cursor-pointer tw-transition-all tw-duration-500 hover:tw-scale-105">
    <q-img v-if="imageData" fit="scale-down" :src="imageData" :alt="props.name" class="tw-h-20 tw-w-32" />
    <div class="tw-w-full tw-bg-primary-500 tw-text-center tw-capitalize tw-text-white">
      {{ getName }}
    </div>
  </div>
  <div v-else>
    <q-img v-if="imageData" fit="scale-down" :src="imageData" :alt="props.name" class="tw-h-20 tw-w-32" />
  </div>
</template>
