import type { NuxtError } from 'nuxt/app'
import type { Root } from '~/types/auth/user-info'

type ErrorResponse = {
  detail: string
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.restApiEndpoint}/user_account/`
  const authHeader = getHeader(event, 'authorization')
  console.log(authHeader)
  try {
    const result = await $fetch<Root>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.serverApiKey,
        'Authorization': authHeader!.toString()!,
      },
    })
    return result
  } catch (err: unknown) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse
    // console.log('ouu', err)
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse.detail,

    })
  }
})
