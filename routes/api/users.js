const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const access = require('../../middleware/access')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const Company = require('../../models/Company')
const UserType = require('../../models/UserType')
const {COMPANY, USER} = require('../../config/constants').ACCESSTYPES

const EXP = process.env.EXP || 360000

// @route   POST api/users
// @desc    Register user
// @access  Private
router.post('/company/:company_id/usertype/:usertype_id/', [access(COMPANY.SCHOOLDISTRICT,USER.ADMIN),[
  check('username','Username is required').not().isEmpty(),
  check('email','Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  const {username, email, password} = req.body 
  try {
    // See if user exists
    let user = await User.findOne({ email })
    if(user){
      return res.status(400).json({ errors: [{msg: 'User already exists'}]})
    }

    // Find the company
    const company = await Company.findById(req.params.company_id)
    if(!company){
      return res.status(404).json({ errors: [{msg: 'Company not found'}]})
    }
    
    // Finid the usertype
    const usertype = await UserType.findById(req.params.usertype_id)
    if(!usertype){
      return res.status(404).json({ errors: [{msg: 'Invalid user type'}]})
    }

    user = new User({
      username,
      email,
      password,
      company: company.id,
      usertype: usertype.id
    })

    // Encrypt password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    
    // Save user to database
    await user.save()

    // Return jsonwebtoken
    // 1st create payload
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(
      payload, 
      config.get('jwtSecret'),
      {expiresIn: EXP},
      (err, token) => {
        if(err) throw err
        res.status(200).json({ token })
      }
    )
  } catch(err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Company or User Type not found'}]})   
    }

    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
    
  
})

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/', access(COMPANY.SCHOOLDISTRICT,USER.READER) , async (req,res) => {
  try{
    const users = await User.find().populate({path: 'usertype', model:'usertype'})
    .populate({path: 'company',model: 'company',populate: {path : 'companytype',model: 'companytype', populate: {path: "usertypes",model: "usertype"}}});
    res.status(200).json(users)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 

})
module.exports = router