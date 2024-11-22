<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  message?: string
  search: boolean
}>(), {
  search: false,
})

const emit = defineEmits<{
  back: [void]
}>()
</script>

<template>
  <div class="tw-w-full tw-text-white ">
    <div class="tw-flex tw-w-full tw-flex-col tw-items-center tw-justify-center tw-text-center">
      <q-icon name="ion:sad-outline" size="156" class="tw-mb-10 tw-opacity-25" />
      <h2 v-if="props.search" class="tw-text-2xl tw-font-bold">
        Oops, We couldn't find what you have been looking for!!
      </h2>
      <h2 v-else class="tw-text-2xl tw-font-bold">
        No {{ props.title }} found
      </h2>
      <p v-if="props.search" class="tw-mt-4 tw-max-w-xs">
        Try adjusting your search or filter to find what you're looking for.
      </p>
      <p v-else class="tw-mt-4 tw-max-w-xs">
        {{ props.message }}
      </p>
      <div class="tw-mt-8">
        <q-btn v-if="props.search" color="secondary" @click="emit('back')">
          Get back
        </q-btn>
      </div>
    </div>
  </div>
</template>
