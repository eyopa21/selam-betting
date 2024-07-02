import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref<[any] | null>(null)
    const config = useRuntimeConfig();
    const loadingUser = ref(false)

    const setUser = async (payload: any) => {
        user.value = payload
    }

    const getUser = async () => {
        loadingUser.value = true
        const token = localStorage.getItem('access_token')
        if (token) {
            const res = await $fetch(`/api/getUser/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': config.serverApiKey,
                },
                body: {
                    access: localStorage.getItem('access_token')
                },
            });
            user.value = res.data
        }
        loadingUser.value = false
    }

    return {
        user,
        setUser,
        getUser,
        loadingUser
    }
})
