import type { NuxtError } from 'nuxt/app'
import type { BonusRoot } from '~/types/finance/bonuses'

type ErrorResponse = {
  detail: string
  Error: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const authHeader = getHeader(event, 'authorization')
  const url = `${config.baseApiEndpoint}/betting/api/v1/bonus_balance_list/`
  try {
    const result = await $fetch<BonusRoot>(url, {
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
    console.log(error)
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.detail ?? errorResponse?.Error ?? 'Connection Error',

    })
  }
})
