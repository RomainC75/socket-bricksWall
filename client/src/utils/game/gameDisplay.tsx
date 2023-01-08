import Bar from './bar'
import Ball from './ball'
import BricksHandler from './bricksHandler'
import Brick from './brick'
import { GameInitialisation, BrickPosition, RectangleDimensions } from '../../@types/gameCommon'

export default class GameDisplay {
  ctx: CanvasRenderingContext2D
  bar1: Bar
  bar2: Bar
  canvasDimensions: [number, number]
  barWidth: number
  barLength: number
  clockStarted: boolean
  ball: Ball
  ballRadius: number
  bar1_X: number
  bar2_X: number
  isPlayer1Turn: boolean
  bricksPositions: BrickPosition[]
  brickDim: RectangleDimensions
  //P1/left:true

  constructor(context: CanvasRenderingContext2D, gameInitialisation: GameInitialisation) {
    this.ctx = context
    this.barWidth = gameInitialisation.barDim.width
    this.barLength = gameInitialisation.barDim.height
    this.bar1_X = gameInitialisation.player1Bar.x
    this.bar2_X = gameInitialisation.player1Bar.y
    this.bar1 = new Bar(this.bar1_X, gameInitialisation.dimensions, this.barLength, this.barWidth, true)
    this.bar2 = new Bar(this.bar2_X, gameInitialisation.dimensions, this.barLength, this.barWidth, false)
    this.canvasDimensions = gameInitialisation.dimensions
    this.ctx.fillRect(20, 20, 20, 20)
    this.clockStarted = false
    this.ballRadius = 10
    this.ball = new Ball(
      this.canvasDimensions[0] / 2 + 200,
      this.canvasDimensions[1] - 50,
      this.canvasDimensions,
      this.ballRadius
    )
    this.isPlayer1Turn = false
    this.bricksPositions=gameInitialisation.bricks
    this.brickDim = gameInitialisation.brickDim
    
    // this.bricksHandler.oneCentralBrickInitialiser()
    this.firstDraw()
  }

  attachEvents(){
    document.addEventListener('keydown', (e:KeyboardEvent) => {
        console.log(e.keyCode)
        switch (e.keyCode) {
          case 38:
            console.log('upo')
            break
          case 40:
            console.log('down')
            break
          case 32:
            console.log('space')
            break
        }
      })
}

  drawBall() {
    this.ctx.beginPath()
    this.ctx.arc(this.ball.getX(), this.ball.getY(), 10, 0, 2 * Math.PI)
    this.ctx.fillStyle = 'red'
    this.ctx.fill()
    this.ctx.closePath()
  }

  drawBar(bar: Bar) {
    this.ctx.fillStyle = 'blue'
    this.ctx.fillRect(bar.getCoordinatesToDraw()[0], bar.getCoordinatesToDraw()[1], this.barWidth, this.barLength)
  }

  drawBrick(brick: BrickPosition, brickDim: RectangleDimensions) {
    this.ctx.fillStyle = brick.color
    const topLeftX = brick.x - brickDim.width / 2
    const topLeftY = brick.y - brickDim.height / 2
    this.ctx.fillRect(topLeftX, topLeftY, brickDim.width, brickDim.height)
  }

  drawBricks() {
    this.bricksPositions.forEach((brick) => {
      this.drawBrick(brick, this.brickDim)
    })
  }

  updateCanvas() {
    this.ctx.clearRect(0, 0, this.canvasDimensions[0], this.canvasDimensions[1])
  }


  firstDraw(){
    this.updateCanvas()
    this.drawBar(this.bar1)
    this.drawBar(this.bar2)


    this.ball.move()
    this.drawBall()

    this.drawBricks()
  }




  startClock() {
    this.updateCanvas()
    this.drawBar(this.bar1)
    this.drawBar(this.bar2)


    this.ball.move()
    this.drawBall()

    this.drawBricks()

    requestAnimationFrame(() => this.startClock())
  }
}
