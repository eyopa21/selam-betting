// export default defineEventHandler(async (event) => {
//   const config = useRuntimeConfig()
//   const body = await readBody(event)
//   const url = `${config.restApiEndpoint}/user_register/`

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-API-KEY': config.serverApiKey,
//       },
//       body: JSON.stringify(body),
//     })
//     const data = await response.json()
//     if (response.status === 400) {
//       return { error: data }
//     }
//     return {
//       data,
//     }
//   } catch (err) {
//     console.error('Error signing up user:', err)
//     return {
//       error: err,
//     }
//   }
// })

import type { NuxtError } from 'nuxt/app'

import type { RegisterError } from '~/types/register'
import type { Auth } from '~/types/login'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const url = `${config.restApiEndpoint}/user_register/`

  try {
    const result = await $fetch<Auth>(url, {
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
    const errorResponse = error.data as RegisterError
    // const firstError = Object.values(errorResponse).find(errorArray => errorArray.length > 0)?.[0]
    const firstErrorEntry = Object.entries(errorResponse).find(([_, errorArray]) => errorArray.length > 0)
    const firstError = firstErrorEntry ? `${firstErrorEntry[0].toLocaleUpperCase()}: ${firstErrorEntry[1][0]}` : undefined

    throw createError({
      statusCode: error.statusCode,
      statusMessage: firstError ?? 'Connection Error',

    })
  }
})
