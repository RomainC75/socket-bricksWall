import Bar from './bar'
import Ball from './ball'
import BricksHandler from './bricksHandler'
import Brick from './brick'
import {
  GameInitialisation,
  BrickPosition,
  RectangleDimensions,
  GameInfosServerToClientInterface,
  PlayerBarCoordinatesInterface,
} from '../../@types/gameCommon'

export default class GameDisplay {
  ctx: CanvasRenderingContext2D
  bar1: PlayerBarCoordinatesInterface
  bar2: PlayerBarCoordinatesInterface
  canvasDimensions: [number, number]
  barWidth: number
  barLength: number
  clockStarted: boolean
  ball: Ball
  ballRadius: number
  isPlayer1Turn: boolean
  bricksPositions: BrickPosition[]
  brickDim: RectangleDimensions
  //P1/left:true

  constructor(context: CanvasRenderingContext2D, gameInitialisation: GameInitialisation) {
    this.ctx = context
    this.barWidth = gameInitialisation.barDim.width
    this.barLength = gameInitialisation.barDim.height
    this.bar1 = {
      x: gameInitialisation.player1Bar.x,
      y: gameInitialisation.player1Bar.y,
    }
    this.bar2 = {
      x: gameInitialisation.player2Bar.x,
      y: gameInitialisation.player2Bar.y,
    }
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
    this.bricksPositions = gameInitialisation.bricks
    this.brickDim = gameInitialisation.brickDim

    // this.bricksHandler.oneCentralBrickInitialiser()
    this.firstDraw()
  }

  // attachEvents() {
  //   document.addEventListener('keydown', (e: KeyboardEvent) => {
  //     console.log(e.keyCode)
  //     switch (e.keyCode) {
  //       case 38:
  //         console.log('up')
  //         break
  //       case 40:
  //         console.log('down')
  //         break
  //       case 32:
  //         console.log('space')
  //         break
  //     }
  //   })
  // }

  drawBall() {
    this.ctx.beginPath()
    this.ctx.arc(this.ball.getX(), this.ball.getY(), 10, 0, 2 * Math.PI)
    this.ctx.fillStyle = 'red'
    this.ctx.fill()
    this.ctx.closePath()
  }

  drawBars() {
    this.ctx.fillStyle = 'blue'
    this.ctx.fillRect(this.bar1.x, this.bar1.y, this.barWidth, this.barLength)
    this.ctx.fillStyle = 'blue'
    this.ctx.fillRect(this.bar2.x, this.bar2.y, this.barWidth, this.barLength)
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

  firstDraw() {
    this.updateCanvas()
    this.drawBars()

    this.ball.move()
    this.drawBall()

    this.drawBricks()
  }

  setNewPositions(data: GameInfosServerToClientInterface) {
    this.bar1.y=data.bar1Y
    this.bar2.y=data.bar2Y
    this.ball.setNewCoordinates(data.ball)
    this.bricksPositions=data.bricks
  }

  displayNextImage() {
    this.updateCanvas()
    this.drawBars()


    // this.ball.move()
    this.drawBall()
    this.drawBricks()
    console.log('this.ball ',this.ball.getX(),this.ball.getY())
    // requestAnimationFrame(() => this.displayNextImage())
  }
}
