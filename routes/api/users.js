const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const access = require('../../middleware/access')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const Company = require('../../models/Company')
const UserType = require('../../models/UserType')
const {COMPANY, USER} = require('../../config/constants').ACCESSTYPES
const EXP = process.env.EXP || '365d'
const TESTING = process.env.TESTING || true

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

// @route   PUT api/users/me
// @desc    Update my rep info and profile info
// @access  Private
router.put('/me',[auth,[
  check('username','Username is required').not().isEmpty(),
  check('email','Please include a valid email').isEmail().normalizeEmail(),
  check('firstname','First Name is required').not().isEmpty().trim().escape(),
  check('lastname','Last Name is required').not().isEmpty().trim().escape(),
  check('phone','A 10 digit Phone Number is required').isLength({min:10, max: 10}),
]],async (req,res)=> {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  const {username, email, firstname, lastname, phone} = req.body 
  try {
    // See if user exists
    let user = await User.findById(req.user.id)
    if(!user){
      return res.status(400).json({ errors: [{msg: 'User does not exists'}]})
    }

    if(username) user.username = username
    if(email) user.email = email
    // Save user to database
    await user.save()

    // Now create the profile record

    let profile = await Profile.findOne({user:req.user.id})
    if(!profile){
      return res.status(400).json({errors: [{msg: 'Profile does not exist'}]})
    }

    if(firstname) profile.firstname = firstname
    if(lastname) profile.lastname = lastname
    if(phone) profile.phone = phone    
    await profile.save()

    res.status(200).json(user._id)
  } catch(err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'User or Profile not found'}]})   
    }

    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
    
  
})

// @route   PUT api/users/:id
// @desc    Update a users rep info and profile info
// @access  Private
router.put('/:id',[auth,[
  check('username','Username is required').not().isEmpty(),
  check('email','Please include a valid email').isEmail().normalizeEmail(),
  check('firstname','First Name is required').not().isEmpty().trim().escape(),
  check('lastname','Last Name is required').not().isEmpty().trim().escape(),
  check('phone','A 10 digit Phone Number is required').isLength({min:10, max: 10}),
  check('usertypeid','A user type id is required').isMongoId()
]],async (req,res)=> {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  const {username, email, firstname, lastname, phone, usertypeid} = req.body 
  try {
    // See if user exists
    let user = await User.findById(req.params.id)
    if(!user){
      return res.status(400).json({ errors: [{msg: 'User does not exists'}]})
    }

    if(username) user.username = username
    if(email) user.email = email

    if(usertypeid !== user.usertype._id){
      user.usertype = usertypeid
    }

    // Save user to database
    await user.save()

    // Now update the profile record

    let profile = await Profile.findOne({user:req.params.id})
    if(!profile){
      return res.status(400).json({errors: [{msg: 'Profile does not exist'}]})
    }

    if(firstname) profile.firstname = firstname
    if(lastname) profile.lastname = lastname
    if(phone) profile.phone = phone    
    await profile.save()

    // Delete after test

    const profileNew = await Profile.findOne({ user: req.params.id })
    .populate({
      path: 'user', 
      model: 'user',
      populate: [{
        path:'usertype',
        model:'usertype'
      },{
        path: 'company',
        model:'company', 
        populate: {
          path: 'companytype',
          model:'companytype'
        }
      }]
    })
    .populate({
      path: 'logins.geolocation',
      model: 'ipgeolocation',
      select: ['-logins']
    })

    res.status(200).json(profileNew)
  } catch(err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'User or Profile not found'}]})   
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

    let allDetails = []
    
    
    const filteredUsers = users.filter((item) => {
      const userLevel = item.usertype.level
      const companyLevel = item.company.companytype.level
      const companyName = item.company.name
      let userPass, userPassOn;
      if(uLevel === USER.ARCHITECT){
        userPass = userLevel >= uLevel
        userPassOn = 1
      } else {
        userPass = userLevel > uLevel
        userPassOn = 2
      }

      let companyPass, companyPassOn;
      if(companyLevel< cLevel){
        companyPass = false
        companyPassOn = 1
      } else {
        if(cRels.length >0){
          companyPass = cRels.some((co) => {
            return co.name === companyName 
          })
          companyPassOn = 2
        } else {
          companyPass = companyLevel > cLevel
          companyPassOn = 3
        }
      }
      
      allDetails.push({
        overall:userPass && companyPass,
        [user.username]:{userLevel:uLevel,companyLevel:cLevel},
        [item.username]:{userLevel:userLevel,companyLevel: companyLevel},
        ["U"]:{userPassOn:userPassOn, userPass: userPass},
        ["C"]:{companyPassOn:companyPassOn, companyPass: companyPass},
      })
        
        
      return userPass && companyPass
    })
    if (TESTING) console.log(allDetails)

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

// @route   PUT api/users/:id/activate
// @desc    Activate a user
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


// @route   DELETE api/users/:id
// @desc    Delete user and  profile
// @access  Private
router.delete('/:id',access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), async (req, res) => {
  try {
    // Remove Profile
    await Profile.findOneAndRemove({user: req.params.id})

    // Remove User
    await User.findOneAndRemove({_id: req.params.id})
    res.status(200).json({msg: 'User deleted'})
  } catch (err) {
    console.error(err.message)
    if(err.kind == 'ObjectId'){
      return res.status(400).json({ errors: [{msg: 'Profile not found'}]})
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})
module.exports = router