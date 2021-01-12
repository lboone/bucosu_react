const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  companytype: {
    type: Schema.Types.ObjectId,
    ref: "companytype",
    required: true
  },
  companyaddress: { 
    address: {
      type: String,
      ref: "address"
      },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    }
  },
  contact: {
    phone: {
      type: String,
      required: true
    },
    fax: {
      type: String
    },
    website: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    }
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

module.exports = Company = mongoose.model('company', CompanySchema)