import type { NuxtError } from 'nuxt/app'
import type { CashoutRoot } from '~/types/finance/cahouts'

type ErrorResponse = {
  Error: string
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const url = `${config.restApiEndpoint}/process_cash_out/`
  const authHeader = getHeader(event, 'authorization')
  try {
    const result = await $fetch<CashoutRoot>(url, {
      method: 'get',
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
      statusMessage: errorResponse?.Error ?? 'Connection Error',

    })
  }
})
