export default defineEventHandler(async (event) => {
    const query = getQuery(event);

    const config = useRuntimeConfig();
    const url = `${config.restApiEndpoint}/filter_event/?sport_id=${query.sport_id}&interval_hours=${query.interval_hours}&page_size-${query.page_size}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "X-API-KEY": config.serverApiKey
            },
        })
        if (!response.ok) {
            throw new Error(`External API request failed with status ${response.status}`)
        }
        const data = await response.json()
        if (data.results && Array.isArray(data.results)) {
            data.results = data.results.map((result: any) => ({
                ...result,
                id: BigInt(result.id).toString()
            }));
        }
        return {
            data,
        }
    } catch (error) {
        console.error('Error fetching external data:', error)
        return {
            error: 'Failed to retrieve external data',
        }
    }


})

// const convertToBigInt = (obj) => {
//     if (Array.isArray(obj)) {
//       return obj.map(convertToBigInt);
//     } else if (typeof obj === "object" && obj !== null) {
//       const newObj = {};
//       for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//           if (key === "id" || key === "eventId") {
//             newObj[key] = BigInt(obj[key]);
//           } else {
//             newObj[key] = convertToBigInt(obj[key]);
//           }
//         }
//       }
//       return newObj;
//     } else {
//       return obj;
//     }
//   };