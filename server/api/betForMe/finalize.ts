import type { NuxtError } from 'nuxt/app'

type ErrorResponse = {
  detail: string
  Error: string
}

type Body = {
  voucher_code: string
  user_name: string
  amount: number
  password: string

}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.baseApiEndpoint}/betting/api/v1/cash_out_for_user/`
  const authHeader = getHeader(event, 'authorization')
  const body: Body = await readBody(event)

  console.log('bod', body)
  try {
    const result = await $fetch(url, {
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
