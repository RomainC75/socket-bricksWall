import {PrivateMessageClientToServerInterface, PublicMessageClientToServerInterface, PublicMessageInterface, PrivateMessageInterface} from './message'
import { GameInfosServerToClientInterface, GameInitialisation } from './gameCommon'

export interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
  connected_users: (data: ConnectedUsersInterface[]) => void
  user_already_used: ()=>void
  pong: ()=>void
  credential: (cred: CredentialsInterface)=>void
  new_public_message: (data: PublicMessageInterface)=>void
  new_private_message: (data: PrivateMessageInterface)=>void
  play_proposal_request: (data:ProposalInterface)=>void
  play_proposal_response: (data:ProposalInterface)=>void
  play_confirmation: (data:GameInitialisation)=>void
  error: (data: string)=>void
  next_turn_to_display: (data:GameInfosServerToClientInterface)=>void
  waitingClock: (data:number)=>void
  stop_game_response: ()=>void
  new_score:(data:{player1:number,player2:number})=>void
}

export interface ClientToServerEvents {
  new_username: (data: ConnectedUsersInterface) => void
  ping: (socketId:string) => void
  disconnect: (data: ConnectedUsersInterface)=>void
  public_message: (data : PublicMessageClientToServerInterface)=>void
  private_message: (data : PrivateMessageClientToServerInterface)=>void
  play_proposal_request: (data:ProposalInterface)=>void
  play_proposal_response: (data:ProposalInterface)=>void
  stop_game_request: ()=>void
  new_move: (data:{username:string,key:string})=>void
}

export interface ConnectedUsersInterface{
  username: string
  socketID: string
  self?:boolean
}

export interface CredentialsInterface{
  username: string
  password: string
}

export interface ProposalInterface{
  from: string
  to: string
  isAccepted?: boolean
  roomName?: string
}

export interface PlayConfirmationInterface{
  player1: string
  player2: string
  roomName: string
}
