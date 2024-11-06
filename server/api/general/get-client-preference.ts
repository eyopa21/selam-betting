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
type Banner = {
  id: string
  image: string
  client_package: string
  start_date: string
  end_date: string
  status: boolean
  views: number
  note: string
  created_at: string
  modified_at: string

}

export type BannerRoot = {
  count: number
  next: string | null
  previous: string | null
  results: Banner[]
}

export type ThemeRoot = {
  current_theme: CurrentTheme
  updated_at: string
}

export type CurrentTheme = {
  id: string
  name: string
  primary_color: string
  secondary_color: string
  background_color: string
  font_family: string
  created_by_admin: boolean
  created_at: string
  modified_at: string
  created_by: string
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const featureUrl = `${config.restApiEndpoint}/features/`
  const systemNameAndLogoURL = `${config.baseApiEndpoint}/betting/api/v1/system_name_and_logo/`
  const adsUrl = `${config.baseApiEndpoint}/betting/api/v1/ads/`
  const bannerAdUrl = `${config.baseApiEndpoint}/betting/api/v1/get_banner_ad/`
  const themeUrl = `${config.baseApiEndpoint}/betting/api/v1/theme/`

  try {
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
      $fetch<BannerRoot>(bannerAdUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': config.serverApiKey,

        },
      }),
      $fetch<ThemeRoot>(themeUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': config.serverApiKey,

        },
      }),

    ])

    if (result[0].status === 'fulfilled' && result[1].status === 'fulfilled' && result[2].status === 'fulfilled' && result[3].status === 'fulfilled') {
      return {
        general: result[0].value,
        nameAndLogo: result[1].value,
        ads: [] as AdsRoot['results'],
        banners: result[3].value.results,
        // theme: result[4].value,
      }
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failing to Retrieve information about the provider',
      })
    }
  } catch (err: unknown) {
    const error = err as NuxtError
    console.log(error)
    throw createError({
      statusCode: error.statusCode,
      statusMessage: 'Connection Error',

    })
  }
})
