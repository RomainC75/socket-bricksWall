import React, { useRef, useEffect, useContext } from 'react'
import { GameInitialisation } from '../@types/gameCommon'
import { SocketContext } from '../context/socket.context'
import { SocketContextInterface } from '../@types/socketContext'

import GameDisplay from '../utils/game/gameDisplay'
import './styles/canvas.css'



const Canvas = () => {
   const { socket, isConnectedToSocket, isConnectedAsUser, gameInitialisation } = useContext(SocketContext) as SocketContextInterface
   const canvasRef = useRef<HTMLCanvasElement>(null)

   useEffect(() => {
      const canvas: HTMLCanvasElement | null = canvasRef.current
      const context: CanvasRenderingContext2D | null = canvas && canvas.getContext('2d')
      if (context && gameInitialisation) {
         const gameDisplay = new GameDisplay( context, gameInitialisation)

      }
   }, [])

   return (
      <div className="canvasGame">
         {
            gameInitialisation &&  <canvas ref={canvasRef} width={gameInitialisation.dimensions[0]} height={gameInitialisation.dimensions[1]} />
         }
      </div>
   )
}

Canvas.defaultProps = {
   width: 600,
   height: 300,
}

export default Canvas


