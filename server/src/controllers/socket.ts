import { Socket } from "socket.io"
import { ConnectedUsersInterface, ServerToClientEvents, ClientToServerEvents, ProposalInterface, PlayConfirmationInterface } from "../@types/socket"
import { PlayingGameInterface } from "../@types/game"
import Game from "../game/game"
import { GameInitialisation } from "../@types/gameCommon"

const Message = require('../models/message.model')
const {findSocketIdWithUsername} = require('../utils/tools')

const GAME_BOARD_WIDTH = 600
const GAME_BOARD_HEIGHT = 300

let users: ConnectedUsersInterface[] = []
let private_messages = []
let proposals: ProposalInterface[] = []
//users[]
// user1 , user2 , Game

let games: PlayingGameInterface[] = []
let intervallId: NodeJS.Timer | null = null
const waitingCounts: number[] = [1020, 2010, 3000, 4020, 5010]

const chatGame = (io) => {
  // console.log(io.opts)
  console.log('=> socket on ')
  
  io.use((socket:Socket<ServerToClientEvents, ClientToServerEvents>, next) => {
    // get the "username" sent with socket.auth from the front
    console.log('middleware')
    
    const username = socket.handshake.auth.username
    console.log('xxx', socket.handshake.auth)
    // if (!username) {
    //   console.log('no username')
    //   return next(new Error('invalid username'))
    // }
    // socket.username = username
    next()
  })

  io.on('connection', (socket:Socket<ClientToServerEvents, ServerToClientEvents>) => {
    // console.log('socket io ', socket.id)
    socket.on('new_username', (data: ConnectedUsersInterface) => {
      if (!users.find((usr) => usr.username === data.username)) {
        users.push(data)
        //sends credentials
        socket.emit('credential', {
          username: data.username,
          password: Date.now().toString(),
        })
        io.emit('connected_users', users)
      } else {
        io.to(data.socketID).emit('user_already_used')
      }
    })

    socket.on('private_message', async(data) => {
      try {
        const sender = users.find((user) => user.socketID === socket.id)
        const messageToSend = {
          message: data.message,
          from: sender.username,
          to: data.to,
        }
        private_messages.push(messageToSend)
        const new_message = await Message.create(messageToSend)
        socket.emit('new_private_message',new_message)
        socket.to(users.find(usr=>usr.username===new_message.to).socketID).emit('new_private_message',new_message)
      } catch (error) {
        socket.emit('error',JSON.stringify(error))
        console.log("=>Error : ", error)
      }
    })

    // === TECH ===
    socket.on('ping', (socketId) => {
      console.log('=>ping received ')
      io.to(socketId).emit('pong')
    })

    socket.on('disconnect', () => {
      // socket.broadcast.emit('user disconnected', socket.id)
      users = users.filter((user) => socket.id !== user.socketID)
      socket.broadcast.emit('connected_users', users)
      console.log('=>disconnect', users)
    })

    // === GAME ===
    socket.on('play_proposal_request',(proposalRequestMembers)=>{
      try {
        const emitterUser:ConnectedUsersInterface|undefined = users.find(user=>user.username===proposalRequestMembers.from)
        if(emitterUser && socket.id === emitterUser.socketID){
          const targetUser:ConnectedUsersInterface|undefined = users.find(user=>user.username===proposalRequestMembers.to)
          // proposals.push(proposalRequestMembers)
          const proposalObject:ProposalInterface = {
            from: proposalRequestMembers.from,
            to: proposalRequestMembers.to,
            isAccepted: false,
            roomName: proposalRequestMembers.from
          }
          proposals.push(proposalObject)
          socket.join(proposalRequestMembers.from);
          io.to(targetUser.socketID).emit('play_proposal_request',proposalObject)
        }
      } catch (error) {
        console.log(error)
        socket.emit('error',JSON.stringify(error))
      }
    })

    socket.on('play_proposal_response',(proposalRequestMembers)=>{
      console.log('play_proposal_response : ', proposalRequestMembers, proposals)
      const foundProposalIndex = proposals.findIndex(proposal=>proposal.from===proposalRequestMembers.from && proposal.to===proposalRequestMembers.to)
      const socketOfFROMUser = findSocketIdWithUsername(users,proposalRequestMembers.from).socketID
      console.log('found proposal : ', proposals[foundProposalIndex])
      console.log('proposalRequestsMembers : ', proposalRequestMembers)
      if(proposalRequestMembers.isAccepted && foundProposalIndex>=0 && socketOfFROMUser){
        const game = new Game([GAME_BOARD_WIDTH,GAME_BOARD_HEIGHT])
        const dataToSend: GameInitialisation = {
          player1: proposalRequestMembers.from,
          player2: proposalRequestMembers.to,
          roomName: proposalRequestMembers.roomName,
          isAccepted: true,
          isWaitingToBegin: true,
          dimensions: [GAME_BOARD_WIDTH, GAME_BOARD_HEIGHT],
          bricks: game.bricksHandler.getBricksPositions(),
          ball: {
            x:game.ball.getX(),
            y:game.ball.getX(),
            radius: game.ball.radius
          },
          barDim:{
            height:game.barLength,
            width:game.barWidth
          },
          brickDim:{
            width:game.bricksHandler.brickWidth,
            height:game.bricksHandler.brickHeight
          },
          player1Bar: {
            x:game.bar1.x,
            y:game.bar1.y,
          },
          player2Bar:{
            x:game.bar2.x,
            y:game.bar2.y,
          },
        }
        games.push({
          ...dataToSend,
          game: game,
          isWaitingToBegin: true,
          waitingTime: 0,
          io: io
        })

        socket.join(proposalRequestMembers.roomName)
        proposals.splice(foundProposalIndex,1)
        io.to(proposalRequestMembers.roomName).emit('play_confirmation', dataToSend)

        if(!intervallId){
          
          intervallId = setInterval(()=>{
            games.forEach(gameRoom=>{
              console.log('=====>', gameRoom.isWaitingToBegin, gameRoom.waitingTime)
              if(!gameRoom.isWaitingToBegin){
                const infosToSend = gameRoom.game.clock()
                io.to(gameRoom.roomName).emit('next_turn_to_display',infosToSend)
              }else if(waitingCounts.includes(gameRoom.waitingTime) ){
                io.to(gameRoom.roomName).emit('waitingClock',waitingCounts.findIndex(ms=>ms===gameRoom.waitingTime)+1)
                gameRoom.waitingTime+=30
              }else if(gameRoom.waitingTime>5000 && gameRoom.waitingTime<5100){
                gameRoom.isWaitingToBegin=false
              }else if(gameRoom.isWaitingToBegin){
                gameRoom.waitingTime+=30
              }
              
            })
          },30)
        }
      }
    })
  })
}

module.exports = { chatGame }

// io.to(data.socketID).emit('connected_users', {
//   from: socket.id,
//   message: 'yeat',
// })
