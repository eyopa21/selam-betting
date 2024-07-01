<template>
  <button @click="selectBet()"
    class="tw-flex tw-justify-between tw-bg-gray-50 dark:tw-bg-secondary-700 tw-py-[2px] tw-px-1 tw-rounded tw-border tw-border-secondary-200 dark:tw-border-none active:tw-bg-gray-400">
    <p class="tw-font-medium dark:tw-text-white tw-text-gray-700">
      {{ value }}
    </p>
    <p class="dark:tw-text-gray-300 tw-text-gray-700">{{ odd }} </p>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string;
  odd: number | string;
  id?: string | number;
  matchDetail: {
    id: number,
    teams: string,
    league: string
    date: string
  }
}>();

function selectBet() {
  console.log("wow selected ", props)
}
</script>
