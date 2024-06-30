export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event)
    const url = `${config.restApiEndpoint}/user_register/`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-API-KEY": config.serverApiKey
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            throw new Error(`External API request failed with status ${response.status}`)
        }

        const data = await response.json()

        return {
            data,
        }
    } catch (error) {
        console.error('Error signing up user:', error)
        // Handle errors appropriately, e.g., return a specific error response
        return {
            error: 'Failed to retrieve external data',
        }
    }
})