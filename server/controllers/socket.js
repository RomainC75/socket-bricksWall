let users = []
let private_messages = []

const chatGame = (io) => {
  // console.log(io.opts)
  console.log('=> socket on ')
  io.use((socket, next) => {
    // get the "username" sent with socket.auth from the front
    console.log('middleware')
    const username = socket.handshake.auth.username
    console.log('xxx',socket.handshake.auth)
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
      if(!users.find(usr=>usr.username===data.username)){
        users.push(data)
        //sends credentials
        socket.emit('credential',{
          username: data.username,
          password: Date.now().toString()
        })
        io.emit('connected_users', users)
        
        console.log(users)
      }else{
        io.to(data.socketID).emit('user_already_used')
      }
    })

    socket.on('private_message',(data)=>{
      console.log('private_message : ',data)
      console.log('from user : ', socket.id, users.filter(user=>user.socketID===socket.id))
      const sender = users.filter(user=>user.socketID===socket.id)
      private_messages.push({
        message: data.message,
        data: Date.now(),
        from: sender.username,
        to: data.to
      })
      console.log('==================private_messages : ', private_messages)
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