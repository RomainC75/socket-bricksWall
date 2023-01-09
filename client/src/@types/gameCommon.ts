export interface GameInitialisation {
  player1: string
  player2: string
  roomName: string
  isAccepted: boolean
  isWaitingToBegin: boolean
  dimensions: [number, number]
  bricks: BrickPosition[]
  ball: {
    x: number
    y: number
    radius: number
  }
  barDim: RectangleDimensions
  brickDim: RectangleDimensions
  player1Bar: PlayerBarCoordinatesInterface
  player2Bar: PlayerBarCoordinatesInterface
}

export interface GameInfosServerToClientInterface {
  bar1Y: number
  bar2Y: number
  ball: [number, number]
  bricks: BrickPosition[]
}

export interface BrickPosition {
  x: number
  y: number
  color: string
}

export interface RectangleDimensions {
  width: number
  height: number
}

export interface PlayerBarCoordinatesInterface {
  x: number
  y: number
}