<template>
  <div
    class="tw-flex tw-justify-between tw-bg-secondary-700 tw-py-[2px] tw-px-1 tw-rounded tw-w-full tw-mr-2"
  >
    <p class="tw-font-semibold tw-text-white">{{ value }}</p>
    <p class="tw-text-gray-300">{{ odd }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string;
  odd: string;
}>();
</script>
