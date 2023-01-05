
const chatGame = (io) =>{
    // console.log(io.opts)
    console.log('=> socket on ')
    io.use((socket, next) => {
        // get the "username" sent with socket.auth from the front
        const username = socket.handshake.auth.username
        if (!username) {
            console.log('no username')
           return next(new Error('invalid username'))
        }
        socket.username = username
        next()
     })

     io.on('connection', socket=>{
        console.log('socket io ', socket.id)
     })
}


module.exports = {chatGame}