const {model, Schema } = require('mongoose')
const UserSchema = new Schema(
  {
    username: String,
    password: String,
    slackID: String
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatesAt'
    }
  })

  module.exports = model('User', UserSchema)