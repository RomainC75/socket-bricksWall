import Brick from './brick'

const BRICK_STRIP_WIDTH = 100
const STANDARD_HEIGHT = 40
const STANDARD_WIDTH = 40

export default class BricksHandler {
  bricks: Brick[]
  brickWidth: number
  brickHeight: number
  canvasDimensions: [number, number]
  possibleColors: string[]

  constructor(canvasDimensions: [number, number]) {
    this.bricks = []
    this.brickWidth = STANDARD_WIDTH
    this.brickHeight = STANDARD_HEIGHT
    this.canvasDimensions = canvasDimensions
    this.possibleColors = ['blue', 'red', 'yellow', 'green']
  }

  addBrick(x: number, y: number, color: string): void {
    this.bricks.push(new Brick(x, y, this.brickWidth, this.brickHeight, color))
  }

  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.possibleColors.length)
    return this.possibleColors[randomIndex]
  }

  bricksInitialiser(): void {
    const XStart = this.canvasDimensions[0] / 2 - BRICK_STRIP_WIDTH / 2 + this.brickWidth / 2
    const XEnd = this.canvasDimensions[0] / 2 + BRICK_STRIP_WIDTH / 2 - this.brickWidth / 2
    const YStart = 0 + this.brickWidth / 2
    const YEnd = this.canvasDimensions[1] - this.brickWidth / 2
    console.log(XStart,XEnd,YStart,YEnd)
    for (let X = XStart; X <= XEnd; X += this.brickWidth) {
      for (let Y = YStart; Y <= YEnd; Y += this.brickHeight) {
        const color = this.getRandomColor()
        this.addBrick(X,Y,color)
      }
    }
  }

  // oneCentralBrickInitialiser():void{
  //   this.addBrick(this.canvasDimensions[0]/2,this.canvasDimensions[1]/2,"blue")
    // this.addBrick(this.canvasDimensions[0]/2,240,"blue")
  // }

  getBricks():Brick[]{
    return this.bricks
  }

  getBricksPositions(){
    return this.bricks.map(brick=>{
      return{
        x:brick.getX(),
        y:brick.getY()
      }
    })
  }

  

  removeBrickAt(index:number):void{
    this.bricks.splice(index,1)
  }

}
