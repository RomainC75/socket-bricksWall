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

    </div>
  )
}

export default MessagesBox