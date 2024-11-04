import type { NuxtError } from 'nuxt/app'

type ErrorResponse = {
  detail: string
  Error: string
}
export type ProcessCashoutBody = {
  voucher_code: string
  username: string
  amount: number
}
const test = {
  voucher_code: '7CCU0L14YH',
  username: 'eyob',
  amount: 100,
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.baseApiEndpoint}/betting/api/v1/cash_out_for_user/`
  const authHeader = getHeader(event, 'authorization')
  const body: ProcessCashoutBody = await readBody(event)
  try {
    console.log(body)
    const result = await $fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.serverApiKey,
        'Authorization': authHeader!.toString()!,
      },
      query: {
        voucher_code: '7CCU0L14YH',
        username: 'eyob',
        amount: 100,
      },

    })
    return result
  } catch (err: unknown) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse
    console.log(error)
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.Error ?? errorResponse?.detail ?? 'Connection Error',

    })
  }
})
