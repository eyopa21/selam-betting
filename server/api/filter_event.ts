
import type { Matches, Participants } from '~/types/matches';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const config = useRuntimeConfig();
    const page = query.page || 1;
    const url = `${config.restApiEndpoint}/filter_event/?sport_id=${query.sport_id}&interval_hours=${query.interval_hours}&page_size=50&page=${page}`;
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