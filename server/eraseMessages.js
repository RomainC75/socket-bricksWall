require(('./db/index.js'))
const Message = require('./models/message.model')

const eraseEveryMessages = async () => {
    try{
        await Message.deleteMany()
    }catch(error){
        console.log('erase Every Messages  : ', error )
    }
}

eraseEveryMessages()

