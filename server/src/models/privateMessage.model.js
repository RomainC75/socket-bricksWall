const { model } = require('mongoose')
const {PublicMessageSchema} = require('./publicMessage.model')
const extendSchema = require('mongoose-extend-schema')

const PrivateMessageSchema = extendSchema(
  PublicMessageSchema,
  {
    to: String,
  },
  {
    timestamps: true,
  }
)
const PrivateMessage = model('PrivateMessage', PrivateMessageSchema)


module.exports = PrivateMessage

// const PrivateMessage = PublicMessage.discriminator('privateMessages',messageSchema,'modelType')