import { exec } from 'node:child_process'
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
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.baseApiEndpoint}/betting/api/v1/cash_out_for_user_request/`
  const authHeader = getHeader(event, 'authorization')
  const body: ProcessCashoutBody = await readBody(event)
  try {
    const result = await $fetch<string>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.serverApiKey,
        'Authorization': authHeader!.toString()!,
      },
      body,
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
