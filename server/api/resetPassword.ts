export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event)
    const url = `${config.restApiEndpoint}/reset_password/`;

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

        if (!response.ok) {
            return {
                error: data,
            }
        }
        return {
            data: data,
        }
    } catch (err) {
        console.error('Error reseting password:', err)
        return {
            error: err,
        }
    }
})