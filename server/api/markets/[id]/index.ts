import type { Markets } from '~/types/matches'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const query = getQuery(event)
  const pageSize = query.page || 1000
  const config = useRuntimeConfig()

  const url = `${config.restApiEndpoint}/event_market/${id}/?page_size=20`
  try {
    const response = await $fetch<Markets>(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.serverApiKey,
      },
    })

    if (response.results && Array.isArray(response.results)) {
      response.results = response.results.map((result: any) => ({
        ...result,
        id: BigInt(result.id).toString(),
      }))
    }
    return {
      data: response,
    }
  } catch (error) {
    console.error('Error fetching external data:', error)
    throw createError({
      cause: error,
      statusCode: 500,
      message: 'Failed to retrieve external Data',
    })
  }
})
