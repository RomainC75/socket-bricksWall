import React, { useContext } from 'react'
import { SocketContext } from '../context/socket.context'
import { SocketContextInterface } from '../@types/socketio'
import Button from '@mui/material/Button'

interface PlayProposalButtonInterface {
  selectedChannel: string | null
}

const PlayProposalButton = ({ selectedChannel }: PlayProposalButtonInterface): JSX.Element => {
  const { socket, connectedUsers, username } = useContext(SocketContext) as SocketContextInterface
  const handleProposal = () => {
    socket && username && selectedChannel && socket.emit('play_proposal_request', {
        from:username,
        to:selectedChannel
    })
  }
  return (
    <Button variant="contained" onClick={handleProposal} disabled={!(username && selectedChannel && selectedChannel !== 'public')}>
      Send Proposal
    </Button>
  )
}

export default PlayProposalButton
