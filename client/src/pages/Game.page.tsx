import React, {useState, useEffect, useContext, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import Canvas from '../components/Canvas'
import { SocketContextInterface } from '../@types/socketContext'
import { SocketContext } from '../context/socket.context'
import { Button } from '@mui/material'
import GameDisplay from '../utils/game/gameDisplay'

export const GamePage = () => {
    const { socket, isConnectedToSocket, isConnectedAsUser, gameInitialisation, gameDisplay } = useContext(SocketContext) as SocketContextInterface


  const handleExit = () =>{
    socket && socket.emit('stop_game_request')
    // gameDisplay.current=null
  }
  
  return (
    <div className='GamePage'>
        <h1>Game</h1>
        <Canvas/>
        <Button variant="contained" color="error" onClick={handleExit}>Exit</Button>
    </div>
  )
}
