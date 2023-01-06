let users = []

const chatGame = (io) => {
  // console.log(io.opts)
  console.log('=> socket on ')
  io.use((socket, next) => {
    // get the "username" sent with socket.auth from the front
    const username = socket.handshake.auth.username
    // if (!username) {
    //   console.log('no username')
    //   return next(new Error('invalid username'))
    // }
    socket.username = username
    next()
  })

  io.on('connection', (socket) => {
    // console.log('socket io ', socket.id)
    socket.on('new_username', (data) => {
      console.log(`send to ${data.socketID}`)
      if(!users.find(usr=>usr.username===data.username)){
        users.push(data)
        io.emit('connected_users', users)
        console.log(users)
      }else{
        io.to(data.socketID).emit('user_already_used')
      }
      
    })
    socket.on('ping',socketId=>{
      console.log('=>ping received ')
      io.to(socketId).emit('pong')
    })

    socket.on('disconnect', ()=>{
      socket.broadcast.emit('user disconnected', socket.id)
      users = users.filter(user=>socket.id!==user.socketID)
      socket.emit('connected_users', users)
      console.log('=>disconnect', users)
    })
  })
}

module.exports = { chatGame }



// io.to(data.socketID).emit('connected_users', {
//   from: socket.id,
//   message: 'yeat',
// })