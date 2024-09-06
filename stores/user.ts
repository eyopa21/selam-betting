import { defineStore } from 'pinia'
import type { Root } from '~/types/auth/user-info'

export const useUserStore = defineStore('user', () => {
  const user = ref<Root>()
  return {
    user,
  }
})
