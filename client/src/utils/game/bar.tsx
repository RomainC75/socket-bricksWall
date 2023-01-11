export default class Bar {
   x: number
   y: number
   canvasDimentions: [number, number]
   barLength: number
   barWidth: number
   isPlayer1: boolean

   constructor(x: number, canvasDimensions: [number, number], barLength: number, barWidth: number, isPlayer1: boolean) {
      //centered coordinates
      this.x = x
      this.y = canvasDimensions[1] / 2
      this.canvasDimentions = canvasDimensions
      this.barLength = barLength
      this.barWidth = barWidth
      this.isPlayer1 = isPlayer1
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
      return [this.isPlayer1 ? this.x-this.barWidth/2 : this.x , this.y - this.barLength / 2]
   }
   getY(){
    return this.y
   }
   
}
