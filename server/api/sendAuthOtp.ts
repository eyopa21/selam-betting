export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const url = `${config.restApiEndpoint}/request_otp/`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.serverApiKey,
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    return {
      data,
    }
  } catch (err) {
    console.error('Error sending otp user:', err)
    return {
      error: err,
    }
  }
})
