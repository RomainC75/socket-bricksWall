const Message = require('../models/message.model')
const {findSocketIdWithUsername} = require('../utils/tools')

let users = []
let private_messages = []
let proposals = []
//users[]
// user1 , user2 , Game

let games = []
let intervallId: NodeJS.Timer | null = null

const chatGame = (io) => {
  // console.log(io.opts)
  console.log('=> socket on ')
  io.use((socket, next) => {
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

  io.on('connection', (socket) => {
    // console.log('socket io ', socket.id)
    socket.on('new_username', (data) => {
      console.log(`send to ${data.socketID}`)
      if (!users.find((usr) => usr.username === data.username)) {
        users.push(data)
        //sends credentials
        socket.emit('credential', {
          username: data.username,
          password: Date.now().toString(),
        })
        io.emit('connected_users', users)

        console.log(users)
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
        socket.emit('error',error)
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
        const emitterUser = users.find(user=>user.username===proposalRequestMembers.from)
        if(emitterUser && socket.id === emitterUser.socketID){
          const targetUser = users.find(user=>user.username===proposalRequestMembers.to)
          // proposals.push(proposalRequestMembers)
          const proposalObject = {
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
        socket.emit('error',error)
      }
    })

    socket.on('play_proposal_response',(proposalRequestMembers)=>{
      console.log('play_proposal_response : ', proposalRequestMembers, proposals)
      const foundProposalIndex = proposals.findIndex(proposal=>proposal.from===proposalRequestMembers.from && proposal.to===proposalRequestMembers.to)
      const socketOfFROMUser = findSocketIdWithUsername(users,proposalRequestMembers.from).socketID
      console.log('found proposal : ', proposals[foundProposalIndex])
      console.log('proposalRequestsMembers : ', proposalRequestMembers)
      if(proposalRequestMembers.isAccepted && foundProposalIndex>=0 && socketOfFROMUser){
        const dataToSend = {
          player1: proposalRequestMembers.from,
          player2: proposalRequestMembers.to,
          roomName: proposalRequestMembers.roomName,
          isAccepted: true
        }
        games.push({
          ...dataToSend,
          game: 'game objecst',
          io: io
        })
        socket.join(proposalRequestMembers.roomName)
        proposals.splice(foundProposalIndex,1)
        io.to(proposalRequestMembers.roomName).emit('play_confirmation', dataToSend)
        console.log('proposals array : ', proposals)
        console.log('game array : ', games)

        if(!intervallId){
          intervallId = setInterval(()=>{
            games.forEach(gameRoom=>{

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
