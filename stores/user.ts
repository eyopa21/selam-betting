import { defineStore } from 'pinia'
type UserInfo = {
    accountBalance?: string
    accountNumber?: string

}
export const useUserStore = defineStore('user', () => {
    const user = ref<UserInfo>({
        accountBalance: '0',
        accountNumber: undefined
    })
    return {
        user,
    }
})
