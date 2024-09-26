import type { NuxtError } from 'nuxt/app'
import type { NearByRoot } from '~/types/forMe/nearBy'

type ErrorResponse = {
  detail: string
  Error: string
}
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const range = query.range || 10
  const lat = query.latitude
  const lon = query.longitude
  const config = useRuntimeConfig()
  const authHeader = getHeader(event, 'authorization')
  try {
    if (lat && lon) {
      const url = `${config.restApiEndpoint}/near_by_bet_for_me_agent/?longitude=${+lon}&latitude=${+lat}&range_in_km=${range}`
      const result = await $fetch<NearByRoot>(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': config.serverApiKey,
          'Authorization': authHeader!.toString()!,
        },
      })
      return result
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Can not get your location',
      })
    }
  } catch (err: unknown) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.Error ?? errorResponse?.detail ?? 'Connection Error',

    })
  }
})
