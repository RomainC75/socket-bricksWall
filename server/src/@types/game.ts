import Game from '../game/game'
import { Server } from 'socket.io'

export interface PlayingGameInterface {
  player1: string
  player2: string
  roomName: string
  isAccepted: boolean
  isWaitingToBegin: boolean
  waitingTime: number
  game: Game
  io: Server
}

export interface NewPositionsInterface {
  bar1Y: number,
  bar2Y: number,
  ball: [number, number],
  bricks: BricksPositionsInterface[]
}

export interface BricksPositionsInterface {
  x: number,
  y: number,
  color: string
}

export interface PointsInterface{
  player1:number
  player2:number
}