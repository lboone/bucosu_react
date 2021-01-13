// Swagger Model Definitions
/**
 * @swagger
 *  components:
 *    schemas:
 *      CompanyType:
 *        type: object
 *        required:
 *          - name
 *          - description
 *          - level
 *          - usertypes
 *        properties:
 *          name:
 *            type: string
 *            description: The name of the company type.
 *          description:
 *            type: string
 *            description: A brief description of the company type.
 *          level:
 *            type: integer
 *            default: 99
 *            description: The level of the company type.
 *          usertypes:
 *            type: string[]
 *            description: An array of Object ID references to the user types.
 *        example:
 *           name: ARCHITECTFIRM
 *           description: An architect firm
 *           level: 1
 */
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
    default: 99
  },
  usertypes: [{ type: Schema.Types.ObjectId, ref: "usertype" }],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = CompanyType = mongoose.model('companytype', CompanyTypeSchema)