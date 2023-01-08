export default class Brick {
  width: number
  height: number
  x: number
  y: number
  constructor(x:number, y:number, width: number, height: number, public color: string = 'black') {
    this.width = width
    this.height = height
    this.color = color
    this.x = x
    this.y = y
  }
  getCoordinates():[number,number]{
    return [this.x,this.y]
  }
  getX(){
    return this.x
  }
  getY(){
    
    return this.y
  }
  

  getLeftSideX():number{
    return this.x - this.width/2
  }

  getRightSideX():number{
    return this.x + this.width/2
  }

  getTopSideY():number{
    return this.y - this.height/2
  }

  getBottomSideY():number{
    return this.y + this.height/2
  }
}
