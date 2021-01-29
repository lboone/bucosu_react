// Swagger Model Definitions
/**
 * @swagger
 *  components:
 *    schemas:
 *      IPGeolocationSchema:
 *        type: object
 *        required:
 *          - ip
 *          - name
 *          - isp
 *        properties:
 *          ip:
 *            type: string
 *            description: The ip address.
 *          location:
 *            type: object
 *            required:
 *              - country
 *              - state
 *              - city
 *              - zip
 *            properties:
 *              country:
 *                type: string
 *                description: The country
 *              state:
 *                type: string
 *                description: The region / state
 *              city:
 *                type: string
 *                description: The city
 *              zip:
 *                type: string
 *                description: The postal code / zip
 *              location:
 *                type: object
 *                required:
 *                  - type
 *                  - coordinates
 *                properties:
 *                  type:
 *                    type: string
 *                    default: 'Point'
 *                    description: Identifies what type of location this is
 *                  coordinates:
 *                    type: number[]
 *                    description: An array of two coordinates lat/lng
 *          name:
 *            type: string
 *            required: true
 *            description: The owner of the ip
 *          isp:
 *            type: string
 *            required: true
 *            description: The isp of the ip
 *          logins:
 *            type: object
 *            required:
 *              - user
 *            properties:
 *              user:
 *                type: string
 *                description: Object id of the user who logged in.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IPGeolocationSchema = new Schema({
  ip: {
    type: String,
    required: true
  },
  address: {
      country: { type: String, required: true},
      state: { type: String, required: true} ,
      city: { type: String, required: true },
      zip: { type: String, required: true},
      location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
  },
  name: {
    type: String,
    required: true
  },
  isp: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  logins: [{
    user: { type: Schema.Types.ObjectId, ref: "user" },
    date: { type: Date, default: Date.now }
  }]
})

module.exports = IPGeolocation = mongoose.model('ipgeolocation', IPGeolocationSchema)