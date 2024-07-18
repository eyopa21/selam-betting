

import type { AuthSessionSchema } from '~/types/login'



export default defineNuxtPlugin({
    name: 'authentication',
    async setup() {
        // Temporarily remove decode function due to nuxt issue (see https://github.com/nuxt/nuxt/issues/27246)
        const sessionCookie = useCookie('auth_session', {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            sameSite: 'lax',
        })
        const session = computed(() => {
            if (!sessionCookie.value) {
                return null
            }
            try {
                if (typeof sessionCookie.value === 'object') {
                    const result = sessionCookie.value
                    return result
                }
                const data = JSON.parse(sessionCookie.value)

                return data as AuthSessionSchema
            } catch (error) {
                console.warn(`Error parsing session cookie, received value that is not JSON serializable (${sessionCookie.value})`)
                return null
            }
        })

        const loggedIn = computed(() => {

            return session.value !== null && typeof session.value.access_token === 'string'
        })

        const accessToken = computed(() => {
            if (loggedIn.value) {
                return session.value?.access_token ?? null
            }

            return null
        })
        const userId = computed(() => {
            if (loggedIn.value) {
                return session.value?.user_id ?? null
            }
            return null
        })
        const updateSession = (candidate: AuthSessionSchema | null) => {
            sessionCookie.value = candidate && JSON.stringify(candidate)
        }







        const logout = () => {
            updateSession(null)

        }



        return {
            provide: {
                authentication: {
                    session,
                    loggedIn,

                    updateSession,

                    accessToken,
                    userId,

                    logout,
                },
            },
        }
    },
})
