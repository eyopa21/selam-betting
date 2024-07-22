export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event)
    const url = `${config.restApiEndpoint}/user_register/`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-API-KEY": config.serverApiKey
            },
            body: JSON.stringify(body)
        })

        const data = await response.json()
console.log("data", data);
        if (!response.ok) {
            return {
                error: data,
            }
        }
        return {
            data: data,
        }
    } catch (err) {
        console.error('Error signing up user:', err)
        return {
            error: err,
        }
    }
})