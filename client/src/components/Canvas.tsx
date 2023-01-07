import React, { useRef, useEffect } from 'react'
import Game from '../utils/game/game'

import './styles/canvas.css'

interface CanvasProps {
   width: number
   height: number
}

const Canvas = ({ width, height }: CanvasProps) => {
   const canvasRef = useRef<HTMLCanvasElement>(null)

   useEffect(() => {
      const canvas: HTMLCanvasElement | null = canvasRef.current
      const context: CanvasRenderingContext2D | null = canvas && canvas.getContext('2d')
      if (context) {
         const game = new Game( context, [width,height] )

      }
   }, [])

   return (
      <div className="canvasGame">
         <canvas ref={canvasRef} width={width} height={height} />
      </div>
   )
}

Canvas.defaultProps = {
   width: 600,
   height: 300,
}

export default Canvas


