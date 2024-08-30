import { defineStore } from 'pinia'
type UserInfo = {
    accountBalance?: string

}
export const useUserStore = defineStore('user', () => {
    const user = ref<UserInfo>({
        accountBalance: '0'
    })
    return {
        user,
    }
})
