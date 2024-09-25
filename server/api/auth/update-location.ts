import type { NuxtError } from 'nuxt/app'
import type { Address } from '~/types/betForMe'

type ErrorResponse = {
  detail?: string
  Error?: string
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event) as Address
  const url = `${config.baseApiEndpoint}/auth/api/v1/address/`
  const authHeader = getHeader(event, 'authorization')

  try {
    const result = await $fetch<Address>(url, {
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
