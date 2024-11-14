import type { NuxtError } from 'nuxt/app'
import type { AllGamesRoot } from '~/types/casino/all-games'

type ErrorResponse = {
  detail?: string
  Error?: string
}
export type Body = {
  page: number
  deviceType: 'desktop' | 'mobile'
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event) as Body
  const page = body.page || 1
  const deviceType = body.deviceType || 'mobile'
  const url = `${config.baseApiEndpoint}/betting/casino/api/v1/all_games?page_size=10&page=${page}&device_type=${deviceType}`

  try {
    const result = await $fetch<AllGamesRoot>(url, {
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
      statusMessage: errorResponse?.Error ?? errorResponse?.detail ?? 'Connection Error',

    })
  }
})
