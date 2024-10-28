import type { NuxtError } from 'nuxt/app'
import type { ContactChatRoot } from '~/types/contact-chat'

type ErrorResponse = {
  detail?: string
  Error?: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.baseApiEndpoint}/betting/support/api/v1/support_tickets/`
  const authHeader = getHeader(event, 'authorization')
  try {
    const result = await $fetch<ContactChatRoot>(url, {
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
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.Error ?? errorResponse?.detail ?? 'Connection Error',

    })
  }
})
