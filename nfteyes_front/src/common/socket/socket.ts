import { io, Socket } from 'socket.io-client'
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8001'

// production build хийх үедээ { transports: ['websocket'] } - ийг арилгаарай
const socket: Socket = io(URL!, { transports: ['websocket'] })
export { Socket, socket }
