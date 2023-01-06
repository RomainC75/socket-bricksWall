import React, {useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import './styles/sendMessage.css'

const SendMessage = ():JSX.Element => {
    const [newMessage, setNewMessage] = useState<string>('')

    const handleNewMessage = (e:React.ChangeEvent<HTMLInputElement>):void=>{
        setNewMessage(e.target.value)
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
          onChange={handleNewMessage}
        />
        <Button variant="contained">Send</Button>
    </div>
  )
}

export default SendMessage