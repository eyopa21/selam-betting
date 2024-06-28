export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const url = `${config.restApiEndpoint}/sports/`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "X-API-KEY": config.serverApiKey

            },
        })

        if (!response.ok) {
            throw new Error(`External API request failed with status ${response.status}`)
        }

        const data = await response.json()
        return {
            data,
        }
    } catch (error) {
        console.error('Error fetching external data:', error)
        // Handle errors appropriately, e.g., return a specific error response
        return {
            error: 'Failed to retrieve external data',
        }
    }
})