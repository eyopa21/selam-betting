import type { SignInInputs, SignUpInputs } from "~/types/auth";
import type { RegisterError } from "~/types/register";
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
            const res = await $fetch<{ data: Auth, error: RegisterError }>(`/api/auth/register`, {
                method: 'POST',
                
                body: input,
            });
            console.log("respon", res);
            if (res.error) {
                let firstError = null;
                if (res.error && res.error[key] && res.error[key].length) {
                    console.log("key", key, res.error[key]);
                    firstError = res.error[key][0];
                    
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
        loading.value = true;
        error.value = null;
        try {
            const res = await $fetch<{data: {message: string},error: {error: string}}>(`/api/sendAuthOtp/`, {
                method: 'POST',
                body: {
                    email: email
                },
            });
            console.log("res", res);
            if (res.error) {
                return res?.error
            }

            return res.data;
        } catch (err) {
            error.value = "couldn't send otp"
        } finally {
            loading.value = false;
        }
    }

    const resetPassword = async (otp: string, newPassword: string) => {
        loading.value = true;
        error.value = null;
        try {
            const res = await $fetch<{data: {Message: string}, error: {Error: string}}>(`/api/resetPassword/`, {
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
            console.log("res", res);
            if (res.error) {
                return {
                    error: res.error
                }
            }

            return res.data;
        } catch (err) {
            error.value = "couldn't reset pasword"
        } finally {
            loading.value = false
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
