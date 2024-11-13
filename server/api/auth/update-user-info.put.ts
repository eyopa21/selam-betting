import type { NuxtError } from 'nuxt/app'
import type { User } from '~/types/auth/user-info'

type ErrorResponse = {
  detail?: string
  Error?: string
}

export type Body = {
  first_name: string
  last_name: string
  username: string
  phone_number: string
  email: string
  address: string | null
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event) as Body
  const url = `${config.baseApiEndpoint}/betting/api/v1/user_account/`
  const authHeader = getHeader(event, 'authorization')
  try {
    const result = await $fetch<User>(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.serverApiKey,
        'Authorization': authHeader!.toString()!,
      },
      body: {
        ...body,
        address: {
          address_line: body.address,
        },
      },
    })
    return result
  } catch (err: unknown) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse
    console.log(error)
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.Error ?? errorResponse?.detail ?? 'Connection Error',

    })
  }
})
