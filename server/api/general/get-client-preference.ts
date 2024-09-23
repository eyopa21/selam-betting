import type { NuxtError } from 'nuxt/app'

export type GeneralRoot = {
  is_casino_game: boolean
  is_live_match: boolean
  is_pre_match: boolean
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const url = `${config.restApiEndpoint}/features/`
  try {
    const result = await $fetch<GeneralRoot>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.serverApiKey,
      },
    })
    return result
  } catch (err: unknown) {
    const error = err as NuxtError

    throw createError({
      statusCode: error.statusCode,
      statusMessage: 'Connection Error',

    })
  }
})
