import React, { useState, useContext } from 'react'
import { SocketContext } from '../context/socket.context'
import { SocketContextInterface } from '../@types/socketContext'



const Connection = (): JSX.Element => {
  const { socket } = useContext(SocketContext) as SocketContextInterface
  const [usernameState, setUsernameState] = useState<string>('')

  const handleUsername = (name: string) => {
    setUsernameState(name)
  }

  const handleConnectionWithName = ()=>{
    if(socket){
      socket.emit('new_username',{
        username: usernameState,
        socketID: socket.id
      })
    }
    setUsernameState('')
  }



  return (
    <div className="Connection">
      Please, enter you username :<input value={usernameState} onChange={(e) => handleUsername(e.target.value)}></input>
      <button className="tab" onClick={handleConnectionWithName}>connect</button>
    </div>
  )
}

export default Connection
