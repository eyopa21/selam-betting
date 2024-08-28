export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event)
    const url = `${config.public.financeApiEndpoint}/user_stake_balance_detail/`;
    const authHeader = getHeader(event, 'authorization');
    type Result = {
        id: string
        user: string
        stake_balance: string
        created_at: string
        modified_at: string
    }
    try {
        if (authHeader) {
            
            return await $fetch<{ data: Result }>(url,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "X-API-KEY": config.serverApiKey,
                    "Authorization": authHeader.toString()
                },
            });
            // const response = await $fetch(url, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         "X-API-KEY": config.serverApiKey,
            //         "Authorization": authHeader
            //     }
            // })
            
            // console.log("res", response);
            // return {
            //     data: response
            // }
        } else {
            console.log("no token");

            throw createError({
                statusCode: 401,
                statusMessage: 'Token is missing',
            })
        }
            
    } catch (err) {
        console.error('Can not get the stake:', err)
        throw createError({
            cause: err,
            statusCode: 500,
            statusMessage: 'Failed to fetch stake',
        })
    }
   
})