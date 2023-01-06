import React, { useState, useContext, useEffect } from 'react'
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

  useEffect(()=>{
    setFilteredMessages(privateMessages.filter((user) => user.from === selectedChannel || user.to === selectedChannel))
    console.log('===>',privateMessages)
  },[privateMessages, selectedChannel])


  useEffect(()=>{

  },[publicMessages])

  return (
    <div className="Chat">
      <div className="tabs">
        <div className={selectedChannel==='public' ? "tab public selected" : "tab public"} onClick={() => handleSelectChannel('public')}>
          public
        </div>
        {connectedUsers
          .filter((user) => !user.self)
          .map((user, index) => (
            <div className={selectedChannel===user.username ? "tab selected" : "tab"} key={`${index}-${user.username}`} onClick={() => handleSelectChannel(user.username)}>
              {user.username}
            </div>
          ))}
      </div>
      <MessagesBox conversation={filteredMessages} isPublic={isPublic} />
      <SendMessage selectedChannel={selectedChannel} />

      {JSON.stringify(filteredMessages)}
    </div>
  )
}
