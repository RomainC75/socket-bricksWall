import { useState, useEffect, createContext, useContext, PropsWithChildren } from 'react'
import axios from 'axios'
import { SocketContextInterface } from '../@types/socketio'

import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../@types/socketio'




const SocketContext = createContext<SocketContextInterface | null>(null)


function SocketProviderWrapper(props: PropsWithChildren<{}>) {
  const API_URL = process.env.REACT_APP_SOCKET || 'http://localhost:5000'

  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(API_URL, {
    path: '/socket.io',
    reconnection: false,
  })

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProviderWrapper }
