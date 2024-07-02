import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref<[any] | null>(null)

    const setUser = async (payload: any) => {
        user.value = payload
    }

    return {
        user,
        setUser
    }
})
