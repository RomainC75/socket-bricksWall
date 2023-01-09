import React, { useState, useEffect, useContext } from 'react'
import { SocketContextInterface } from '../@types/socketContext'
import { SocketContext } from '../context/socket.context'
import Connection from '../components/Connection'
import { GetPing } from '../components/GetPing'
import { Toaster } from 'react-hot-toast'
import { Chat } from '../components/Chat'
import Canvas from '../components/Canvas'
import { Button } from '@mui/material'
import { GamePage } from './Game.page'

export const Homepage = ():JSX.Element => {
  const {
    isConnectedToSocket,
    isConnectedAsUser,
    displayGameBool,
  } = useContext(SocketContext) as SocketContextInterface


  if (displayGameBool) {
    return(
      <GamePage/>    
    )
  } else {
    return (
      <div className="HomePage">
        <Toaster />
        <h1>Socket Brick</h1>
        <div className="tab indicator">
          Connected to server :
          {isConnectedToSocket ? (
            <span className="circle valid"></span>
          ) : (
            <span className="circle notValid"></span>
          )}
        </div>
        <br />
        <GetPing />
        {isConnectedAsUser ? <Chat /> : <Connection />}
      </div>
    )
  }
}
