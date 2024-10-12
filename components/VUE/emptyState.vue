<script setup lang="ts">
const props = withDefaults(defineProps<
  {
    type?: string
  }
>(), {
  type: 'match',
})
</script>

<template>
  <div>
    <div class="tw-h-64 tw-p-4 tw-text-4xl tw-text-gray-400">
      Sorry, No {{ props.type }} found
    </div>
  </div>
</template>
