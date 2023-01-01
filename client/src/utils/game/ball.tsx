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
         console.log('4')
         this.directionInDeg = 360 - this.directionInDeg
      }
   }

   bounceOnPaddle(side: boolean): void {
      //against the left paddle :true
      //against the right paddle :false
      if (side) {
         if (this.directionInDeg < 180) {
            this.directionInDeg = 180 - this.directionInDeg
         } else if (this.directionInDeg >= 180) {
            this.directionInDeg = 540 - this.directionInDeg
         }
      } else {
         if (this.directionInDeg < 90) {
            this.directionInDeg = 180 - this.directionInDeg
         } else if (this.directionInDeg >= 270) {
            this.directionInDeg = 540 - this.directionInDeg
         }
      }
   }

   move(): void {
      // console.log('new coodz', this.x, this.y)
      if (this.directionInDeg > 360) {
         this.directionInDeg = this.directionInDeg % 360
      }
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
      //   console.log(this.directionInRad)
   }

   getX(): number {
      return Math.round(this.x)
   }

   getY(): number {
      return Math.round(this.y)
   }
}
