import type { NuxtError } from 'nuxt/app'

type LoginResult = {
  access: string
  refresh: string
}
type ErrorResponse = {
  detail: string
  Error: string
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const url = `${config.restApiEndpoint}/login/`

  try {
    const result = await $fetch<LoginResult>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.serverApiKey,
      },
      body,
    })
    return result
  } catch (err: unknown) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.Error ?? errorResponse?.detail ?? 'Connection Error',

    })
  }
})
