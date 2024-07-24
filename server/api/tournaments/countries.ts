import { Root } from '~/types/countries';

export default defineEventHandler(async (event) => {
    const { id } = getRouterParams(event);
    const config = useRuntimeConfig();
    const query = getQuery(event);
    const page = query.page || 1;

    const url = `${config.restApiEndpoint}/location/?page_size=100&page=${page}`;

    try {
        const response = await $fetch<{ res: Root }>(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "X-API-KEY": config.serverApiKey
            },
        })
        console.log("res", response);
        if (response.res && Array.isArray(response.res.results)) {
            response.res.results = response.res.results.map((result: any) => ({
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