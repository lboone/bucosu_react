const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserTypeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true,
    default: 999
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = UserType = mongoose.model('usertype', UserTypeSchema)