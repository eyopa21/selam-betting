import type { NuxtError } from 'nuxt/app'

 type Root = {
   Success: string
   is_visible: boolean
 }

 type Body = {
   voucherCode: string
   password: string
 }

type ErrorResponse = {
  detail: string
  Error: string
}
export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const config = useRuntimeConfig()
  const url = `${config.baseApiEndpoint}/betting/api/v1/approve_cash_out_for_voucher/${id}/`
  const authHeader = getHeader(event, 'authorization')
  const body: Body = await readBody(event)
  try {
    const result = await $fetch<Root>(url, {
      method: 'PUT',
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
