export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig()
  const authHeader = getHeader(event, 'authorization')

  const url = `${config.public.baseImageUrl}${query.image}`

  try {
    // Fetch the image from the provided URL
    const response = await $fetch<Blob>(url, {
      headers: {
        'X-API-KEY': config.serverApiKey,
        'Authorization': authHeader!.toString()!,
      },
      responseType: 'blob', // to handle binary data
    })

    // Return the image as binary data

    return response
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch the image.',
    })
  }
})
