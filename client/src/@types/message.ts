
export interface PublicMessageInterface {
  _id: string
  message: string
  fromSelf?: boolean
  from: string
  
  createdAt: string
}

export interface PrivateMessageInterface extends PublicMessageInterface {
  to: string
}

export interface PrivateMessageClientToServerInterface{
  to:string
  message: string
}

export interface PublicMessageClientToServerInterface{
  message: string
}