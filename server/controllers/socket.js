const users = ['bib', 'bab', 'boub']

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
    console.log('socket io ', socket.id)

    socket.on('new_username', (data) => {
      console.log('new_username', data)
      users.push(data)
      console.log(`send to ${data.socketID}`)
      socket.emit('connected_users', {
        from: socket.id,
        message: 'yeat',
      })
      
      io.to(data.socketID).emit('connected_users', {
        from: socket.id,
        message: 'yeat',
      })
    })
    socket.on('ping',socketId=>{
      console.log('=>ping received ')
      io.to(socketId).emit('pong')
    })
  })
}

module.exports = { chatGame }
