import { PrivateMessageInterface, PublicMessageInterface } from '../@types/message'

import './styles/messagesBox.css'

interface MessagesBoxInterface {
  conversation: (PublicMessageInterface | PrivateMessageInterface)[]
  isPublic?: boolean
}

const MessagesBox = ({ conversation, isPublic }: MessagesBoxInterface) => {
  return (
    <div className="MessagesBox">
      {conversation.sort((a,b)=>new Date(a.createdAt).getTime()-new Date(b.createdAt).getTime()).map((message, index) => (
        <div className={message.fromSelf ? 'message self' : 'message'} key={message._id}>
          <div className="time">{`${new Date(message.createdAt).getHours()}:${new Date(message.createdAt).getMinutes()}`}</div>
          <div className={message.fromSelf ? 'text self' : 'text'} >
            <p>{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MessagesBox
