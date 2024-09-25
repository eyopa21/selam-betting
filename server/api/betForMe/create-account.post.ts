import type { NuxtError } from 'nuxt/app'

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
  const body: CreateBetForMeAccountBody = await readBody(event)
  const url = `${config.restApiEndpoint}/user_profile/`
  const authHeader = getHeader(event, 'authorization')
  const form = new FormData()
  form.append('profile_picture', new Blob([body.profile_picture], { type: body.profile_picture.type }))
  form.append('id_images', new Blob([body.profile_picture], { type: body.profile_picture.type }))
  form.append('id_images', new Blob([body.id_images[0]], { type: body.id_images[0].type }))
  form.append('level', '')
  try {
    const result = await $fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-API-KEY': config.serverApiKey,
        'Authorization': authHeader!.toString()!,
      },
      body: form,
    })
    return result
  } catch (err: unknown) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse
    console.log('test', body.id_images[0])
    console.log(error.message)
    console.log(error.data)
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.Error ?? errorResponse?.detail ?? 'Connection Error',
    })
  }
})
