export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const url = `${config.restApiEndpoint}/login/`

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
    if (!response.ok) {
      throw new Error(`${data.detail}`)
    }
    return {
      data,
    }
  } catch (err) {
    console.error('Error signing in user:', err)
    return {
      error: `${err}`,
    }
  }
})
