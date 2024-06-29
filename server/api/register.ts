export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event)
    console.log('this is body', body);
    const url = `${config.restApiEndpoint}/user_register`;
    console.log('urllllll', url);
    console.log('bodyyyyy', body);
    console.log(config.serverApiKey);


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-API-KEY": config.serverApiKey
            },
            body: body.stringify()
        })

        if (!response.ok) {
            throw new Error(`External API request failed with status ${response.status}`)
        }

        const data = await response.json()
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((result: any) => ({
                ...result,
                id: BigInt(result.id).toString()
            }));
        }
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