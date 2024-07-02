export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event)
    const url = `${config.restApiEndpoint}/reset_password/`;
    console.log(JSON.stringify(body));
    console.log(url);
    console.log(config.serverApiKey);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-API-KEY": config.serverApiKey
            },
            body: JSON.stringify(body)
        })
        console.log(response);

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