export interface MessageInterface {
  _id: string
  message: string
  fromSelf?: boolean
  from: string
  to: string
  createdAt: string
}

export interface PrivateMessageClientToServerInterface{
  to:string
  message: string
}