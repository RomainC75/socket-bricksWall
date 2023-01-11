const { Schema, model, SchemaTypes } = require('mongoose')

const publicMessageSchema = new Schema(
  {
    message: String,
    from: String,
    isNewMessage: Boolean
  },
  {
    timestamps: true,
  }
)

const PublicMessage = model('PublicMessage', publicMessageSchema)

module.exports = PublicMessage
