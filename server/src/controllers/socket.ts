import { Socket } from 'socket.io'
import {
  ConnectedUsersInterface,
  ServerToClientEvents,
  ClientToServerEvents,
  ProposalInterface,
  PlayConfirmationInterface,
} from '../@types/socket'
import { PlayingGameInterface } from '../@types/game'
import Game from '../game/game'
import { GameInitialisation } from '../@types/gameCommon'

const PrivateMessage = require('../models/privateMessage.model')
const { PublicMessage } = require('../models/publicMessage.model')

const { findSocketIdWithUsername, findUsernameWithSocketId, findRunningGameWithAUserName } = require('../utils/tools')

const GAME_BOARD_WIDTH = 600
const GAME_BOARD_HEIGHT = 300
const INTERVAL_DELAY = 20

let users: ConnectedUsersInterface[] = []
let private_messages = []
let proposals: ProposalInterface[] = []
//users[]
// user1 , user2 , Game

let games: PlayingGameInterface[] = []
let intervallId: NodeJS.Timer | null = null

const chatGame = (io) => {
  // console.log(io.opts)
  console.log('=> socket on ')

  io.use((socket: Socket<ServerToClientEvents, ClientToServerEvents>, next) => {
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

  io.on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
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

    socket.on('public_message', async (data) => {
      try {
        const sender = users.find((user) => user.socketID === socket.id)
        const messageToSend = {
          from: sender.username,
          message: data.message,
          isNew: true,
        }
        console.log('public : ', data, sender)
        const ans = await PublicMessage.create(messageToSend)
        console.log('public message ans ', ans)
        io.emit('new_public_message', ans)
      } catch (error) {}
    })

    socket.on('private_message', async (data) => {
      try {
        const sender = users.find((user) => user.socketID === socket.id)
        const messageToSend = {
          message: data.message,
          from: sender.username,
          to: data.to,
          isNew: true,
        }
        private_messages.push(messageToSend)
        const new_message = await PrivateMessage.create(messageToSend)
        console.log('new message PRIVATE : ', new_message)
        socket.emit('new_private_message', new_message)
        socket.to(users.find((usr) => usr.username === new_message.to).socketID).emit('new_private_message', new_message)
      } catch (error) {
        socket.emit('error', JSON.stringify(error))
        console.log('=>Error : ', error)
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

    socket.on('stop_game_request', () => {
      const username = findUsernameWithSocketId(users, socket.id)
      console.log('username : ', username)
      if (username) {
        const foundGameIndex = games.findIndex((game) => {
          if (game.player1 === username || game.player2 === username) {
            return true
          }
        })
        io.to(games[foundGameIndex].roomName).emit('stop_game_response')
        games.splice(foundGameIndex, 1)
        if (games.length === 0) {
          clearInterval(intervallId)
          intervallId = null
        }
      }
    })

    // === GAME ===
    socket.on('play_proposal_request', (proposalRequestMembers) => {
      try {
        const emitterUser: ConnectedUsersInterface | undefined = users.find(
          (user) => user.username === proposalRequestMembers.from
        )
        if (emitterUser && socket.id === emitterUser.socketID) {
          const targetUser: ConnectedUsersInterface | undefined = users.find(
            (user) => user.username === proposalRequestMembers.to
          )
          // proposals.push(proposalRequestMembers)
          const proposalObject: ProposalInterface = {
            from: proposalRequestMembers.from,
            to: proposalRequestMembers.to,
            isAccepted: false,
            roomName: proposalRequestMembers.from,
          }
          proposals.push(proposalObject)
          socket.join(proposalRequestMembers.from)
          io.to(targetUser.socketID).emit('play_proposal_request', proposalObject)
        }
      } catch (error) {
        console.log(error)
        socket.emit('error', JSON.stringify(error))
      }
    })

    socket.on('play_proposal_response', (proposalRequestMembers) => {
      console.log('play_proposal_response : ', proposalRequestMembers, proposals)
      const foundProposalIndex = proposals.findIndex(
        (proposal) => proposal.from === proposalRequestMembers.from && proposal.to === proposalRequestMembers.to
      )
      const socketOfFROMUser = findSocketIdWithUsername(users, proposalRequestMembers.from).socketID
      console.log('found proposal : ', proposals[foundProposalIndex])
      console.log('proposalRequestsMembers : ', proposalRequestMembers)
      if (proposalRequestMembers.isAccepted && foundProposalIndex >= 0 && socketOfFROMUser) {
        const game = new Game([GAME_BOARD_WIDTH, GAME_BOARD_HEIGHT])
        const dataToSend: GameInitialisation = {
          player1: proposalRequestMembers.from,
          player2: proposalRequestMembers.to,
          roomName: proposalRequestMembers.roomName,
          isAccepted: true,
          isWaitingToBegin: true,
          dimensions: [GAME_BOARD_WIDTH, GAME_BOARD_HEIGHT],
          // bricks: game.bricksHandler.getBricksPositions(),
          bricks: [],
          ball: {
            x: game.ball.getX(),
            y: game.ball.getX(),
            radius: game.ball.radius,
          },
          barDim: {
            height: game.barLength,
            width: game.barWidth,
          },
          brickDim: {
            width: game.bricksHandler.brickWidth,
            height: game.bricksHandler.brickHeight,
          },
          player1Bar: {
            x: game.bar1.x,
            y: game.bar1.y,
          },
          player2Bar: {
            x: game.bar2.x,
            y: game.bar2.y,
          },
        }
        games.push({
          ...dataToSend,
          game: game,
          isWaitingToBegin: true,
          waitingTime: 5000,
          io: io,
        })

        socket.join(proposalRequestMembers.roomName)
        proposals.splice(foundProposalIndex, 1)
        io.to(proposalRequestMembers.roomName).emit('play_confirmation', dataToSend)

        if (!intervallId) {
          intervallId = setInterval(() => {
            games.forEach((gameRoom) => {
              if (!gameRoom.isWaitingToBegin) {
                const infosToSendOrPoints = gameRoom.game.clock()
                if ('player1' in infosToSendOrPoints) {
                  gameRoom.isWaitingToBegin = true
                  gameRoom.waitingTime = 3000
                  io.to(gameRoom.roomName).emit('new_score',infosToSendOrPoints)
                  console.log('point : ',infosToSendOrPoints)
                } else {
                  io.to(gameRoom.roomName).emit('next_turn_to_display', infosToSendOrPoints)
                  console.log('next_turn : ', infosToSendOrPoints)
                }
              } else if (gameRoom.waitingTime % 1000 === 0) {
                io.to(gameRoom.roomName).emit('waitingClock', Math.round(gameRoom.waitingTime/1000))
                console.log('=====>', gameRoom.isWaitingToBegin, gameRoom.waitingTime)
                gameRoom.waitingTime -= INTERVAL_DELAY
              } else if (gameRoom.waitingTime < 0) {
                gameRoom.isWaitingToBegin = false
              } else if (gameRoom.isWaitingToBegin) {
                gameRoom.waitingTime -= INTERVAL_DELAY
              }
              console.log('isWaitin / waiting/', gameRoom.isWaitingToBegin, gameRoom.waitingTime)
            })
          }, INTERVAL_DELAY)
        }
      }
    })

    socket.on('new_move', (data) => {
      console.log('new_move', data)
      const foundGame = findRunningGameWithAUserName(games, data.username)
      console.log('foundGame', foundGame)
      if (foundGame) {
        if (data.username === foundGame.player1) {
          foundGame.game.player1NextMove(data.key)
        } else if (data.username === foundGame.player1) {
          foundGame.game.player2NextMove(data.key)
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
