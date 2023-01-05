import React, {useState, useEffect, useContext} from 'react'
import { ServerToClientEvents, ClientToServerEvents, SocketContextInterface } from '../@types/socketio'
import { SocketContext } from '../context/cart.context'



export const Homepage = () => {
  const {socket} = useContext(SocketContext) as SocketContextInterface
  const [username, setUsername ] = useState<string|null>("bob")
  const [connected, setConnected] = useState<boolean>(false)

  const handleUsername = () => {
    // e.preventDefault()
    // console.log(username)
    // socket.emit('username', username)
    // setConnected(true)

    // add the property "username"
    socket.auth = { username }
    // try to connect
    socket.connect()
    console.log('socket', socket)

    setTimeout(() => {
       if (socket.connected) {
          console.log('socket.connected', socket)
          setConnected(true)
       }
    }, 300)
 }

  useEffect(()=>{
    handleUsername()
  },[])

  return (
    <div>home.page</div>

  )
}
