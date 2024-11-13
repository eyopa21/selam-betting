// export default defineEventHandler(async (event) => {
//     const config = useRuntimeConfig()
//     const body = await readBody(event)
//     const url = `${config.restApiEndpoint}/verify_otp/`

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-API-KEY': config.serverApiKey,
//         },
//         body: JSON.stringify(body),
//       })

//       if (!response.ok) {
//         throw new Error(`External API request failed with status ${response.status}`)
//       }

//       const data = await response.json()

//       return {
//         data,
//       }
//     } catch (error) {
//       console.error('Error verifying otp:', error)
//       // Handle errors appropriately, e.g., return a specific error response
//       return {
//         error: 'Failed to retrieve external data',
//       }
//     }
//   })

import type { NuxtError } from 'nuxt/app'

type OtpResult = {
  message: string
}
type ErrorResponse = {
  error: string
}
type Body = {
  email: string
  otp: string
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event) as Body
  const url = `${config.restApiEndpoint}/verify_otp/`

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
