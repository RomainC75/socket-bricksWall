import { Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents, ConnectedUsersInterface, ProposalInterface } from './socketio'
import { MessageInterface } from './message'
import { GameInfosServerToClientInterface, GameInitialisation } from './gameCommon'

export interface SocketContextInterface {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
  pingStamp: number | null
  setPingStamp: (timeStamp: number) => void
  lastCalculatedPing: number | null
  setLastCalculatedPing: (timestamp: number | null) => void
  isConnectedToSocket: boolean
  isConnectedAsUser: boolean
  connectedUsers: ConnectedUsersInterface[]
  privateMessages: MessageInterface[]
  publicMessages: MessageInterface[]
  username: string | null
  playProposalRequests: ProposalInterface[]
  gameInitialisation: GameInitialisation | null
  newGameInfosToDisplay: GameInfosServerToClientInterface | null
}
