import type { NuxtError } from 'nuxt/app'

type ErrorResponse = {
  detail?: string
  Error?: string
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig()
  const hmacUrl = `${config.baseApiEndpoint}/betting/casino/api/v1/get_hmac`
  const gameCounterUrl = `${config.baseApiEndpoint}/betting/casino/api/v1/game_counter/?game_id=${query.game_id}`
  const authHeader = getHeader(event, 'authorization')
  try {
    const result = await Promise.allSettled([
      $fetch(hmacUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': config.serverApiKey,
          'Authorization': authHeader!.toString()!,
        },
      }),
      $fetch(gameCounterUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': config.serverApiKey,
          'Authorization': authHeader!.toString()!,
        },
      }),
    ])
    if (result[0].status === 'fulfilled' && result[1].status === 'fulfilled') {
      return result[0].value as string
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: result[0].status === 'rejected' ? 'Failing to generate hmac' : 'Failing to update game counter',
      })
    }
  } catch (err: unknown) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse
    throw createError({
      statusCode: error.statusCode,
      statusMessage: error.message ?? errorResponse?.detail ?? errorResponse?.Error ?? 'Connection Error',

    })
  }
})
