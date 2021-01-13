// Swagger Model Definitions
/**
 * @swagger
 *  components:
 *    schemas:
 *      Building:
 *        type: object
 *        required:
 *          - name
 *          - company
 *          - buildingtype
 *          - isactive
 *        properties:
 *          name:
 *            type: string
 *            description: The Building name.
 *          company:
 *            type: string
 *            description: An Object ID reference to the building's company.
 *          buildingaddress:
 *            type: object
 *            required:
 *              - address
 *              - city
 *              - state
 *              - zip
 *              - lat
 *              - lng
 *            properties:
 *              address:
 *                type: string
 *                description: The address of the building
 *              city:
 *                type: string
 *                description: The city of the building
 *              state:
 *                type: string
 *                description: The state of the building
 *              zip:
 *                type: string
 *                description: The zip of the building
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
 *          isactive:
 *            type: boolean
 *            default: true
 *            description: Is the building active
 *        example:
 *           name: Building A
 *           address: 145 East NoWhere Drive
 *           city: City Of NoWhere
 *           state: NC
 *           zip: 12345
 *           lng: 15.65745
 *           lat: 12.25432
 *           isactive: true
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BuildingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company",
    required: true
  },
  buildingtype: {
    type: String,
    required: true,
    default: "school"
  },
  buildingaddress: { 
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
    },
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