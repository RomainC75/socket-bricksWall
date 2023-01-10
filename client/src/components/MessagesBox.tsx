import { useEffect } from 'react'
import { PrivateMessageInterface, PublicMessageInterface } from '../@types/message'

import './styles/messagesBox.css'

interface MessagesBoxInterface {
  conversation: (PublicMessageInterface | PrivateMessageInterface)[]
  selectedChannel: string | null
}

const MessagesBox = ({ conversation, selectedChannel }: MessagesBoxInterface) => {
  useEffect(() => {
    console.log('conversation : ', conversation)
  }, [conversation])
  
  return (
    <div className="MessagesBox">
      {conversation
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((message, index) => {
          const fullTime = new Date(message.createdAt)
          const hours = fullTime.getHours() < 10 ? `0${fullTime.getHours()}` : fullTime.getHours() 
          const minutes = fullTime.getMinutes() < 10 ? `0${fullTime.getMinutes()}` : fullTime.getMinutes() 
          return (
            <div className={message.fromSelf ? 'message self' : 'message'} key={message._id}>
              <div className="time">{`${hours}:${minutes}`}</div>
              <div className={message.fromSelf ? 'text self' : 'text'}>
                <p>{message.message}</p>
              </div>
            </div>
          )
        })}
        {}
      {/* {JSON.stringify(conversation)} */}
    </div>
  )
}

export default MessagesBox
