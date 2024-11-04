export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const url = `${config.restApiEndpoint}/user_account/`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': config.serverApiKey,
        'Authorization': `Bearer ${body.access}`,
      },

    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(`${data.detail}`)
    }
    return {
      data,
    }
  } catch (err) {
    console.error('Error getting user:', err)
    return {
      error: `${err}`,
    }
  }
})
