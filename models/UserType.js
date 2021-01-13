// Swagger Model Definitions
/**
 * @swagger
 *  components:
 *    schemas:
 *      UserType:
 *        type: object
 *        required:
 *          - name
 *          - description
 *          - level
 *        properties:
 *          name:
 *            type: string
 *            description: The name of the user type.
 *          description:
 *            type: string
 *            description: A brief description of the user type.
 *          level:
 *            type: integer
 *            default: 99
 *            description: The level of the user type.
 *        example:
 *           name: ARCHITECT
 *           description: An architect
 *           level: 1
 */
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
    default: 99
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = UserType = mongoose.model('usertype', UserTypeSchema)