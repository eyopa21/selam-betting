import type { NuxtError } from 'nuxt/app'
import type { Games } from '~/types/casino/group-games'

type ErrorResponse = {
  detail?: string
  Error?: string
}

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const config = useRuntimeConfig()

  const url = `${config.baseApiEndpoint}/betting/casino/api/v1/game_detail/?game_id=${id}`

  try {
    const result = await $fetch<Games>(url, {
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
      statusMessage: errorResponse?.detail ?? errorResponse.Error ?? 'Connection Error',

    })
  }
})
