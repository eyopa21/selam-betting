// export default defineEventHandler(async (event) => {
//     const config = useRuntimeConfig()
//     const body = await readBody(event)
//     const url = `${config.restApiEndpoint}/reset_password/`

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-API-KEY': config.serverApiKey,
//         },
//         body: JSON.stringify(body),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         return {
//           error: data,
//         }
//       }
//       return {
//         data,
//       }
//     } catch (err) {
//       console.error('Error reseting password:', err)
//       return {
//         error: err,
//       }
//     }
//   })

import type { NuxtError } from 'nuxt/app'

type ResetPassword = {
  Message: string
}
type ErrorResponse = {
  Error: string
}
type Body = {
  otp: string
  new_password: string
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event) as Body
  const url = `${config.restApiEndpoint}/reset_password/`

  try {
    const result = await $fetch<ResetPassword>(url, {
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
      statusMessage: errorResponse?.Error ?? 'Connection Error',

    })
  }
})
