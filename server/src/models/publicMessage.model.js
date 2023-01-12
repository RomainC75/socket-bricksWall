const {model, Schema} = require('mongoose')

const PublicMessageSchema = new Schema(
  {
    message: String,
    from: String,
    isNewMessage: Boolean,
  },
  {
    timestamps: true,
  }
)
const PublicMessage = model('PublicMessage', PublicMessageSchema)

module.exports = {PublicMessage, PublicMessageSchema}
