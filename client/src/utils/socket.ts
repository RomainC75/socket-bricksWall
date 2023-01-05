import {io, Socket} from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../@types/socketio'

const URL = process.env.REACT_APP_SOCKET || 'http://localhost:5000'

const socket:Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
    path: '/socket.io',
    reconnection: false
})

export default socket