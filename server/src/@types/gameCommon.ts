export interface GameInfosServerToClientInterface {
    bar1Y: number
    bar2Y: number
    ball: [number, number]
    bricks: BrickPosition[]
  }
  
  interface BrickPosition {
    x: number
    y: number
  }