import Bar from "./bar"
import Ball from "./ball"

export default class Game {
    ctx: CanvasRenderingContext2D;
    bar1: Bar;
    bar2: Bar;
    canvasDimensions: [number,number];
    barWidth:number;
    barLength: number;
    clockStarted: boolean;
    ball: Ball;
    ballRadius: number;
    bar1_X: number;
    bar2_X: number;
    isPlayerLeftTurn:boolean

    constructor(context: CanvasRenderingContext2D, canvasDimensions: [number,number]) {
      this.ctx = context
      this.barWidth = 10
      this.barLength = 50
      this.bar1_X = 20
      this.bar2_X = canvasDimensions[0] - 20
      this.bar1 = new Bar(this.bar1_X, canvasDimensions, this.barLength, this.barWidth)
      this.bar2 = new Bar(this.bar2_X, canvasDimensions, this.barLength, this.barWidth)
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
      this.isPlayerLeftTurn=false
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

    drawBar(bar: Bar){
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(
        bar.getCoordinatesToDraw()[0],
        bar.getCoordinatesToDraw()[1],
        this.barWidth,
        this.barLength
      )
  
    }
  
    updateCanvas() {
      this.ctx.clearRect(0, 0, this.canvasDimensions[0], this.canvasDimensions[1])
    }
  
    startClock() {
      this.updateCanvas()
      this.drawBar(this.bar1)
      this.drawBar(this.bar2)
      // ball
      const bar1FrontEdgeX = this.bar1_X+this.barWidth/2
      const bar2FrontEdgeX = this.bar2_X-this.barWidth/2
      console.log("bar1FrontEdgeX",bar1FrontEdgeX, this.ball.getX())
      if(this.isPlayerLeftTurn && this.ball.getX()<bar1FrontEdgeX + this.ballRadius){
        this.ball.bounceOnPaddle(this.isPlayerLeftTurn)
        this.isPlayerLeftTurn = !this.isPlayerLeftTurn
      }else if(!this.isPlayerLeftTurn && this.ball.getX()>=bar2FrontEdgeX -this.ballRadius){
        console.log('yea')
        this.ball.bounceOnPaddle(this.isPlayerLeftTurn)
        this.isPlayerLeftTurn = !this.isPlayerLeftTurn
      }

      this.ball.move()
      this.drawBall()
      requestAnimationFrame(() => this.startClock())
    }
  }
  
export {Game}