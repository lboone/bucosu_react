// Swagger Model Definitions
/**
 * @swagger
 *  components:
 *    schemas:
 *      Profile:
 *        type: object
 *        required:
 *          - user
 *          - firstname
 *          - lastname
 *          - phone
 *        properties:
 *          user:
 *            type: string
 *            description: An Object ID reference to the profile's user.
 *          firstname:
 *            type: string
 *            description: Firstname for profile.
 *          lastname:
 *            type: string
 *            description: Lastname for the profile.
 *          phone:
 *            type: string
 *            description: Phone for the profile.
 *          settings:
 *            type: object
 *            required:
 *              - name
 *              - value
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the setting
 *              value:
 *                type: string
 *                description: The value of the setting
 *            example:
 *                name: some_setting_name
 *                value: "125"
 *          logins:
 *            type: object
 *            required:
 *              - ipaddress
 *              - device
 *              - geolocation
 *            properties:
 *              ipaddress:
 *                type: string
 *                description: The ip address of the logged in user.
 *              device:
 *                type: string
 *                description: The device info of the logged in user.
 *              geolocation:
 *                type: string
 *                description: An object id of the geolocation of the ip address.
 *            example:
 *                name: "75.182.219.244"
 *                value: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15"
 *        example:
 *           firstname: Some
 *           lastname: Person
 *           phone: 9198565585
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  settings: [
    {
      name: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  ],
  logins: [
    {
      ipaddress: {
        type: String,
        required: true
      },
      device: {
        type: String,
        required: true
      },
      geolocation: {
        type: Schema.Types.ObjectId,
        ref: 'ipgeolocation',
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)