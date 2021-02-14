// Swagger Model Definitions
/**
 * @swagger
 *  components:
 *    schemas:
 *      BcsHeading:
 *        type: object
 *        required:
 *          - name
 *          - order
 *          - isprojectheading
 *          - isactive
 *        properties:
 *          name:
 *            type: string
 *            description: The BCS Heading name.
 *          slug:
 *            type: string
 *            description: The BCS Heading name converted to lowercase and separated with dashes
 *          order:
 *            type: number
 *            description: The BCS Heading Order
 *          isprojectheading:
 *            type: boolean
 *            description: Is the BCS Heading a project heading
 *          isactive:
 *            type: boolean
 *            default: true
 *            description: Is the BCS Heading active
 *          profiles:
 *            type: string[]
 *            description: List of BCS Profiles
 *          events:
 *            type: string[]
 *            description: List of BCS Events
 *        example:
 *           name: Building Users
 *           order: 4
 *           isprojectheading: false
 *           isactive: true
 */
const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const Schema = mongoose.Schema

const BcsHeadingSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String, 
    slug: "name",
    unique: true
  },
  order: {
    type: Number,
    required: true
  },
  isprojectheading: {
    type: Boolean,
    required: true
  },
  isactive: {
    type: Boolean,
    required: true,
    default: true
  },
  events: [{ type: Schema.Types.ObjectId, ref: "bcsevent" }],
  profiles: [{ type: Schema.Types.ObjectId, ref: "bcsprofile" }],
  date: {
    type: Date,
    default: Date.now
  }
})

const autoPopulateEvents = function(next){
  this.populate({path: 'events', model:'bcsevent'})
  this.populate({path:'profiles',model:'bcsprofile', options:{sort:{'order':1}}})
  next()
}
BcsHeadingSchema
.pre('findOne',autoPopulateEvents)
.pre('find',autoPopulateEvents)
.pre('findById',autoPopulateEvents)

module.exports = BcsHeading = mongoose.model('bcsheading', BcsHeadingSchema)