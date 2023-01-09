import React from 'react'
import { PublicMessageInterface, PrivateMessageInterface } from '../@types/message'



export const MessageBubble = ({message}: PublicMessageInterface|PrivateMessageInterface) => {


  return (
    <div className='MessageBubble'>MessageBubble</div>
  )
}
