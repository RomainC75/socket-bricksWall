import React, {useState, useContext} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SocketContext } from '../context/socket.context'
import { SocketContextInterface } from '../@types/socketio'

import './styles/sendMessage.css'
import { sendPrivatMessage } from '../utils/messageTools';
import PlayProposalButton from './PlayProposalButton';
import { selectClasses } from '@mui/material';

interface SendMessageInterface {
    selectedChannel: string | null
}

const SendMessage = ({selectedChannel}:SendMessageInterface):JSX.Element => {
    const { socket, connectedUsers, privateMessages, publicMessages } = useContext(SocketContext) as SocketContextInterface
    const [newMessage, setNewMessage] = useState<string>('')

    const handleNewMessage = ():void=>{
        if(selectedChannel && socket){
            sendPrivatMessage(socket, selectedChannel, newMessage)
            setNewMessage('')
        }
    }

  return (
    <div className='SendMessage'>
        {/* <input type="text" value={newMessage} onChange={handleNewMessage}/> */}
        <TextField
          id="outlined-multiline-static"
          label="new message"
          multiline
          rows={1}
          value={newMessage}
          onChange={e=>setNewMessage(e.target.value)}
        />
        <Button variant="contained" onClick={handleNewMessage} disabled={!selectedChannel}>Send</Button>
        {<PlayProposalButton selectedChannel={selectedChannel}/>}
    </div>
  )
}

export default SendMessage