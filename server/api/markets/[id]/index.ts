export default defineEventHandler(async (event) => {
    const { id } = getRouterParams(event);
    const query = getQuery(event);
    const pageSize = query.page || 10;
    const config = useRuntimeConfig()

    const url = `${config.restApiEndpoint}/event_market/${id}/?page_size=${pageSize}`;
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