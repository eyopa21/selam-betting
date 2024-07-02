import type { SignInInputs, SignUpInputs } from "~/types/auth";

export const useAuth = () => {
    const userStore = useUserStore()
    const config = useRuntimeConfig();
    const loading = ref(false);
    const error = ref<null | string>(null);

    const $q = useQuasar();

    const login = async (input: SignInInputs) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await $fetch(`/api/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': config.serverApiKey,
                },
                body: input,
            });

            if (response?.error) {
                throw new Error(response?.error);
            }

            if (response?.data) {
                localStorage.setItem('access_token', response.data?.access)
                localStorage.setItem('refresh_token', response.data?.refresh)
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
                userStore.setUser((res.data))

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
            const { data, error: fetchError } = await useFetch(`/api/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': config.serverApiKey,
                },
                body: input,
            });

            if (fetchError.value) {
                throw new Error(fetchError.value.message);
            }
            if (data.value?.data) {
                const email = data.value?.data?.email
                try {
                    console.log('sending otp');

                    const { data, error, status } = await useFetch(`/api/sendAuthOtp/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-API-KEY': config.serverApiKey,
                        },
                        body: {
                            email: email
                        },
                    });
                    if (error.value) {
                        throw new Error(error.value.message);
                    }

                    return data.value;
                } catch (err) {
                    error.value = "couldn't send otp"
                }
            }
        } catch (err) {
            error.value = `Registration failed: ${err}`;
            throw err;
        } finally {
            loading.value = false;
        }
    };

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
        loading,
        error,
    };
};
