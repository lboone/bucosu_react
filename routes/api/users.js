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

const EXP = process.env.EXP || '365d'

// @route   POST api/users
// @desc    Register user
// @access  Private
router.post('/company/:company_id/usertype/:usertype_id/', [access(COMPANY.SCHOOLDISTRICT,USER.ADMIN),[
  check('username','Username is required').not().isEmpty(),
  check('email','Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({min: 6}),
  check('firstname','First Name is required').not().isEmpty().trim().escape(),
  check('lastname','Last Name is required').not().isEmpty().trim().escape(),
  check('phone','A 10 digit Phone Number is required').isLength({min:10, max: 10}),
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

    // Now create the profile record

    const {firstname, lastname, phone} = req.body 
    const profileFields = {
      user: user._id,
      firstname,
      lastname,
      phone
    }

    // Create new profile
    const profile = new Profile(profileFields)
    await profile.save()

    res.status(200).json(user._id)
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

// @route   GET api/users
// @desc    Get users for my level
// @access  Private
router.get('/mylevel', access(COMPANY.SCHOOLDISTRICT,USER.READER) , async (req,res) => {
  try{
    const user = await User.findById(req.user.id)
    .populate({
      path: 'usertype',
      select: ['name','level']
    })
    .populate({
      path: 'company',
      model: 'company',
      populate: [{
        path: 'relationships',
        select: ['name']
      },{
        path : 'companytype',
        select:['level','name']
      }]
    })
    const uLevel = user.usertype.level
    const cLevel = user.company.companytype.level
    const cRels =  user.company.relationships
    
    const users = await User.find({_id:{$ne:user._id}})
      .populate({
        path: 'usertype', 
        select:['level','name']
      })
      .populate({
        path: 'company',
        model: 'company',
        populate: [{
          path: 'relationships',
          select: ['name']
        },{
          path : 'companytype',
          select:['level','name']
        }],
      });


    if (cLevel === COMPANY.ADMIN && uLevel === USER.SUPERADMIN){
      return res.status(200).json(users)
    }

    
    const filteredUsers = users.filter((item) => {
      const userLevel = item.usertype.level
      const companyLevel = item.company.companytype.level
      const companyName = item.company.name
      let userPass;
      if(uLevel === USER.ARCHITECT){
        userPass = userLevel >= uLevel
      } else {
        userPass = userLevel > uLevel
      }
      console.log({name:item.email,userPass,userLevel,uLevel,cRels})
      let companyPass;
      if(companyLevel< uLevel){
        companyPass = false
      } else {
        if(cRels.length >0){
          companyPass = cRels.some((co) => {
            console.log({coName: co.name,companyName,found:co.name === companyName})
            return co.name === companyName 
          })
        } else {
          companyPass = companyLevel > cLevel
        }
      }
      return userPass && companyPass
    })

    return res.status(200).json(filteredUsers)
    
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 

})
// @route   PUT api/users/:id/deactivate
// @desc    Deactivate a user
// @access  Private
router.put('/:id/deactivate', access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), async (req, res) => {
  try{
    const user = await User.findById(req.params.id)
    .populate("usertype",["level","name"])
    .populate({
      path: "company",
      model:"company",
      populate:{
        path: "companytype",
        model: "companytype"
      }
    })

    if(!user){
      return res.status(404).json({errors: [{msg: 'User not found'}]})
    }

    const currentUser = await User.findById(req.user.id)
    .populate("usertype",["level","name"])
    .populate({path: "company",model: "company",populate:{path: "companytype",model:"companytype"}})

    const userLevel = user.usertype.level + user.company.companytype.level
    const currentUserLevel = currentUser.usertype.level + currentUser.company.companytype.level

    if(user.company.companytype.level === COMPANY.ADMIN || currentUserLevel >= userLevel ){
      return res.status(401).json({ errors: [{msg: 'Access denied!'}]})
    }

    user.isactive = false
    await user.save()
    res.status(200).json(user)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'User not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT pi/users/:id/activate
// @desc    Activate a company
// @access  Private
router.put('/:id/activate', access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), async (req, res) => {
  try{
    const user = await User.findById(req.params.id)
    .populate("usertype",["level","name"])
    .populate({
      path: "company",
      model:"company",
      populate:{
        path: "companytype",
        model: "companytype"
      }
    })

    if(!user){
      return res.status(404).json({errors: [{msg: 'User not found'}]})
    }

    const currentUser = await User.findById(req.user.id)
    .populate("usertype",["level","name"])
    .populate({path: "company",model: "company",populate:{path: "companytype",model:"companytype"}})

    const userLevel = user.usertype.level + user.company.companytype.level
    const currentUserLevel = currentUser.usertype.level + currentUser.company.companytype.level

    if(user.company.companytype.level === COMPANY.ADMIN || currentUserLevel >= userLevel ){
      return res.status(401).json({ errors: [{msg: 'Access denied!'}]})
    }

    user.isactive = true
    await user.save()
    res.status(200).json(user)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'User not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})
module.exports = router