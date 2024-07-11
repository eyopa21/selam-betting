
import type { Matches, Participants } from '~/types/matches';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const config = useRuntimeConfig();
    const date = query.date ?? new Date();

    const url = `${config.restApiEndpoint}/get_event_by_date/?date=${date}`;
    console.log("url", url);
    try {
        const response = await $fetch<{ results: Matches[] }>(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "X-API-KEY": config.serverApiKey
            },
        })
        if (response.results && Array.isArray(response.results)) {
            response.results = response.results.map((result: any) => ({
                ...result,
                id: BigInt(result.id).toString()
            }));
        }
        return {
            data: response
        }
    } catch (error) {
        console.error('Error fetching external data:', error)
        throw createError({
            cause: error,
            statusCode: 500,
            message: 'Failed to retrieve external Data'
        })
    }


})