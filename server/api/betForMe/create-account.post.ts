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
  const body = await readBody(event)
  const url = `${config.restApiEndpoint}/user_profile/`
  const authHeader = getHeader(event, 'authorization')
  // const form = new FormData()
  // form.append('profile_picture', body.profile_picture)
  // body.id_images.forEach((file) => {
  //   form.append(`id_images`, file)
  // })
  // form.append('level', 'hello')
  // console.log(form)
  // console.log(body)
  // if (body.profile_picture instanceof File) {
  //   console.log('This is a File object!')
  // } else {
  //   console.log('This is not a File object.')
  // }

  console.log(typeof body)
  try {
    const result = await $fetch(url, {
      method: 'POST',
      headers: {

        'X-API-KEY': config.serverApiKey,
        'Authorization': authHeader!.toString()!,
      },
      body,
    })
    return result
  } catch (err: unknown) {
    const error = err as NuxtError
    const errorResponse = error.data as ErrorResponse
    // console.log('test', body.id_images[0])
    console.log(error.message)
    console.log(err)
    throw createError({
      statusCode: error.statusCode,
      statusMessage: errorResponse?.Error ?? errorResponse?.detail ?? 'Connection Error',
    })
  }
})
