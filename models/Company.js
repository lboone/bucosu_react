// Swagger Model Definitions
/**
 * @swagger
 *  components:
 *    schemas:
 *      Company:
 *        type: object
 *        required:
 *          - name
 *          - companytype
 *          - isactive
 *        properties:
 *          name:
 *            type: string
 *            description: The company name.
 *          companyaddress:
 *            type: object
 *            required:
 *              - address
 *              - city
 *              - state
 *              - zip
 *            properties:
 *              address:
 *                type: string
 *                description: The address of the company
 *              city:
 *                type: string
 *                description: The city of the company
 *              state:
 *                type: string
 *                description: The state of the company
 *              zip:
 *                type: string
 *                description: The zip of the company
 *          contact:
 *            type: object
 *            required:
 *              - phone
 *              - website
 *              - logo
 *            properties:
 *              phone:
 *                type: string
 *                description: The phone number of the company
 *              fax:
 *                type: string
 *                description: The fax number of the company
 *              website:
 *                type: string
 *                description: The web site url for the company
 *              logo:
 *                type: string
 *                description: The company's logo url
 *          isactive:
 *            type: boolean
 *            default: true
 *            description: Is the company active
 *        example:
 *           name: Company A
 *           address: 145 East NoWhere Drive
 *           city: City Of NoWhere
 *           state: NC
 *           zip: 12345
 *           phone: 9195652325
 *           fax: 9195658554
 *           website: www.mysite.com
 *           logo: www.mysite.com/mylogo.png
 *           isactive: true
 */
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
      required: true
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