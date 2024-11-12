// export default defineEventHandler( on,async (event) => {
//   const cookies = parseCookies(event)
//   console.log('cookies', event)
//   console.log(`New request: ${getRequestURL(event)}`)
// })

import type { H3Event } from 'h3'
import { defineEventHandler } from 'h3' // Import types as needed

export default defineEventHandler({
  onRequest: [],
  onBeforeResponse: [
    (event: H3Event) => {
    //   console.log({ hello: event.node.req.originalUrl })
    },

  ],
  handler: (event: H3Event) => {
    // console.log(`New request: ${event.node.res.statusCode}`)
  },
})

// Mock function to simulate token refresh
async function refreshAuthToken(): Promise<string | null> {
  try {
    const refreshResponse = await fetch('/auth/refresh', { method: 'POST' })
    if (refreshResponse.ok) {
      const data = await refreshResponse.json()
      return data.accessToken
    } else {
      console.error('Refresh token request failed.')
      return null
    }
  } catch (error) {
    console.error('Error refreshing token:', error)
    return null
  }
}
