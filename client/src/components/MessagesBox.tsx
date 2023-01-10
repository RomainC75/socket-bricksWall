import { PrivateMessageInterface, PublicMessageInterface } from '../@types/message'

import './styles/messagesBox.css'

interface MessagesBoxInterface {
  conversation: (PublicMessageInterface | PrivateMessageInterface)[]
  isPublic?: boolean
}

const MessagesBox = ({ conversation, isPublic }: MessagesBoxInterface) => {
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
    </div>
  )
}

export default MessagesBox
