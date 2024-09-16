import type { NuxtError } from 'nuxt/app'

export type InputBody = {
  amount: number
  paymentMethods: string
  is_direct_payment: boolean
}

type ErrorResponse = {
  Error: string
}

export type Root = {
  error: boolean
  msg: string
  data: Data
}

export type Data = {
  sessionId: string
  paymentUrl: string
  cancelUrl: string
  totalAmount: number
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.baseApiEndpoint}/finance/payment/arif_payment/api/v1/stake_balance_deposit/`
  const authHeader = getHeader(event, 'authorization')
  const body = await readBody(event) as InputBody
  try {
    if (authHeader) {
      const result = await $fetch<Root>(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': config.serverApiKey,
          'Authorization': authHeader.toString(),
        },
        body,
      })

      return result
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token is missing',
      })
    }
  } catch (err) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.Error ?? 'Connection Error',

    })
  }
})
