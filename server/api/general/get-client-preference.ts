import type { NuxtError } from 'nuxt/app'

export type GeneralRoot = {
  is_casino_game: boolean
  is_live_match: boolean
  is_pre_match: boolean
}

export type SystemNameAndLogo = {
  logo_url: string
  client_name: string
}

export type AdsRoot = {
  count: number
  next: string | null
  previous: string | null
  results: unknown[]
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const featureUrl = `${config.restApiEndpoint}/features/`
  const systemNameAndLogoURL = `${config.baseApiEndpoint}/betting/api/v1/system_name_and_logo/`
  const adsUrl = `${config.baseApiEndpoint}/betting/api/v1/ads/`
  // const bannerAdUrl = `${config.restApiEndpoint}/betting/api/v1/get_banner_ad/`
  try {
    // const result = await $fetch<GeneralRoot>(url, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-API-KEY': config.serverApiKey,
    //   },
    // })

    const result = await Promise.allSettled([
      $fetch<GeneralRoot>(featureUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': config.serverApiKey,

        },
      }),
      $fetch<SystemNameAndLogo>(systemNameAndLogoURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': config.serverApiKey,

        },
      }),
      $fetch<AdsRoot>(adsUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': config.serverApiKey,

        },
      }),

    ])

    if (result[0].status === 'fulfilled' && result[1].status === 'fulfilled' && result[2].status === 'fulfilled') {
      return {
        general: result[0].value,
        nameAndLogo: result[1].value,
        ads: [] as AdsRoot['results'],
      }
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failing to Retrieve information about the provider',
      })
    }
  } catch (err: unknown) {
    const error = err as NuxtError

    throw createError({
      statusCode: error.statusCode,
      statusMessage: 'Connection Error',

    })
  }
})
