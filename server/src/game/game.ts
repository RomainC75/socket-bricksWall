import Bar from './bar'
import Ball from './ball'
import BricksHandler from './bricksHandler'
import Brick from './brick'

export default class Game {
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
  bricksHandler: BricksHandler
  nextMove: {
    player1: string | null
    player2: string | null
  }
  //P1/left:true

  constructor(canvasDimensions: [number, number]) {
    this.barWidth = 10
    this.barLength = 50
    this.bar1_X = 20
    this.bar2_X = canvasDimensions[0] - this.barWidth / 2 - 20
    this.bar1 = new Bar(this.bar1_X, canvasDimensions, this.barLength, this.barWidth, true)
    this.bar2 = new Bar(this.bar2_X, canvasDimensions, this.barLength, this.barWidth, false)
    this.canvasDimensions = canvasDimensions
    // this.createEventsListeners()
    // this.clockStarted = false
    this.ballRadius = 10
    this.ball = new Ball(
      this.canvasDimensions[0] / 2 + 200,
      this.canvasDimensions[1] - 50,
      this.canvasDimensions,
      this.ballRadius
    )
    this.bricksHandler = new BricksHandler(canvasDimensions)
    this.bricksHandler.bricksInitialiser()
    // this.bricksHandler.oneCentralBrickInitialiser()
    this.nextMove = {
      player1: null,
      player2: null
    }
  }


  isInFrontOfBar(bar: Bar): boolean {
    if (this.ball.getY() > bar.getY() - this.barLength / 2 && this.ball.getY() < bar.getY() + this.barLength / 2) {
      return true
    }
    return false
  }

  handleIfBouncingOnABrick() {
    try {
      this.bricksHandler.getBricks().forEach((brick: Brick, index: number) => {
        if (
          (this.ball.directionInDeg < 90 || this.ball.directionInDeg > 270) &&
          this.ball.isInContactWithLeftSideOfBrick(brick)
        ) {
          this.ball.bouncesOnRightSide()
          this.bricksHandler.removeBrickAt(index)
          throw new Error('')
        } else if (
          this.ball.directionInDeg >= 90 &&
          this.ball.directionInDeg < 270 &&
          this.ball.isInContactWithRightSideOfBrick(brick)
        ) {
          this.ball.bouncesOnLeftSide()
          this.bricksHandler.removeBrickAt(index)
          throw new Error('')
        } else if (this.ball.directionInDeg > 180 && this.ball.isInContactWithBottomSideOfBrick(brick)) {
          this.ball.bouncesOnTopSide()
          this.bricksHandler.removeBrickAt(index)
          throw new Error('')
        } else if (this.ball.directionInDeg < 180 && this.ball.isInContactWithTopSideOfBrick(brick)) {
          this.ball.bouncesOnBottomSide()
          this.bricksHandler.removeBrickAt(index)
          throw new Error('')
        }
      })
    } catch (error) {}
  }

  handleIfBouncingOnAWall() {
    if (this.ball.getX() < this.bar1_X + this.ballRadius && this.isInFrontOfBar(this.bar1)) {
      this.ball.bouncesOnPaddle(this.ball.getY() - this.bar1.getY())
      //   && this.isInFrontOfBar(this.bar2)
    } else if (this.ball.getX() >= this.bar2_X - this.ballRadius) {
      console.log('yea')
      //   this.ball.getY()-this.bar2.getY()
      this.ball.bouncesOnPaddle(0)
    }
  }

  handlePlayer1NextMove(command:string){
    this.nextMove.player1=command
  }
  handlePlayer2NextMove(command:string){
    this.nextMove.player2=command
  }

  clock() {
    // this.updateCanvas()
    this.handleIfBouncingOnAWall()
    this.handleIfBouncingOnABrick()

    this.ball.move()

    const bar1Y = this.bar1.getY()
    this.bar1=null
    const bar2Y = this.bar2.getY()
    this.bar2=null
    return {
      bar1Y:bar1Y,
      bar2Y:bar2Y,
      ball:[this.ball.getX(), this.ball.getY()],
      bricks: this.bricksHandler.getBricksPositions()
    }
  }
}
