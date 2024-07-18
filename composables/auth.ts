import type { SignInInputs, SignUpInputs } from "~/types/auth";
type loginResult = {
    access: string
    refresh: string
}
import type {Auth} from '~/types/login'
export const useAuth = () => {
    const { $authentication } = useNuxtApp();
    const userStore = useUserStore()
    const config = useRuntimeConfig();
    const loading = ref(false);
    const error = ref<null | string>(null);

    const $q = useQuasar();

    const login = async (input: SignInInputs) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await $fetch <{ data: loginResult, error: string}>(`/api/auth/login/`, {
                method: 'POST',
                
                body: input,
            });
            console.log("res", response);

            if (response?.error) {
                throw new Error(response?.error);
            }

            if (response?.data) {
                const res = await $fetch <{data: Auth}>(`/api/getUser/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-KEY': config.serverApiKey,
                    },
                    body: {
                        access: response.data.access
                    },
                });
                console.log("ressss", res);
                $authentication.updateSession({
                    access_token: response.data?.access,
                    refresh_token: response.data?.refresh,
                    user_id: res.data.id,
                    user_name: res.data.username,
                    email: res.data.email,
                    phone_number: res.data.phone_number,
                });

                return {
                    data: { success: true }
                };
            }

        } catch (err) {
            error.value = `${err}` || 'Login failed';
        } finally {
            loading.value = false;
        }
    };

    const register = async (input: SignUpInputs) => {
        loading.value = true;
        error.value = null;
        try {
            const res = await $fetch(`/api/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': config.serverApiKey,
                },
                body: input,
            });
            if (res.error) {
                let firstError = null;
                for (const key in res.error) {
                    if (res.error[key] && res.error[key].length > 0) {
                        firstError = res.error[key][0];
                        break;
                    }
                }
                return {
                    error: firstError
                }
            }
            if (res.data) {
                const email = res.data.email
                const optRes = await sendOtp(email)
                return optRes
            }
        } catch (err) {
            error.value = `Registration failed: ${err}`;
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const sendOtp = async (email: string) => {
        try {
            const res = await $fetch(`/api/sendAuthOtp/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': config.serverApiKey,
                },
                body: {
                    email: email
                },
            });
            if (res.error) {
                return {
                    error: res.error
                }
            }

            return res.data;
        } catch (err) {
            error.value = "couldn't send otp"
        }
    }

    const resetPassword = async (otp: string, newPassword: string) => {
        try {
            const res = await $fetch(`/api/resetPassword/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': config.serverApiKey,
                },
                body: {
                    otp: otp,
                    new_password: newPassword
                },
            });
            if (res.error) {
                return {
                    error: res.error
                }
            }

            return res.data;
        } catch (err) {
            error.value = "couldn't reset pasword"
        }
    }

    const verifyOtp = async (email: string, otp: string) => {
        loading.value = true;
        error.value = null;
        try {
            const { data, error: fetchError } = await useFetch(`/api/verifyOtp/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': config.serverApiKey,
                },
                body: {
                    email: email,
                    otp: otp
                },
            });

            if (fetchError.value) {
                throw new Error(fetchError.value.message);
            }
            return data.value;
        } catch (err) {
            error.value = `Otp verification failed: ${err}`;
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const logout = () => {
        userStore.setUser(null)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        $q.notify({
            message: `Successfully logged out.`,
            color: "green",
        });
    };

    return {
        login,
        register,
        logout,
        verifyOtp,
        sendOtp,
        resetPassword,
        loading,
        error,
    };
};
