export interface MessageInterface {
  message: string
  fromSelf?: boolean
  date: Date
  from: string
  to: string
}

export interface MessageClientToServerInterface{
  to:string
  message: string
}