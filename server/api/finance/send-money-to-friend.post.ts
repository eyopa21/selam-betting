import type { NuxtError } from 'nuxt/app'

export type Root = {
  Message: string
}

export type TransferBody = {
  amount: number
  phone_number: string
  is_stake_balance: boolean
  password: string
}

type ErrorResponse = {
  Error: string
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const url = `${config.restApiEndpoint}/transfer_to_other_user/`
  const authHeader = getHeader(event, 'authorization')
  const body = await readBody<TransferBody>(event)
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
  } catch (err: unknown) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.Error ?? 'Connection Error',

    })
  }
})
