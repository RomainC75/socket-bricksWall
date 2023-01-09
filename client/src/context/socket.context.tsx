import { useState, useEffect, createContext, useContext, PropsWithChildren, useRef, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConnectedUsersInterface, ProposalInterface } from '../@types/socketio'
import { SocketContextInterface } from '../@types/socketContext'
import { io, Socket } from 'socket.io-client'
import { ServerToClientEvents, ClientToServerEvents } from '../@types/socketio'
import { getPingTime } from '../utils/ping'
import toast from 'react-hot-toast'
import { PrivateMessageInterface, PublicMessageClientToServerInterface, PublicMessageInterface } from '../@types/message'
import { GameInfosServerToClientInterface, GameInitialisation } from '../@types/gameCommon'
import GameDisplay from '../utils/game/gameDisplay'

const SocketContext = createContext<SocketContextInterface | null>(null)

function SocketProviderWrapper(props: PropsWithChildren<{}>) {
  const navigate = useNavigate()
  const API_URL = process.env.REACT_APP_SOCKET || 'http://localhost:5000'
  const [pingStamp, setPingStamp] = useState<number | null>(null)
  const [lastCalculatedPing, setLastCalculatedPing] = useState<number | null>(null)
  const [isConnectedToSocket, setIsConnectedToSocket] = useState<boolean>(false)
  const [isConnectedAsUser, setIsConnectedAsUser] = useState<boolean>(false)
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUsersInterface[]>([])
  const [username, setUsername] = useState<string | null>(null)

  const [publicMessages, setPublicMessages] = useState<PublicMessageInterface[]>([])
  const [privateMessages, setPrivateMessages] = useState<PrivateMessageInterface[]>([])
  const [playProposalRequests, setPlayProposalRequests] = useState<ProposalInterface[]>([])

  // const [gameDisplayState, setGameDisplayState] = useState<>(null)
  const [gameInitialisation, setGameInitialisation] = useState<GameInitialisation|null>(null)
  const [newGameInfosToDisplay, setNewGameInfosToDisplay] = useState<GameInfosServerToClientInterface|null>(null)
  const gameDisplay = useRef<GameDisplay|null>(null)
  const [displayGameBool, setDisplayGameBool] = useState<boolean>(false)
  const [prematchClock, setPrematchClock ] = useState<number|null>(null)

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

    setInterval(() => {
      if (socket.connected) {
        setIsConnectedToSocket(true)
      }
    }, 3000)
  }, [])


  useEffect(() => {
    if (socket) {
      socket.on('connected_users', (users) => {
        const usersTemp = users.map((user) => {
          if (socket.id === user.socketID) {
            return {
              ...user,
              self: true,
            }
          }
          return user
        })
        setConnectedUsers(usersTemp)
        console.log('received users : ', users, socket.id)
        users.forEach((user) => {
          if (user.socketID === socket.id) {
            setIsConnectedAsUser(true)
            setUsername(user.username)
          }
        })
      })
      socket.on('user_already_used', () => {
        console.log('user already used !')
        toast.error('User already used')
      })
      socket.on('pong', () => {
        setPingStamp((pingStamp) => {
          if (pingStamp) {
            const value = getPingTime(pingStamp, Date.now())
            setLastCalculatedPing(value)
          }
          return pingStamp
        })
      })
      socket.on('credential', (credentials) => {
        console.log('credential ', credentials)
        socket.auth = {
          username: credentials.username,
          password: credentials.password,
        }
        console.log('socket', socket)
      })

      socket.on('new_public_message',data=>{
        console.log('new_public_message : ',data)
        setPublicMessages((publicMessages)=>[data,...publicMessages])
      })

      socket.on('new_private_message', (data) => {
        console.log('==>data : ', data, username)
        setUsername((username) => {
          if (data.from === username) {
            data.fromSelf = true
          }

          return username
        })
        setPrivateMessages((privateMessages) => [data, ...privateMessages])
      })
      socket.on('play_proposal_request', (newProposalRequestMembers) => {
        setPlayProposalRequests((playProposalRequests) => {
          console.log('add new proposal ', playProposalRequests, newProposalRequestMembers)
          if (!playProposalRequests.find((req) => req.from === newProposalRequestMembers.from)) {
            return [newProposalRequestMembers, ...playProposalRequests]
          }
          return playProposalRequests
        })
      })

      socket.on('play_confirmation', (gameInitialisationData) => {
        // navigate('/game')
        setDisplayGameBool(true)

        console.log('play_confirmation', gameInitialisationData)
        setGameInitialisation(gameInitialisationData)
        
      })

      socket.on('next_turn_to_display', (data) => {
        console.log('data : ', data)
        setNewGameInfosToDisplay(data)
      })

      socket.on('waitingClock',data=>{
        console.log('waiting clock', data)
        setPrematchClock(data)
      })

      socket.on('stop_game_response',()=>{
        console.log('stop_game_response !')
        gameDisplay.current=null
        setDisplayGameBool(false)
      })

      return () => {
        socket.off('connected_users')
        socket.off('user_already_used')
        socket.off('credential')
        socket.off('new_private_message')
        socket.off('new_private_message')
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
        playProposalRequests,
        gameInitialisation,
        newGameInfosToDisplay,
        gameDisplay,
        displayGameBool,
        setDisplayGameBool,
        prematchClock
      }}
    >
      {props.children}
    </SocketContext.Provider>
  )
}

export { SocketContext, SocketProviderWrapper }
