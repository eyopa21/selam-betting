import { WebSocket as ClientWebSocket } from 'ws' // Import WebSocket client for server-to-server communication
import type { Message, Peer } from 'crossws' // Replace with the URL of the target WebSocket server

import WebSocket from 'ws'

const config = useRuntimeConfig()
const room = 'ROOM'
// const targetServerUrl = config.public.webSocketEndpoint

const targetWsUrl = config.public.webSocketEndpoint // URL of the target WebSocket server
const wsClient = new WebSocket(targetWsUrl)

wsClient.on('open', () => {
  console.log('Connected to target WebSocket server')
})

wsClient.on('message', (message) => {
  console.log('Received from target WS server:', message)
  // Process the incoming message and handle as needed
})

wsClient.on('error', (error) => {
  console.error('WebSocket error:', error)
})
export default defineWebSocketHandler({
  open(peer: Peer) {
    console.warn('opened WS', peer)
    peer.subscribe(room)
    peer.publish(room, 'Another user joined the chat')
  },

  close(peer: Peer) {
    console.warn('closed WS', peer)
  },

  error(peer: Peer, error: Error) {
    console.error('error on WS', peer, error)
  },

  message(peer: Peer, message: Message) {
    console.log('message on WS', peer, message)

    // Forward the message to the external WebSocket server
    if (targetWsClient.readyState === ClientWebSocket.OPEN) {
      targetWsClient.send(message.text())
    } else {
      console.error('Target WebSocket server is not open')
    }

    // Broadcast the message to all clients
    peer.publish(room, message.text())
  },
})
