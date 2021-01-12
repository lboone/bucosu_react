const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BuildingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  buildingtype: {
    type: String,
    required: true,
    default: "school"
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: "address"
  },
  isactive: {
    type: Boolean,
    required: true,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Building = mongoose.model('building', BuildingSchema)