import type { NuxtError } from 'nuxt/app'
import type { TransactionRoot } from '~/types/finance/transactions'

type ErrorResponse = {
  detail: string
  Error: string
}
type body = {
  page: number
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const authHeader = getHeader(event, 'authorization')
  const body = await readBody(event) as body
  const page = body.page || 1
  const url = `${config.restApiEndpoint}/transactions/?page=${page}`
  try {
    const result = await $fetch<TransactionRoot>(url, {
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
      statusMessage: errorResponse?.detail ?? errorResponse?.Error ?? 'Connection Error',

    })
  }
})
