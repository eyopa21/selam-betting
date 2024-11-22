import type { NuxtError } from 'nuxt/app'
import type { CasinoGroupsRoot } from '~/types/casino/groups'

type ErrorResponse = {
  detail: string
}
type Body = {
  page: number
}

export default defineEventHandler(async (event) => {
  const page_size = 20
  const body = await readBody(event) as Body
  const page = body.page || 1
  const config = useRuntimeConfig()

  const url = `${config.baseApiEndpoint}/betting/casino/api/v1/all_group/?page=${page}&&page_size=${page_size}`

  try {
    const result = await $fetch<CasinoGroupsRoot>(url, {
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
    console.log(error)
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.detail ?? 'Connection Error',

    })
  }
})
