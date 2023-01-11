const { Schema, model, SchemaTypes } = require('mongoose')

const messageSchema = new Schema(
  {
    message: String,
    from: String,
    to: String,
    isNewMessage: Boolean
  },
  {
    timestamps: true,
  }
)

const Message = model('Message', messageSchema)

module.exports = Message
