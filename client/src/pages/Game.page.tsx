import React, {useState, useEffect, useContext} from 'react'
import Canvas from '../components/Canvas'
import { SocketContextInterface } from '../@types/socketContext'
import { SocketContext } from '../context/socket.context'

export const GamePage = () => {
    const { socket, isConnectedToSocket, isConnectedAsUser, gameInitialisation } = useContext(SocketContext) as SocketContextInterface

  useEffect(() => {
    
  
  }, [])
  
  return (
    <div className='GamePage'>
        <h1>Game</h1>
        <Canvas/>
    </div>
  )
}
