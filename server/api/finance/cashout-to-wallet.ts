import type { NuxtError } from 'nuxt/app'

export type Root = {
  Message: string
}

type ErrorResponse = {
  Error?: string
  Detail?: string
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const url = `${config.baseApiEndpoint}/finance/cash_out/arif_payment/api/v1/transfer_to_wallet_for_user/`
  const authHeader = getHeader(event, 'authorization')
  const body = await readBody(event)

  try {
    const result = await $fetch<Root>(url, {
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

    console.log(error)
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.Error ?? errorResponse?.Detail ?? 'Connection Error',

    })
  }
})
