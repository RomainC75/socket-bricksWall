export default class Bar {
   x: number
   y: number
   canvasDimentions: [number, number]
   barLength: number
   barWidth: number

   constructor(x: number, canvasDimensions: [number, number], barLength: number, barWidth: number) {
      //centered coordinates
      this.x = x
      this.y = canvasDimensions[1] / 2
      this.canvasDimentions = canvasDimensions
      this.barLength = barLength
      this.barWidth = barWidth
   }
   goUp(): void {
      if (this.y >= this.barLength / 2) {
         this.y -= 3
      }
   }
   goDown(): void {
      if (this.y < this.canvasDimentions[1] - this.barLength / 2) {
         this.y += 3
      }
   }
   getCoordinatesToDraw(): [number, number] {
      return [this.x-this.barWidth/2, this.y - this.barLength / 2]
   }
}
