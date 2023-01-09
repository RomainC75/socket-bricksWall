import React, { useState, useEffect, useContext } from 'react'
import { SocketContextInterface } from '../@types/socketContext'
import { SocketContext } from '../context/socket.context'
import Connection from '../components/Connection'
import { GetPing } from '../components/GetPing'
import { Toaster } from 'react-hot-toast'
import { Chat } from '../components/Chat'
import Canvas from '../components/Canvas'
import { Button } from '@mui/material'

export const Homepage = () => {
  const { socket, isConnectedToSocket, isConnectedAsUser, displayGameBool, gameDisplay } = useContext(SocketContext) as SocketContextInterface
  
  const handleExit = () =>{
    socket && socket.emit('stop_game_request')
    // gameDisplay.current=null
  }

  if(displayGameBool){
    return (
      <div className='GamePage'>
          <h1>Game</h1>
          <Canvas/>
          <Button variant="contained" color="error" onClick={handleExit}>Exit</Button>
      </div>
    )
  }else{
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
}
