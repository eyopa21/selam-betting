import type { NuxtError } from '#app'



export type Result = {
    id: string
    user: string
    stake_balance: string
    created_at: string
    modified_at: string
}
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event)
    const url = `${config.public.financeApiEndpoint}/user_stake_balance_detail/`;
    const authHeader = getHeader(event, 'authorization');
   
    try {
        if (authHeader) {
            
            return await $fetch<Result>(url,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "X-API-KEY": config.serverApiKey,
                    "Authorization": authHeader.toString()
                },
            });
        } else {
            console.log("no token");

            throw createError({
                statusCode: 401,
                message: 'Token is missing',
            })
        }
            
    } catch (err: NuxtError ) {
        console.error('Can not get the stake:', err.message)
        return createError({
            statusCode: err.statusCode,
            statusMessage: err.message
        })
    }
   
})