export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const config = useRuntimeConfig()

  const url = `${config.restApiEndpoint}/event_detail/${id}`

  try {
    const response = await $fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.serverApiKey,
      },
    })
    console.log('resp', response)
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
