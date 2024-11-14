import type { NuxtError } from 'nuxt/app'
import { defineEventHandler, readFormData } from 'h3'

type ErrorResponse = {
  detail: string
  Error: string
}

export type CreateBetForMeAccountBody = {
  profile_picture: File
  id_images: [File, File]
  level?: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const formData = await readFormData(event)
  const url = `${config.restApiEndpoint}/user_profile/`
  const authHeader = getHeader(event, 'authorization')

  try {
    const result = await $fetch(url, {
      method: 'POST',
      headers: {

        'X-API-KEY': config.serverApiKey,
        'Authorization': authHeader!.toString()!,
      },
      body: formData,
    })
    return result
  } catch (err: unknown) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse

    console.log(err)
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.Error ?? errorResponse?.detail ?? 'Connection Error',
    })
  }
})
