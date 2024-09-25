import type { NuxtError } from 'nuxt/app'

type ErrorResponse = {
  detail: string
  Error: string
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.restApiEndpoint}/bet_for_me/request/`
  const authHeader = getHeader(event, 'authorization')
  try {
    const result = await $fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.serverApiKey,
        'Authorization': authHeader!.toString()!,
      },
    })

    console.log('res', result)
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
