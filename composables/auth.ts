import type { SignUpInputs } from "~/types/auth";

export const useAuth = () => {
    const config = useRuntimeConfig();
    const user = ref(null);
    const token = useCookie('auth_token');
    const loading = ref(false);
    const error = ref<null | string>(null);

    const login = async (email: string, password: string) => {
        loading.value = true;
        error.value = null;
        try {
            const { data, error: fetchError } = await useFetch(`${config.restApiEndpoint}/betting/api/v1/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': config.serverApiKey,
                },
                body: JSON.stringify({ email, password }),
            });

            if (fetchError.value) {
                throw new Error(fetchError.value.message);
            }
            // user.value = data.value?.user;
            // token.value = data.value?.token;
            return data.value;
        } catch (err) {
            console.error('Login failed:', err);
            error.value = err.message || 'Login failed';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const register = async (input: SignUpInputs) => {
        loading.value = true;
        error.value = null;
        try {
            const { data, error: fetchError } = await useFetch(`/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': config.serverApiKey,
                },
                body: JSON.stringify(input),
            });
            console.log("this is register response", data);


            if (fetchError.value) {
                throw new Error(fetchError.value.message);
            }

            return data.value;
        } catch (err) {
            console.error('Registration failed:', err);
            error.value = 'Registration failed';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const logout = () => {
        user.value = null;
        token.value = null;
    };

    return {
        user,
        login,
        register,
        logout,
        loading,
        error,
    };
};
