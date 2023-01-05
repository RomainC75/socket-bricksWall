import React, { useState, useEffect, useContext } from 'react'
import { ServerToClientEvents, ClientToServerEvents, SocketContextInterface } from '../@types/socketio'
import { SocketContext } from '../context/cart.context'
import Discussion from '../components/Discussion'
import Connection from '../components/Connection'
import { GetPing } from '../components/GetPing'

export const Homepage = () => {
  const { socket, isConnectedToSocket } = useContext(SocketContext) as SocketContextInterface
  const [username, setUsername] = useState<string | null>('bob')
  
  const [isConnectedAsUser, setIsConnectedAsUser] = useState<boolean>(false)

  const handleUsername = () => {
    // e.preventDefault()
    // console.log(username)
    // socket.emit('username', username)
    // setConnected(true)
    // add the property "username"
    // socket.auth = { username }
    // try to connect

    // socket.connect()
    // console.log('socket', socket)
    // setTimeout(() => {
    //   if (socket.connected) {
    //     console.log('socket.connected', socket)
    //     setIsConnectedToSocket(true)
    //   }
    // }, 300)
  }

  // useEffect(() => {
  //   handleUsername()
  // }, [])

  return (
    <div className="HomePage">
      <h1>Socket Brick</h1>
      <div className="tab indicator">
        Connected to server :
        {isConnectedToSocket ? <span className="circle valid"></span> :  <span className="circle notValid"></span>}
      </div>
      <br/>
      <GetPing/>
      {isConnectedAsUser ? <Discussion /> : <Connection />}
    </div>
  )
}
