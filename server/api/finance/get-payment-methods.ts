export type PaymentsRoot = {
  count: number
  next: any
  previous: any
  results: Result[]
}

export type Result = {
  name: string
  code: string
  logo: string
  is_direct_payment_allowed: boolean
  type_of_payment: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.baseApiEndpoint}/finance/user/api/v1/payment_methods/?page_size=20`
  const authHeader = getHeader(event, 'authorization')

  try {
    if (authHeader) {
      return await $fetch<{ data: PaymentsRoot }>(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': config.serverApiKey,
          'Authorization': authHeader.toString(),
        },
      })
    } else {
      console.log('no token')

      throw createError({
        statusCode: 401,
        message: 'Token is missing',
      })
    }
  } catch (err: NuxtError) {
    console.error('Can not get the stake:', err.message)
    return createError({
      statusCode: err.statusCode,
      statusMessage: err.message,
    })
  }
})
