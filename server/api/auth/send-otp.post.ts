import type { NuxtError } from 'nuxt/app'

type OtpResult = {
  message: string
}
type ErrorResponse = {
  error: string
}
type Body = {
  email: string
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event) as Body
  const url = `${config.restApiEndpoint}/request_otp/`

  try {
    const result = await $fetch<OtpResult>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.serverApiKey,
      },
      body,
    })
    return result
  } catch (err: unknown) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.error ?? 'Connection Error',

    })
  }
})
