// Swagger Model Definitions
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - username
 *          - email
 *          - password
 *          - usertype
 *          - company
 *          - isactive
 *        properties:
 *          username:
 *            type: string
 *            description: Short username for user, needs to be unique.
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          password:
 *            type: string
 *            description: Password for the user, will be encrypted
 *          usertype:
 *            type: string
 *            description: An Object ID reference to the user's type.
 *          company:
 *            type: string
 *            description: An Object ID reference to the user's company.
 *          isactive:
 *            type: boolean
 *            default: true
 *            description: Is the user active
 *        example:
 *           username: mboone
 *           email: fake@email.com
 *           password: Eilskkjiflkej
 *           isactive: true
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  usertype: {
    type: Schema.Types.ObjectId,
    ref: 'usertype',
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: true
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

module.exports = User = mongoose.model('user', UserSchema)