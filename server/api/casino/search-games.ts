import type { NuxtError } from 'nuxt/app'
import type { CasinoRoot } from '~/types/casino/games'

type ErrorResponse = {
  detail?: string
  Error?: string
}

type Body = {
  page: number
  deviceType: 'desktop' | 'mobile'
}
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig()
  const body = await readBody(event) as Body
  const page = body.page || 1
  const deviceType = body.deviceType || 'desktop'
  console.log('type', deviceType)
  const searchQuery = query.query as string || ''
  const url = `${config.baseApiEndpoint}/betting/casino/api/v1/search_games/?query=${searchQuery}&page=${page}&device_type=${deviceType}`
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
      statusMessage: errorResponse?.Error ?? errorResponse?.detail ?? 'Connection Error',

    })
  }
})
