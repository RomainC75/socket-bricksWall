import React, { useState, useEffect, useContext } from 'react'
import { SocketContextInterface } from '../@types/socketContext'
import { SocketContext } from '../context/socket.context'
import Connection from '../components/Connection'
import { GetPing } from '../components/GetPing'
import { Toaster } from 'react-hot-toast'
import { Chat } from '../components/Chat'

export const Homepage = () => {
  const { socket, isConnectedToSocket, isConnectedAsUser } = useContext(SocketContext) as SocketContextInterface
  
  
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
      <Toaster/>
      <h1>Socket Brick</h1>
      <div className="tab indicator">
        Connected to server :
        {isConnectedToSocket ? <span className="circle valid"></span> :  <span className="circle notValid"></span>}
      </div>
      <br/>
      <GetPing/>
      {isConnectedAsUser ? <Chat /> : <Connection />}
    </div>
  )
}
