import React, { useContext } from 'react'
import { ping } from '../utils/ping'
import { ServerToClientEvents, ClientToServerEvents, SocketContextInterface } from '../@types/socketio'
import { SocketContext } from '../context/cart.context'

export const GetPing = () => {
  const { socket, lastCalculatedPing, setPingStamp, pingStamp } = useContext(SocketContext) as SocketContextInterface

  const handlePing = () => {
    if(socket){
      const timestamp1 = ping(socket)
      console.log('set ping stamp : ', timestamp1)
      setPingStamp(timestamp1)
    }
  }
  return (
    <div className="GetPing">
      <div className="displayPing">Ping : {lastCalculatedPing ? lastCalculatedPing : 'x'}</div>
      <div>ping stamp : {pingStamp ? pingStamp : 0}</div>
      <div>calculated : {lastCalculatedPing }</div>
      <button onClick={() => handlePing()}>calculate ping</button>
    </div>
  )
}
