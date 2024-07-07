<template>
  <div @click="selectBet()"
    :class="isSelected ? 'tw-bg-blue-900 tw-text-black tw-dark:bg-red-500' : 'tw-bg-gray-50 dark:tw-bg-gray-700'"
    class="tw-flex tw-justify-between tw-cursor-pointer  tw-py-3 tw-px-3 hover:tw-bg-blue-800 tw-rounded tw-border tw-border-secondary-200 dark:tw-border-none active:tw-bg-gray-400">
    <p class="tw-font-medium dark:tw-text-white tw-text-gray-700">
      {{ value }}
    </p>
    <p class="dark:tw-text-gray-300 tw-text-gray-700">{{ odd }} </p>
  </div>
</template>

<script setup lang="ts">

const { addGameToSlip, findSlipById } = useSlips();
const props = defineProps<{
  outcomeId: number,
  eventId: string | number;
  value: string;
  odd: string;
  matchDetail: {
    id: number | string,
    teams: string,
    league: string
    date: string
    time: string
  }
}>();

function selectBet() {
  addGameToSlip(props)
}

const isSelected = computed(() => {
  return findSlipById.value.games?.find(game => game.outcomeId === props.outcomeId) !== undefined
})
</script>
