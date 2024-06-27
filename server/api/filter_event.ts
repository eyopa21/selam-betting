export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    console.log(query);


    const url = `http://162.55.223.95:8000/betting/api/v1/filter_event/?sport_id=${query.sport_id}&interval_hours=${query.interval_hours}&page_size-${query.page_size}`;
    console.log("isurl", url);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "X-API-KEY":
                    "AriqTLX3Vps7w_vL5Mv6ufGzcWFAzXM9pEqoUa6tiB19Y9QgjdNvucwfq6NW4cOP5lyp2OlnCXV8QTKSHF2wLGhOvYHgdL57R4eKIXPYFgU",
            },
        })


        if (!response.ok) {
            throw new Error(`External API request failed with status ${response.status}`)
        }


        const data = await response.json()
        console.log('respo', data);
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