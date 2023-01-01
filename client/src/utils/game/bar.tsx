export default class Bar {
    x : number;
    y : number;
    canvasDimentions : [number,number];
    barWidth : number

    constructor(x:number, canvasDimensions:[number,number]) {
      //centered coordinates
      this.x = x
      this.y = canvasDimensions[1] / 2
      this.canvasDimentions = canvasDimensions
      this.barWidth = 40
    }
    goUp():void {
      if (this.y > this.barWidth / 2 + 3) {
        this.y -= 3
      }
    }
    goDown():void {
      if (this.y < this.canvasDimentions[1] - this.barWidth / 2) {
        this.y += 3
      }
    }
    getCoordinates():[number,number] {
      return [this.x, this.y - this.barWidth / 2]
    }
  }
