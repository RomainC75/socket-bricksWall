import { useState, useEffect, createContext, useContext, PropsWithChildren, useRef } from 'react'
import axios from 'axios'
import { ConnectedUsersInterface, SocketContextInterface } from '../@types/socketio'

import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../@types/socketio'
import { getPingTime, ping } from '../utils/ping'
import { timeStamp } from 'console'
import toast, { Toaster } from 'react-hot-toast'

const SocketContext = createContext<SocketContextInterface | null>(null)

function SocketProviderWrapper(props: PropsWithChildren<{}>) {
  const API_URL = process.env.REACT_APP_SOCKET || 'http://localhost:5000'
  const [pingStamp, setPingStamp] = useState<number | null>(null)
  const [lastCalculatedPing, setLastCalculatedPing] = useState<number | null>(null)
  const [isConnectedToSocket, setIsConnectedToSocket] = useState<boolean>(false)
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
  const [connectedUsers, setConnectedUsers ] = useState<ConnectedUsersInterface[]>([])

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(API_URL, {
      path: '/socket.io',
      reconnection: false,
    })

    setSocket(socket)
    // socket.auth.username={}
    // socket.connect()
    console.log('socket', socket)

    setTimeout(() => {
      if (socket.connected) {
        console.log('socket.connected', socket)
        setIsConnectedToSocket(true)
      }
    }, 300)
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('connected_users', (users) => {
        setConnectedUsers(users)
      })
      socket.on('user_already_used',()=>{
        console.log('user already used !')
        toast.error("User already used")
      })
      socket.on('pong', () => {
        setPingStamp(pingStamp=>{
          if (pingStamp) {
            const value = getPingTime(pingStamp, Date.now())
            setLastCalculatedPing(value)
          }
          return pingStamp
        })
      })
      return () => {
        socket.off('connected_users')
      }
    }
  }, [socket])

  useEffect(() => {
    console.log('timestamp', pingStamp)
  }, [pingStamp])

  return (
    <SocketContext.Provider
      value={{
        socket,
        pingStamp,
        setPingStamp,
        lastCalculatedPing,
        setLastCalculatedPing,
        isConnectedToSocket,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProviderWrapper }
