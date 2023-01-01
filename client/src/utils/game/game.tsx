import Bar from "./bar"
import Ball from "./ball"

export default class Game {
    ctx: CanvasRenderingContext2D;
    bar1: Bar;
    canvasDimensions: [number,number];
    barWidth:number;
    clockStarted: boolean;
    ball: Ball;

    constructor(context: CanvasRenderingContext2D, canvasDimensions: [number,number]) {
      this.ctx = context
      this.bar1 = new Bar(canvasDimensions[0] - 20, canvasDimensions)
      this.canvasDimensions = canvasDimensions
      this.barWidth = 40
      this.createEventsListeners()
      this.ctx.fillRect(20, 20, 20, 20)
      this.clockStarted = false
      this.ball = new Ball(
        this.canvasDimensions[0] / 2,
        this.canvasDimensions[1] - 200,
        this.canvasDimensions
      )
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
              this.ball.launch(110)
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

    drawBar(){
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(
        this.bar1.getCoordinates()[0],
        this.bar1.getCoordinates()[1],
        10,
        this.barWidth
      )
  
    }
  
    updateCanvas() {
      this.ctx.clearRect(0, 0, this.canvasDimensions[0], this.canvasDimensions[1])
    }
  
    startClock() {
      this.updateCanvas()
      this.drawBar()
      // ball
      this.ball.move()
      this.drawBall()
      requestAnimationFrame(() => this.startClock())
    }
  }
  
export {Game}