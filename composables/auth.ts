import type { SignInInputs, SignUpInputs } from "~/types/auth";

export const useAuth = () => {
    const config = useRuntimeConfig();
    const user = ref(null);
    const token = useCookie('auth_token');
    const loading = ref(false);
    const error = ref<null | string>(null);

    const login = async (input: SignInInputs) => {
        loading.value = true;
        error.value = null;
        try {
            const { data, error: fetchError } = await useFetch(`/api/login/`, {
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
            return {
                data: { success: true }
            };
        } catch (err) {
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

            return data.value;
        } catch (err) {
            error.value = `Registration failed: ${err}`;
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
