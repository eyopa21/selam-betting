import type { SignInInputs, SignUpInputs } from '~/types/auth'
import type { RegisterError } from '~/types/register'
import type { Auth } from '~/types/login'

export function useAuth() {
  const { $authentication } = useNuxtApp()
  const userStore = useUserStore()
  const loading = ref(false)
  const error = ref<null | string>(null)

  const $q = useQuasar()

  const login = async (input: SignInInputs) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`/api/auth/login/`, {
        method: 'POST',
        body: input,
      })
      if (response) {
        const res = await $fetch(`/api/auth/user-info`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${response.access}`,
          },
        })
        $authentication.updateSession({
          access_token: response?.access,
          refresh_token: response?.refresh,
          user_id: res.user.id,
          user_name: res.user.username,
          email: res.user.email,
          phone_number: res.user.phone_number,
        })
        userStore.user = res

        return {
          data: { success: true },
        }
      }
    } catch (err) {
      error.value = `${err}` || 'Login failed'
    } finally {
      loading.value = false
    }
  }

  const register = async (input: SignUpInputs) => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch<{ data: Auth, error: RegisterError }>(`/api/auth/register`, {
        method: 'POST',
        body: input,
      })
      if (res.data) {
        const email = res.data.email
        const optRes = await sendOtp(email)
        return optRes
      } else if (res.error) {
        let firstError = null
        Object.entries(res.error).forEach(([key, value]) => {
          if (value.length > 0) {
            firstError = value[0]
          } else {
            firstError = 'Connection Error'
          }
        })
        return {
          error: firstError ?? undefined,
        }
      }
    } catch (err) {
      console.log('er', err)
      error.value = `Registration failed: ${err}`
      throw err
    } finally {
      loading.value = false
    }
  }
  const sendOtp = async (email: string) => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch(`/api/auth/send-otp`, {
        method: 'POST',
        body: {
          email,
        },
      })
      return res.message
    } catch (err) {
      // useErrorNotifications(ref(err))
      throw new Error(err as string)
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (otp: string, newPassword: string) => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch(`/api/auth/reset-password`, {
        method: 'POST',
        body: {
          otp,
          new_password: newPassword,
        },
      })
      return res.Message
    } catch (err) {
      // useErrorNotifications(ref(err))
      throw new Error(err as string)
    } finally {
      loading.value = false
    }
  }

  const verifyOtp = async (email: string, otp: string) => {
    loading.value = true
    error.value = null
    try {
      const res = await $fetch(`/api/auth/verify-otp`, {
        method: 'POST',
        body: {
          email,
          otp,
        },
      })
      return res.message
    } catch (err) {
      throw new Error(err as string)
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    $authentication.logout()
    $q.notify({
      message: `Successfully logged out.`,
      color: 'green',
    })
  }

  return {
    login,
    register,
    logout,
    verifyOtp,
    sendOtp,
    resetPassword,
    loading,
    error,
  }
}
