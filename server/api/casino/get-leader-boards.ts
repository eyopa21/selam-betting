import type { NuxtError } from 'nuxt/app'
import type { LeaderBoardRoot } from '~/types/casino/leaderBoard'

type ErrorResponse = {
  detail: string
  Error: string
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const url = `${config.baseApiEndpoint}/betting/casino/api/v1/top_ten_most_winner/`

  try {
    const result = await $fetch<LeaderBoardRoot>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.serverApiKey,

      },
    })
    return result
  } catch (err: unknown) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse.Error ?? errorResponse?.detail ?? 'Connection Error',

    })
  }
})
