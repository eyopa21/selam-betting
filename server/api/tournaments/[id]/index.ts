import { League } from '~/types/sports';

export default defineEventHandler(async (event) => {
    const { id } = getRouterParams(event);
    const config = useRuntimeConfig();
    const query = getQuery(event);
    const page = query.page || 1;

    const url = `${config.restApiEndpoint}/tournament/${id}/?page_size=50&page=${page}`;

    try {
        const response = await $fetch<{ results: League[] }>(url, {
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
        } console.log("leag", response.results);
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