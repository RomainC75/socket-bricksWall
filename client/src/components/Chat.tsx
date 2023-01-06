import React, { useState, useContext } from 'react'
import { SocketContext } from '../context/socket.context'
import { SocketContextInterface } from '../@types/socketio'
import MessagesBox from './MessagesBox'
import { MessageInterface } from '../@types/message'
import SendMessage from './SendMessage'

import './styles/chat.css'

export const Chat = () => {
  const { socket, connectedUsers, privateMessages, publicMessages } = useContext(SocketContext) as SocketContextInterface
  const [filteredMessages, setFilteredMessages] = useState<MessageInterface[]>([])
  const [isPublic, setIsPublic] = useState<boolean>(false)
    const [selectedChannel, setSelectedChannel] = useState<string | null>(null)

  const handleSelectChannel = (username: string) => {
    setSelectedChannel(username)
    if (username === 'public') {
      setFilteredMessages(publicMessages)
      setIsPublic(true)
    } else {
      setFilteredMessages(privateMessages.filter((user) => user.from === username && user.to === username))
      setIsPublic(false)
    }
  }

  return (
    <div className="Chat">
      <div className="tabs">
        <div className="tab public" onClick={() => handleSelectChannel('public')}>
          public
        </div>
        {connectedUsers
          .filter((user) => !user.self)
          .map((user, index) => (
            <div className="tab" key={`${index}-${user.username}`} onClick={() => handleSelectChannel(user.username)}>{user.username}</div>
          ))}
      </div>
      <MessagesBox conversation={filteredMessages} isPublic={isPublic} />
      <SendMessage selectedChannel={selectedChannel}/>

      {JSON.stringify(connectedUsers)}
    </div>
  )
}
