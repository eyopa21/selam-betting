import { WebSocket as ClientWebSocket } from 'ws' // Import WebSocket client for server-to-server communication
import type { Message, Peer } from 'crossws'

const config = useRuntimeConfig()
const room = 'ROOM'
const targetServerUrl = config.public.webSocketEndpoint // Replace with the URL of the target WebSocket server

// Initialize the connection to the external WebSocket server
const targetWsClient = new ClientWebSocket(targetServerUrl)

// Handle messages from the target WebSocket server
targetWsClient.on('connected', (data: string) => {
  console.log('connected:', data)
  // Optionally, broadcast the received message to all connected clients
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
