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


