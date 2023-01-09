import React, { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Canvas from '../components/Canvas'
import { SocketContextInterface } from '../@types/socketContext'
import { SocketContext } from '../context/socket.context'
import { Button } from '@mui/material'
import GameDisplay from '../utils/game/gameDisplay'

export const GamePage = () => {
  const {
    socket,
    isConnectedToSocket,
    isConnectedAsUser,
    gameInitialisation,
    gameDisplay,
    prematchClock,
    displayGameBool,
    username
  } = useContext(SocketContext) as SocketContextInterface

  const handleExit = () => {
    socket && socket.emit('stop_game_request')
    // gameDisplay.current=null
  }

  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      // console.log(e.keyCode)
      // setDisplayGameBool(displayGameBoolean=>{
      //   if(typeof displayGameBoolean !='boolean'){
      //     displayGameBoolean=false
      //   }
      if (displayGameBool) {
        switch (e.keyCode) {
          case 38:
            socket &&
              username &&
              socket.emit('new_move', {
                username: username,
                key: 'up',
              })
            break
          case 40:
            socket &&
              username &&
              socket.emit('new_move', {
                username: username,
                key: 'down',
              })
            break
          case 32:
            socket &&
              username &&
              socket.emit('new_move', {
                username: username,
                key: 'space',
              })
            break
        }
      }
      // return displayGameBoolean
      // })
    })
  }, [displayGameBool])

  return (
    <div className="GamePage">
      <h1>Game</h1>
      <Canvas />
      <Button variant="contained" color="error" onClick={handleExit}>
        Exit
      </Button>
      <div className="prematchClock">{prematchClock && prematchClock}</div>
    </div>
  )
}
