import { Socket } from 'socket.io-client'
import {MessageClientToServerInterface, MessageInterface} from './message'

export interface SocketContextInterface {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>|null
  pingStamp: number | null
  setPingStamp: (timeStamp: number)=>void
  lastCalculatedPing: number | null
  setLastCalculatedPing: (timestamp: number|null)=>void
  isConnectedToSocket: boolean
  isConnectedAsUser: boolean
  connectedUsers: ConnectedUsersInterface[]
  privateMessages: MessageInterface[]
  publicMessages: MessageInterface[]
}

export interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
  connected_users: (data: ConnectedUsersInterface[]) => void
  user_already_used: ()=>void
  pong: ()=>void
  credential: (cred: CredentialsInterface)=>void
}

export interface ClientToServerEvents {
  new_username: (data: ConnectedUsersInterface) => void
  ping: (socketId:string) => void
  disconnect: (data: ConnectedUsersInterface)=>void
  private_message: (data : MessageClientToServerInterface)=>void
}


export interface ConnectedUsersInterface{
  username: string
  socketID: string
  self?:boolean
}

export interface CredentialsInterface{
  username: string
  password: string
}