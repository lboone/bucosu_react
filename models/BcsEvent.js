// Swagger Model Definitions
/**
 * @swagger
 *  components:
 *    schemas:
 *      BcsEvent:
 *        type: object
 *        required:
 *          - name
 *          - startdate
 *          - enddate
 *          - isactive
 *        properties:
 *          name:
 *            type: string
 *            description: The BCS Event name.
 *          startdate:
 *            type: date
 *            description: The start date of the BCS Event
 *          enddate:
 *            type: date
 *            description: The end date of the BCS Event
 *          isactive:
 *            type: boolean
 *            default: true
 *            description: Is the BCS Event active
 *        example:
 *           name: 2022 BCS Event
 *           startdate: 01/01/2022
 *           enddate: 01/01/2026
 *           isactive: true
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BcsEventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  startdate: {
    type: Date,
    required: true
  },
  enddate: {
    type: Date,
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

module.exports = BcsEvent = mongoose.model('bcsevent', BcsEventSchema)