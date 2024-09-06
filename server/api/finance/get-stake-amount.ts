import { NuxtError } from 'nuxt/app'
import { FetchError } from 'ofetch'

export type Result = {
  id: string
  user: string
  stake_balance: string
  created_at: string
  modified_at: string
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const url = `${config.public.financeApiEndpoint}/user_stake_balance_detail/`
  const authHeader = getHeader(event, 'authorization')

  try {
    if (authHeader) {
      const result = await $fetch<Result>(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': config.serverApiKey,
          'Authorization': authHeader.toString(),
        },
      })

      return result
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token is missing',
      })
    }
  } catch (error: NuxtError | FetchError) {
    console.error('Fetch error:', error)
    throw createError({
      ...error,
    })
  }
})
