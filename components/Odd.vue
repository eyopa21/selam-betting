<script setup lang="ts">
const props = defineProps<{
  outcomeId: number
  eventId: string | number
  value: string
  odd: string
  matchDetail: {
    id: number | string
    teams: string
    league: string
    date: string
    time: string
  }
}>()
const { addGameToSlip, findSlipById } = useSlips()
function selectBet() {
  addGameToSlip(props)
}

const isSelected = computed(() => {
  return findSlipById.value.games?.find(game => game.outcomeId === props.outcomeId) !== undefined
})
</script>

<template>
  <div
    :class="isSelected ? 'tw-bg-amber-500 tw-text-black tw-dark:bg-red-500' : 'tw-bg-gray-50 dark:tw-bg-gray-700'"
    class="tw-flex tw-cursor-pointer tw-justify-between  tw-rounded tw-border tw-border-secondary-200 tw-p-3 hover:tw-bg-amber-600 active:tw-bg-gray-400 dark:tw-border-none"
    @click="selectBet()"
  >
    <p class="tw-font-medium tw-text-gray-700 dark:tw-text-white">
      {{ value }}
    </p>
    <p class="tw-text-gray-700 dark:tw-text-gray-300">
      {{ odd }}
    </p>
  </div>
</template>
