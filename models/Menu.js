// Swagger Model Definitions
/**
 * @swagger
 *  components:
 *    schemas:
 *      Menu:
 *        type: object
 *        required:
 *          - label
 *          - icon
 *          - sort
 *          - istoplevel
 *          - companytype
 *          - usertype
 *        properties:
 *          label:
 *            type: string
 *            description: The label of the menu item.
 *          headerlabel:
 *            type: string
 *            description: The label of the header menu item.
 *          link:
 *            type: string
 *            description: The link to the menu item.
 *          icon:
 *            type: string
 *            description: The icon for the menu item.
 *          sort:
 *            type: number
 *            description: The sort order of the menu item.
 *          istoplevel:
 *            type: boolean
 *            default: true
 *            description: Is the menu item a top level menu item.
 *          submenus:
 *            type: string
 *            description: An array of Object ID references sub menus.
 *          companytype:
 *            type: string
 *            description: An Object ID reference to the company type.
 *          usertype:
 *            type: string
 *            description: An Object ID reference to the user type.
 *        example:
 *           label: "Home"
 *           headerlabel: "Bucosu"
 *           link: "bucosu/home"
 *           icon: "fa-home"
 *           sort: 1
 *           istoplevel: true
 *           companytype: "4565568545"
 *           usertype: "4568565486"           
 * 
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MenuSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  headerlabel: {
    type: String
  },
  link: {
    type: String
  },
  icon: {
    type: String,
    required: true
  },
  sort: {
    type: Number,
    required: true
  },
  istoplevel: {
    type: Boolean,
    required: true,
    default: true
  },
  submenus: [{type: Schema.Types.ObjectId, ref: "menu"}],
  companytype: { type: Schema.Types.ObjectId, ref: "companytype" , required: true},
  usertype: { type: Schema.Types.ObjectId, ref: "usertype" , required: true},
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

module.exports = Menu = mongoose.model('menu', MenuSchema)