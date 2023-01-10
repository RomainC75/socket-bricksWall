import { useState, useContext, useEffect } from 'react'
import { SocketContext } from '../context/socket.context'
import { SocketContextInterface } from '../@types/socketContext'
import MessagesBox from './MessagesBox'
import { PublicMessageInterface, PrivateMessageInterface } from '../@types/message'
import SendMessage from './SendMessage'

import './styles/chat.css'

export const Chat = () => {
  const { socket, connectedUsers, privateMessages, publicMessages } = useContext(SocketContext) as SocketContextInterface
  const [filteredMessages, setFilteredMessages] = useState<(PublicMessageInterface|PrivateMessageInterface)[]>([])
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)

  const handleSelectChannel = (username: string) => {
    setSelectedChannel(username)
    if (username === 'public') {
      setFilteredMessages(publicMessages)
      console.log('ALL public messages : ', publicMessages)
    } else {
      setFilteredMessages(privateMessages.filter((user) => user.from === username || user.to === username))
      console.log('ALL PRivate messages : ', privateMessages)
    }
  }

  useEffect(()=>{
    if(selectedChannel==='public'){
      setFilteredMessages(publicMessages)
    }else{
      setFilteredMessages(privateMessages.filter((user) => user.from === selectedChannel || user.to === selectedChannel))
      console.log('===>',privateMessages)
    }
  },[publicMessages, privateMessages])

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
      <MessagesBox conversation={filteredMessages} selectedChannel={selectedChannel}/>
      <SendMessage selectedChannel={selectedChannel} />
          
      {/* {JSON.stringify(selectedChannel)} */}
    </div>
  )
}
