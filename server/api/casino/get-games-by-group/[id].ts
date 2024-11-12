import type { NuxtError } from 'nuxt/app'
import type { GroupGamesRoot } from '~/types/casino/group-games'

type ErrorResponse = {
  detail?: string
  error?: string
}
type Body = {
  page: number
}

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const config = useRuntimeConfig()
  const body: Body = await readBody(event)
  const page = body.page || 1
  const url = `${config.baseApiEndpoint}/betting/casino/api/v1/get_game_by_group/${id}/?page=${page}`

  const authHeader = getHeader(event, 'authorization')
  try {
    const result = await $fetch<GroupGamesRoot>(url, {
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
      statusMessage: errorResponse?.detail ?? errorResponse.error ?? 'Connection Error',

    })
  }
})
