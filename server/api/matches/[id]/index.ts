export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { id } = getRouterParams(event);


    const url = `${config.restApiEndpoint}/matches/${id}/`;

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
        console.log("data", data)
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