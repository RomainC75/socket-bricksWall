import React from 'react'
import { MessageInterface } from '../@types/message'

import './styles/messagesBox.css'

interface MessagesBoxInterface{
    conversation:MessageInterface[]
    isPublic?:boolean
}

const MessagesBox = ({conversation, isPublic}:MessagesBoxInterface) => {

  return (
    <div className="MessagesBox">
        {conversation.map((message, index)=>
            <div className="message" key={message._id}>{JSON.stringify(message)}</div>)}
    </div>
  )
}

export default MessagesBox