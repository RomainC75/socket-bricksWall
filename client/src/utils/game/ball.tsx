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

  bouncesOnWall(): void {
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


  // Bounce on brick
  bouncesOnRightSide() {
    if (this.directionInDeg < 180) {
      this.directionInDeg = 180 - this.directionInDeg
    } else if (this.directionInDeg >= 180) {
      this.directionInDeg = 540 - this.directionInDeg
    }
  }
  bouncesOnLeftSide() {
   if (this.directionInDeg >= 90 && this.directionInDeg < 180) {
      this.directionInDeg = 180 - this.directionInDeg 
    } else if (this.directionInDeg >= 180 && this.directionInDeg < 270) {
      this.directionInDeg = 540 - this.directionInDeg 
    }
  }
  bouncesOnTopSide(){
   this.directionInDeg = 360 - this.directionInDeg 
  }
  bouncesOnBottomSide(){
   this.directionInDeg = 360 - this.directionInDeg 
  }

  

  bouncesOnPaddle(distanceToTheCenter: number): void {
    const nudge = distanceToTheCenter * SIDE_EFFECT
    if (this.directionInDeg >= 90 && this.directionInDeg < 180) {
      this.directionInDeg = 180 - this.directionInDeg + nudge
    } else if (this.directionInDeg >= 180 && this.directionInDeg < 270) {
      this.directionInDeg = 540 - this.directionInDeg + nudge
    } else if (this.directionInDeg < 90) {
      this.directionInDeg = 180 - this.directionInDeg - nudge
    } else if (this.directionInDeg >= 270) {
      this.directionInDeg = 540 - this.directionInDeg - nudge
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
    this.verifyAngleAndProtectAgainstOffLimits()
    if (this.isInContactWithSideWalls()) {
      this.bouncesOnWall()
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

  // is in Contact with a Brick
  isInContactWithLeftSideOfBrick(brick: Brick):boolean {
    if (this.x < brick.getX() && this.x > brick.getLeftSideX()-this.radius) {
      if (this.y >= brick.getTopSideY() && this.y <= brick.getBottomSideY()) {
        return true
      }
    }
    return false
  }

  isInContactWithRightSideOfBrick(brick: Brick):boolean {
    if (this.x > brick.getX()+brick.width/2 && this.x < brick.getRightSideX()+this.radius) {
      if (this.y >= brick.getTopSideY() && this.y <= brick.getBottomSideY()) {
        return true
      }
    }
    return false
  }

  isInContactWithTopSideOfBrick(brick: Brick):boolean {
    if (this.y < brick.getY()-brick.height/2 && this.y > brick.getTopSideY() - this.radius) {
      if (this.x >= brick.getLeftSideX() && this.x <= brick.getRightSideX()) {
        return true
      }
    }
    return false
  }

  isInContactWithBottomSideOfBrick(brick: Brick):boolean {
   if (this.y > brick.getY() && this.y < brick.getBottomSideY() + this.radius) {
      if (this.x >= brick.getLeftSideX() && this.x <= brick.getRightSideX()) {
        return true
      }
    }
    return false
  }

  isInContactWithBottomLeftCorner(brick: Brick) {
    const cornerCoord = {
      x: brick.getLeftSideX(),
      y: brick.getBottomSideY(),
    }
    const xDistanceToTheCorner = this.x - cornerCoord.x
    const yDistanceToTheCorner = cornerCoord.y - this.y
    const distanceToTheCorner = Math.sqrt(xDistanceToTheCorner ** 2 + yDistanceToTheCorner ** 2)
    if (xDistanceToTheCorner >= 0 && yDistanceToTheCorner >= 0 && distanceToTheCorner <= this.radius) {
      return true
    }
  }

  setNewCoordinates(coord:[number, number]){
    this.x=coord[0]
    this.y=coord[1]
   }
}
