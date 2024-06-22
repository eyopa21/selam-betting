export default defineEventHandler(async (event) => {
    const query = getQuery(event);


    const url = `http://162.55.223.95:8000/betting/api/v1/filter_event/?sport_id=${query.sport_id}&interval_hours=${query.interval_hours}&page_size-${query.page_size}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "X-API-KEY":
                    "RUDKb1iueBuAtFhYGKQxyXhSc2rVKYxe5TNIuTxtEDv6o2jcefPb6p7jXeZlu_LgHExd-_USDVruUS2LjHrSnTOXQnrhIrw9vHLlg7eJDNg",
            },
        })

        if (!response.ok) {
            console.log('respo', response);
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