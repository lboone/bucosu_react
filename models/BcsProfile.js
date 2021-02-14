// Swagger Model Definitions
/**
 * @swagger
 *  components:
 *    schemas:
 *      BcsProfile:
 *        type: object
 *        required:
 *          - name
 *          - order
 *          - usertype
 *          - heading
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
 *          usertype:
 *            type: object
 *            properties:
 *              _id:
 *                type: object
 *                description: The Schema.Types.ObjectId
 *              name:
 *                type: string
 *                description: The name of the Usertype
 *              level:
 *                type: number
 *                description: The level of the Usertype
 *          buildingsystem:
 *            type: object
 *            properties:
 *              type:
 *                type: string
 *                description: The building system type ["H","S"]
 *              description:
 *                type: string
 *                description: The building system description ["Health and Safety","Structural"]
 *          notes:
 *            type: string
 *            description: Notes about the profile
 *          heading:
 *            type: object
 *            required:
 *              -_id
 *              -name
 *              -slug
 *            properties:
 *              _id:
 *                type: object
 *                description: The Schema.Types.ObjectId
 *              name:
 *                type: string
 *                description: The name of the parent heading
 *              slug:
 *                type: string
 *                description: The slug of the parent heading
 *          questions:
 *            type: string[]
 *            description: An array of bcs questions
 *          events:
 *            type: string[]
 *            description: An array of bcs events
 *          isactive:
 *            type: boolean
 *            default: true
 *            description: Is the BCS Heading active
 *        example:
 *           name: Water
 *           order: 10
 *           isactive: true
 *           notes: Including Exterior Distribution
 */
const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const Schema = mongoose.Schema

const BcsProfileSchema = new Schema({
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
  usertype: {
    _id: {
      type: Schema.Types.ObjectId,
    },
    name: {
      type: String,
    }, 
    level: {
      type: String,
    }
  },
  buildingsystem:{
    type:{
      type: String,
      enum: ["H","S"],
    },
    description:{
      type: String,
      enum: ["Health and Safety","Structural"],
    }
  },
  notes:{
    type: String
  },
  heading: {
    _id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    }, 
    slug: {
      type: String,
      required: true
    }
  },
  questions: [{ type: Schema.Types.ObjectId, ref: "bcsquestion" }],
  events: [{ type: Schema.Types.ObjectId, ref: "bcsevent" }],
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

const autoPopulateEvents = function(next){
  this.populate({path: 'events', model:'bcsevent'})
  next()
}
BcsProfileSchema
.pre('findOne',autoPopulateEvents)
.pre('find',autoPopulateEvents)
.pre('findById',autoPopulateEvents)

module.exports = BcsProfile = mongoose.model('bcsprofile', BcsProfileSchema)