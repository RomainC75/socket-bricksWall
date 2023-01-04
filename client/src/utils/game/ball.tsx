import Brick from './brick'

const SIDE_EFFECT = 1

const BRICK_STANDARD_HEIGHT = 20
const BRICK_STANDARD_WIDTH = 20

export default class Ball {
  x: number
  y: number
  speed: number
  directionInDeg: number
  canvasDimensions: [number, number]
  radius: number

  constructor(x: number, y: number, canvasDimensions: [number, number], radius: number) {
    this.x = x
    this.y = y
    this.speed = 3
    this.directionInDeg = 0
    this.canvasDimensions = canvasDimensions
    this.radius = radius
  }

  isInContactWithSideWalls(): boolean {
    if (this.y >= this.canvasDimensions[1] - this.radius || this.y <= this.radius) {
      return true
    }
    return false
  }

  bounceOnWall(): void {
    if (this.directionInDeg < 90) {
      this.directionInDeg = 360 - this.directionInDeg
    } else if (this.directionInDeg >= 270 && this.directionInDeg < 360) {
      this.directionInDeg = 360 - this.directionInDeg
    } else if (this.directionInDeg >= 180 && this.directionInDeg < 270) {
      this.directionInDeg = 360 - this.directionInDeg
    } else if (this.directionInDeg >= 90 && this.directionInDeg < 180) {
      this.directionInDeg = 360 - this.directionInDeg
    }
  }

  bounceOnRightSideOfBall(){
   
  }

  bounceOnPaddle(side: boolean, distanceToTheCenter: number): void {
    console.log('distance : ', distanceToTheCenter)
    //against the left paddle :true
    //against the right paddle :false

    const nudge = distanceToTheCenter * SIDE_EFFECT
    if (side) {
      if (this.directionInDeg < 180) {
        this.directionInDeg = 180 - this.directionInDeg + nudge
      } else if (this.directionInDeg >= 180) {
        this.directionInDeg = 540 - this.directionInDeg + nudge
      }
    } else {
      if (this.directionInDeg < 90) {
        this.directionInDeg = 180 - this.directionInDeg - nudge
      } else if (this.directionInDeg >= 270) {
        this.directionInDeg = 540 - this.directionInDeg - nudge
      }
    }
  }

  verifyAngleAndProtectAgainstOffLimits() {
    if (this.directionInDeg > 360) {
      this.directionInDeg = this.directionInDeg % 360
    } else if (this.directionInDeg < 0) {
      this.directionInDeg = 360 + this.directionInDeg
    }
  }

  move(): void {
    // console.log('new coodz', this.x, this.y, this.directionInDeg)
    this.verifyAngleAndProtectAgainstOffLimits()
    if (this.isInContactWithSideWalls()) {
      this.bounceOnWall()
    }
    // move depending on the directionInDeg
    if (this.directionInDeg >= 0 && this.directionInDeg < 90) {
      const directionInRad = (this.directionInDeg * Math.PI) / 180
      this.x = this.x + Math.cos(directionInRad) * this.speed
      this.y = this.y + Math.sin(directionInRad) * this.speed
    } else if (this.directionInDeg >= 90 && this.directionInDeg < 180) {
      const directionInRad = ((180 - this.directionInDeg) * Math.PI) / 180
      this.x = this.x - Math.cos(directionInRad) * this.speed
      this.y = this.y + Math.sin(directionInRad) * this.speed
    } else if (this.directionInDeg >= 180 && this.directionInDeg < 270) {
      const directionInRad = ((270 - this.directionInDeg) * Math.PI) / 180
      this.x = this.x - Math.sin(directionInRad) * this.speed
      this.y = this.y - Math.cos(directionInRad) * this.speed
    } else if (this.directionInDeg >= 270 && this.directionInDeg < 360) {
      const directionInRad = ((360 - this.directionInDeg) * Math.PI) / 180
      this.x = this.x + Math.cos(directionInRad) * this.speed
      this.y = this.y - Math.sin(directionInRad) * this.speed
    }
  }

  launch(directionInDeg: number): void {
    this.directionInDeg = directionInDeg
  }

  getX(): number {
    return Math.round(this.x)
  }

  getY(): number {
    return Math.round(this.y)
  }

  isInContactWithLeftSideOfBrick(brick: Brick) {
    if (this.x < brick.getX() && this.x > brick.getLeftSideX()) {
      if (this.y <= brick.getTopSideY() && this.y >= brick.getBottomSideY()) {
        return true
      }
    }
  }

  isInContactWithBottomLeftCorner(brick: Brick){
   const cornerCoord = {
      x: brick.getLeftSideX(),
      y: brick.getBottomSideY()
   }
   const xDistanceToTheCorner = this.x - cornerCoord.x
   const yDistanceToTheCorner = cornerCoord.y - this.y
   const distanceToTheCorner = Math.sqrt(xDistanceToTheCorner**2 + yDistanceToTheCorner**2 )
   if(xDistanceToTheCorner>=0 && yDistanceToTheCorner>=0 && distanceToTheCorner <= this.radius){
      return true
   }
  }
}
