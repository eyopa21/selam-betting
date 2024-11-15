import WebSocket, { WebSocket as ClientWebSocket } from 'ws'

import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event)
  const config = useRuntimeConfig()
  const targetWsUrl = config.public.webSocketEndpoint
  const wsClient = new WebSocket(targetWsUrl)

  const query = getQuery(event)
  const token = query.token

  wsClient.on('open', () => {
    console.warn('Connected to target WebSocket server')
    const message = JSON.stringify({ token, api_key: config.serverApiKey })
    wsClient.send(message)
  })

  wsClient.on('message', async (message: string) => {
    const jsonString = message.toString()
    await eventStream.push(jsonString)
  })

  wsClient.on('error', (error: unknown) => {
    console.error('WebSocket error:', error)
  })

  eventStream.onClosed(() => {
    console.error('connection lost')
  })

  return eventStream.send()
})
