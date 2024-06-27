export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const config = useRuntimeConfig();
    const url = `${config.restApiEndpoint}/filter_event/?sport_id=${query.sport_id}&interval_hours=${query.interval_hours}&page_size-${query.page_size}`;
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
        return {
            error: 'Failed to retrieve external data',
        }
    }
})