import type { NuxtError } from 'nuxt/app'

 type Root = {
   Success: string
   is_visible: boolean
 }

 type Body = {
   visibility: boolean
 }

type ErrorResponse = {
  detail: string
  Error: string
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.restApiEndpoint}/update_Visibility/`
  const authHeader = getHeader(event, 'authorization')
  const body: Body = await readBody(event)
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
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.Error ?? errorResponse?.detail ?? 'Connection Error',

    })
  }
})
