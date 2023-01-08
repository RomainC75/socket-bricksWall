import React, {useContext} from 'react'
import { SocketContext } from '../context/socket.context'
import { ProposalInterface, SocketContextInterface } from '../@types/socketio'
import Button from '@mui/material/Button'

// to Accept the proposal
const PlayProposalsList = () => {
    const { socket, playProposalRequests } = useContext(SocketContext) as SocketContextInterface
    
    const handleAcceptProposal = (req:ProposalInterface) =>{
        socket && socket.emit('play_proposal_response',{
            ...req,
            isAccepted:true
        })
    }
  return (
    <div className='PlayProposalsList'>
        <ul>
            {playProposalRequests.map((req,index)=>
                <li key={`${index}:${req.from}-${req.to}`}>
                    <p>{req.from}</p>
                    <Button variant="contained" onClick={()=>handleAcceptProposal(req)}>Accept</Button>
                </li>
            )}
        </ul>
    </div>
  )
}

export default PlayProposalsList