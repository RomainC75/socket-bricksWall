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
  const { socket, isConnectedToSocket, isConnectedAsUser, displayGameBool, setDisplayGameBool , gameDisplay, username } = useContext(SocketContext) as SocketContextInterface
  
  const handleExit = () =>{
    socket && socket.emit('stop_game_request')
    // gameDisplay.current=null
  }




  useEffect(()=>{
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      
      // console.log(e.keyCode)
      // setDisplayGameBool(displayGameBoolean=>{
      //   if(typeof displayGameBoolean !='boolean'){
      //     displayGameBoolean=false
      //   }
        if (displayGameBool){
          switch (e.keyCode) {
            case 38:
              socket && username && socket.emit('new_move',{
                username: username,
                key: 'up'
              })
              break
            case 40:
              socket && username && socket.emit('new_move',{
                username: username,
                key: 'down'
              })
              break
            case 32:
              socket && username && socket.emit('new_move',{
                username: username,
                key: 'space'
              })
              break
          }
        }
        // return displayGameBoolean
      // })
      
    })
  },[displayGameBool])

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
