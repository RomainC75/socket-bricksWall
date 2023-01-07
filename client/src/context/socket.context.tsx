import { useState, useEffect, createContext, useContext, PropsWithChildren, useRef, useTransition } from 'react'
import { ConnectedUsersInterface, ProposalInterface, SocketContextInterface } from '../@types/socketio'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../@types/socketio'
import { getPingTime } from '../utils/ping'
import toast from 'react-hot-toast'
import { MessageInterface } from '../@types/message'

const SocketContext = createContext<SocketContextInterface | null>(null)

function SocketProviderWrapper(props: PropsWithChildren<{}>) {
  
  const API_URL = process.env.REACT_APP_SOCKET || 'http://localhost:5000'
  const [pingStamp, setPingStamp] = useState<number | null>(null)
  const [lastCalculatedPing, setLastCalculatedPing] = useState<number | null>(null)
  const [isConnectedToSocket, setIsConnectedToSocket] = useState<boolean>(false)
  const [isConnectedAsUser, setIsConnectedAsUser] = useState<boolean>(false)
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
  const [connectedUsers, setConnectedUsers ] = useState<ConnectedUsersInterface[]>([])
  const [username, setUsername] = useState<string | null>(null)

  const [publicMessages, setPublicMessages] = useState<MessageInterface[]>([])
  const [privateMessages, setPrivateMessages] = useState<MessageInterface[]>([])
  const [playProposalRequests , setPlayProposalRequests] = useState<ProposalInterface[]>([])

  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(API_URL, {
      path: '/socket.io',
      reconnection: false,
    })

    setSocket(socket)
    // socket.auth.username={}
    // socket.connect()
    console.log('socket', socket)

    setTimeout(() => {
      if (socket.connected) {
        console.log('socket.connected', socket)
        setIsConnectedToSocket(true)
      }
    }, 300)

    setInterval(()=>{
      if (socket.connected) {
        setIsConnectedToSocket(true)
      }
    },3000)
  }, [])



  useEffect(() => {
    if (socket) {
      socket.on('connected_users', (users) => {
        const usersTemp = users.map(user=>{
          if(socket.id===user.socketID){
            return {
              ...user,
              self:true
            }
          }
          return user
        })
        setConnectedUsers(usersTemp)
        console.log('received users : ', users, socket.id)
        users.forEach(user=>{
          if(user.socketID===socket.id){
            setIsConnectedAsUser(true)
            setUsername(user.username)
          }
        })
      })
      socket.on('user_already_used',()=>{
        console.log('user already used !')
        toast.error("User already used")
      })
      socket.on('pong', () => {
        setPingStamp(pingStamp=>{
          if (pingStamp) {
            const value = getPingTime(pingStamp, Date.now())
            setLastCalculatedPing(value)
          }
          return pingStamp
        })
      })
      socket.on('credential',(credentials)=>{
        console.log('credential ', credentials)
        socket.auth ={
          username:credentials.username,
          password: credentials.password
        }
        console.log('socket', socket)
      })

      socket.on('new_private_message', data=>{
        console.log('==>data : ', data, username)
        setUsername(username=>{
          if(data.from===username){
            data.fromSelf=true
          }
          
          return username
        })
        setPrivateMessages(privateMessages=>[data, ...privateMessages])
        
      })
      socket.on('play_proposal_request', newProposalRequestMembers=>{
        setPlayProposalRequests(playProposalRequests=>{
          console.log('add new proposal ', playProposalRequests, newProposalRequestMembers)
          if(!playProposalRequests.find(req=>req.from===newProposalRequestMembers.from)){
            return [newProposalRequestMembers,...playProposalRequests]
          }
          return playProposalRequests
        })
      })

      return () => {
        socket.off('connected_users')
        socket.off('user_already_used')
        socket.off('pong')
        socket.disconnect()
      }
    }
  }, [socket])

  useEffect(() => {
    console.log('timestamp', pingStamp)
  }, [pingStamp])

  return (
    <SocketContext.Provider
      value={{
        socket,
        pingStamp,
        setPingStamp,
        lastCalculatedPing,
        setLastCalculatedPing,
        isConnectedToSocket,
        isConnectedAsUser,
        connectedUsers,
        privateMessages,
        publicMessages,
        username,
        playProposalRequests
      }}
    >
      {props.children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProviderWrapper }
