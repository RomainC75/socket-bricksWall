import { Socket } from 'socket.io-client'

export interface SocketContextInterface {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>|null
  pingStamp: number | null
  setPingStamp: (timeStamp: number)=>void
  lastCalculatedPing: number | null
  setLastCalculatedPing: (timestamp: number|null)=>void
  isConnectedToSocket: boolean
  
}

export interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
  connected_users: (data: string[]) => void
  pong: ()=>void
}

export interface ClientToServerEvents {
  hello: () => void
  new_username: (data: { username: string; socketID: string }) => void
  ping: (socketId:string) => void
}
