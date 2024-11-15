<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const emit = defineEmits<{
  timeOut: [void]
}>()
const timeLeft = ref(60) // Start with 60 seconds
const interval = 0

function startCountdown() {
  // Clear any existing interval
  clearInterval(interval)

  // Start a new interval
  setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value -= 1
      if (timeLeft.value === 0) {
        emit('timeOut')
      }
    } else {
      clearInterval(interval) // Stop countdown when it reaches 0
    }
  }, 1000)
}

// Automatically start countdown on mount
onMounted(() => {
  startCountdown()
})

// Cleanup on unmount to prevent memory leaks
onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <span>{{ timeLeft }} seconds remaining</span>
</template>
