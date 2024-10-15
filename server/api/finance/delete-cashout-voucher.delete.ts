import type { NuxtError } from 'nuxt/app'

export type Root = {
  Message: string
}

type Body = {
  voucherId: string
}

type ErrorResponse = {
  Error: string
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body = await readBody(event) as Body
  const url = `${config.restApiEndpoint}/process_cash_out/?voucher_id=${body.voucherId}`
  const authHeader = getHeader(event, 'authorization')
  try {
    const result = await $fetch<Root>(url, {
      method: 'DELETE',
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
      statusMessage: errorResponse?.Error ?? 'Connection Error',

    })
  }
})
