import type { NuxtError } from 'nuxt/app'
import type { ContactChatRoot } from '~/types/contact-chat'

type ErrorResponse = {
  detail?: string
  Error?: string
}

type Body = {
  subject: string
  description: string
  status: string
  priority: string
  attachment: File

}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event) as Body
  const url = `${config.baseApiEndpoint}/betting/support/api/v1/support_tickets/`
  const authHeader = getHeader(event, 'authorization')
  const formData = new FormData()
  formData.append('subject', body.subject)
  formData.append('description', body.description)
  formData.append('status', body.status ?? 'open')
  formData.append('priority', body.priority ?? 'high')
  formData.append('subject', body.attachment)
  try {
    const result = await $fetch<ContactChatRoot>(url, {
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
