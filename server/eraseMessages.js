require(('./src/db/index.js'))
const Message = require('./src/message.model')
const PublicMessage = require('./src/models/publicMessage.model')

const eraseEveryMessages = async () => {
    try{
        await Message.deleteMany()
        await PublicMessage.deleteMany()
    }catch(error){
        console.log('erase Every Messages  : ', error )
    }
}

eraseEveryMessages()

