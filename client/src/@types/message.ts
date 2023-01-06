export interface MessageInterface {
  _id: string
  message: string
  fromSelf?: boolean
  from: string
  to: string
  createdAt: string
}

export interface MessageClientToServerInterface{
  to:string
  message: string
}