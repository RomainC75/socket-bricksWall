import React, { useRef, useEffect, useContext, Ref } from 'react'
import { GameInfosServerToClientInterface, GameInitialisation } from '../@types/gameCommon'
import { SocketContext } from '../context/socket.context'
import { SocketContextInterface } from '../@types/socketContext'

import GameDisplay from '../utils/game/gameDisplay'
import './styles/canvas.css'

const Canvas = () => {
  const { socket, isConnectedToSocket, isConnectedAsUser, gameInitialisation, newGameInfosToDisplay, gameDisplay } =
    useContext(SocketContext) as SocketContextInterface
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // let gameDisplay: GameDisplay|null = null

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current
    const context: CanvasRenderingContext2D | null = canvas && canvas.getContext('2d')
    if (context && gameInitialisation) {
      gameDisplay.current = new GameDisplay(context, gameInitialisation)
    }
  }, [])

  useEffect(() => {
    console.log('update ! ', gameDisplay, newGameInfosToDisplay)
    gameDisplay.current && newGameInfosToDisplay && gameDisplay.current.setNewPositions(newGameInfosToDisplay)
    gameDisplay.current && gameDisplay.current.displayNextImage()
  }, [newGameInfosToDisplay])

  return (
    <div className="canvasGame">
      {gameInitialisation && (
        <canvas ref={canvasRef} width={gameInitialisation.dimensions[0]} height={gameInitialisation.dimensions[1]} />
      )}
    </div>
  )
}

Canvas.defaultProps = {
  width: 600,
  height: 300,
}

export default Canvas
