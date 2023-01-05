import { Socket } from 'socket.io-client'

export interface SocketContextInterface {
    socket:Socket<ServerToClientEvents, ClientToServerEvents>
}

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }

export interface ClientToServerEvents {
hello: () => void;
}