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
  <div v-if="props.name" class="tw-flex tw-cursor-pointer tw-flex-col tw-items-center tw-transition-all tw-duration-500 ">
    <q-img v-if="imageData" fit="scale-down" :src="imageData" :alt="props.name" class="tw-h-24 tw-w-24 tw-object-fill" />
    <div class="tw-relative  tw-mt-2  tw-p-1 tw-capitalize ">
      <p class="bg-primary tw-rounded-full tw-px-3 tw-text-white">
        {{ getName }}
      </p>
    </div>
  </div>
  <div v-else>
    <q-img v-if="imageData" fit="scale-down" :src="imageData" :alt="props.name" class="tw-h-32 tw-w-32" />
  </div>
</template>
