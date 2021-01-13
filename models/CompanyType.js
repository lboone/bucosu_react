const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanyTypeSchema = new Schema({
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
  usertypes: [{ type: Schema.Types.ObjectId, ref: "usertype" }],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = CompanyType = mongoose.model('companytype', CompanyTypeSchema)