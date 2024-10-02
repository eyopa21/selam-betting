import type { NuxtError } from 'nuxt/app'

export type PaymentsRoot = {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}

export type Result = {
  name: string
  code: string
  logo: string
  is_direct_payment_allowed: boolean
  type_of_payment: string
}
type ErrorResponse = {
  detail: string
  Error: string
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.baseApiEndpoint}/finance/user/api/v1/payment_methods/?page_size=20`
  const authHeader = getHeader(event, 'authorization')

  try {
    if (authHeader) {
      return await $fetch<{ data: PaymentsRoot }>(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': config.serverApiKey,
          'Authorization': authHeader.toString(),
        },
      })
    } else {
      throw createError({
        statusCode: 401,
        message: 'Token is missing',
      })
    }
  } catch (err: unknown) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse

    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.detail ?? errorResponse?.Error ?? 'Connection Error',

    })
  }
})
