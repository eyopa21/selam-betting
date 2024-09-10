import type { NuxtError } from 'nuxt/app'
import type { CasinoRoot } from '~/types/casino/games'

type ErrorResponse = {
  detail: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.baseApiEndpoint}/betting/casino/api/v1/all_games`
  const authHeader = getHeader(event, 'authorization')
  try {
    const result = await $fetch<CasinoRoot>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.serverApiKey,
        'Authorization': authHeader!.toString()!,
      },
    })
    return result
  } catch (err: unknown) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse.detail,

    })
  }
})
