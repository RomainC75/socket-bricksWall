import Bar from './bar'
import Ball from './ball'

export default class Game {
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
  //P1/left:true

  constructor(context: CanvasRenderingContext2D, canvasDimensions: [number, number]) {
    this.ctx = context
    this.barWidth = 10
    this.barLength = 50
    this.bar1_X = 20
    this.bar2_X = canvasDimensions[0] - this.barWidth / 2 - 20
    this.bar1 = new Bar(this.bar1_X, canvasDimensions, this.barLength, this.barWidth, true)
    this.bar2 = new Bar(this.bar2_X, canvasDimensions, this.barLength, this.barWidth, false)
    this.canvasDimensions = canvasDimensions
    this.createEventsListeners()
    this.ctx.fillRect(20, 20, 20, 20)
    this.clockStarted = false
    this.ballRadius = 10
    this.ball = new Ball(
      this.canvasDimensions[0] / 2,
      this.canvasDimensions[1] - 200,
      this.canvasDimensions,
      this.ballRadius
    )
    this.isPlayer1Turn = false
  }

  createEventsListeners() {
    document.addEventListener('keydown', (e) => {
      console.log(e.keyCode)
      switch (e.keyCode) {
        case 38:
          this.bar1.goUp()
          break
        case 40:
          this.bar1.goDown()
          break
        case 32:
          if (!this.clockStarted) {
            this.clockStarted = true
            //==============================
            this.ball.launch(350)
            this.startClock()
          }
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

  updateCanvas() {
    this.ctx.clearRect(0, 0, this.canvasDimensions[0], this.canvasDimensions[1])
  }

  isInFrontOfBar(bar:Bar):boolean{
    if(this.ball.getY() > bar.getY()-this.barLength/2 && this.ball.getY() < bar.getY()+this.barLength/2){
        return true
    }
    return false
  }

  startClock() {
    this.updateCanvas()
    this.drawBar(this.bar1)
    this.drawBar(this.bar2)
    
    if (this.isPlayer1Turn && this.ball.getX() < this.bar1_X + this.ballRadius && this.isInFrontOfBar(this.bar1) )  {
      this.ball.bounceOnPaddle(this.isPlayer1Turn, this.ball.getY()-this.bar1.getY())
      this.isPlayer1Turn = !this.isPlayer1Turn
    //   && this.isInFrontOfBar(this.bar2)
    } else if (!this.isPlayer1Turn && this.ball.getX() >= this.bar2_X - this.ballRadius ) {
      console.log('yea')
    //   this.ball.getY()-this.bar2.getY()
      this.ball.bounceOnPaddle(this.isPlayer1Turn, 0)
      this.isPlayer1Turn = !this.isPlayer1Turn
    }

    this.ball.move()
    this.drawBall()

    requestAnimationFrame(() => this.startClock())
  }
}

export { Game }
