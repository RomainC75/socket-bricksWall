import React, { useContext } from 'react'
import { ping } from '../utils/ping'
import { ServerToClientEvents, ClientToServerEvents, SocketContextInterface } from '../@types/socketio'
import { SocketContext } from '../context/socket.context'

import './styles/getPing.css'

export const GetPing = () => {
  const { socket, lastCalculatedPing, setLastCalculatedPing, setPingStamp, pingStamp } = useContext(SocketContext) as SocketContextInterface

  const handlePing = () => {
    if(socket){
      const timestamp1 = ping(socket)
      setLastCalculatedPing(null)
      setPingStamp(timestamp1)
    }
  }
  return (
    <div className="GetPing tab">
      <div className="displayPing">Ping : {lastCalculatedPing ? lastCalculatedPing : 'x'}</div>
      <button onClick={() => handlePing()}>calculate ping</button>
    </div>
  )
}
