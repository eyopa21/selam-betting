export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log("body", body);
    const config = useRuntimeConfig();
    const url = `${config.restApiEndpoint}/slip/`;

    try {
        const response = await $fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': config.serverApiKey
            },
            body: {
                "type_of_ticket": body.ticketType,
                "type_of_stake": body.slipType,
                "selected_events": body.games,
                "stake_amount": body.amount
            }
        });

        return {
            status: setResponseStatus(event, 202),
            data: response
        };
    } catch (error) {
        console.error('Error fetching external data:', error);

        // Return a detailed error response

        return {
            error: 'Failed to retrieve external data',
            details: error
        };
    }
});
