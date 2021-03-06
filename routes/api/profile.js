const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const access = require('../../middleware/access')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')
const {COMPANY, USER} = require('../../config/constants').ACCESSTYPES
const TESTING = process.env.TESTING || true

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try{
    const profile = await Profile.findOne({ user: req.user.id })
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

    if(!profile){
      return res.status(400).json({ errors: [{msg: 'There is no profile for this user'}]})
    }

    res.json(profile)

  } catch(err){
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   POST api/profile
// @desc    Create or Update a user profile
// @access  Private
router.post('/', [auth, [
  check('firstname', 'First name is required').not().isEmpty(),
  check('lastname','Last name is required').not().isEmpty(),
  check('phone','Phone is required').not().isEmpty(),
  check('userid','User ID is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }

  const {
    firstname,
    lastname,
    phone,
    userid
  } = req.body

  // Build profile object

  const profileFields = {}
  profileFields.user = userid
  if(firstname) profileFields.firstname = firstname
  if(lastname) profileFields.lastname = lastname
  if(phone) profileFields.phone = phone
  

  try{
    let profile = await Profile.findOne({ user: userid })
    if(profile){
      // Update profile
      profile = await Profile.findOneAndUpdate({user: userid},{$set: profileFields }, {new: true})
    } else {
    // Create new profile
    profile = new Profile(profileFields)
    await profile.save()
    }
    res.status(200).json(profile)

  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   GET api/profile
// @desc    Get all profiles
// @access  Private
router.get('/', access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), async (req, res) => {
  try {
    const profiles = await Profile.find().populate({path: 'user', model: 'user',populate: [{path: 'company',model:'company'}]}).select(['-settings', '-logins'])
    
    res.status(200).json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   GET api/profile/mylevel
// @desc    Get all profiles for current user level
// @access  Private
router.get('/mylevel',access(COMPANY.SCHOOLDISTRICT, USER.ADMIN),async (req,res) => {
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

    const profiles = await Profile.find({user:{$ne:user._id}})
      .select(['-logins', '-settings'])
      .populate({
        path: 'user',
        model: 'user',
        populate: [
          {
            path: 'usertype', 
            select:['level','name']
          },
          {
            path: 'company',
            model: 'company',
            populate: [{
              path: 'relationships',
              select: ['name']
            },{
              path : 'companytype',
              select:['level','name']
            }],
          }
        ]
      })

    if (cLevel === COMPANY.ADMIN && uLevel === USER.SUPERADMIN){
      return res.status(200).json(profiles)
    }

    let allDetails = []
    
    console.log('made it here')
    const filteredProfiles = profiles.filter((item) => {
      const userLevel = item.user.usertype.level
      const companyLevel = item.user.company.companytype.level
      const companyName = item.user.company.name
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

    return res.status(200).json(filteredProfiles)
    
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 

})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Private
router.get('/user/:user_id', access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate({path: 'user', model: 'user',populate: [{path:'usertype',model:'usertype'},{path: 'company',model:'company', populate: {path: 'companytype',model:'companytype'}}]})

    if(!profile){
      return res.status(400).json({ errors: [{msg: 'Profile not found'}]})
    }
    res.status(200).json(profile)
  } catch (err) {
    console.error(err.message)
    if(err.kind == 'ObjectId'){
      return res.status(400).json({ errors: [{msg: 'Profile not found'}]})
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})


// @route   GET api/profile/logins
// @desc    Retrieve logged in users login history
// @access  Private
router.get('/login',auth, async (req,res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).sort({date: -1 })

    if(!profile){
      return res.status(400).json({ errors: [{msg: 'Profile not found'}]})
    }
    res.status(200).json(profile.logins)
  } catch (err) {
    console.error(err.message)
    if(err.kind == 'ObjectId'){
      return res.status(400).json({ errors: [{msg: 'Profile not found'}]})
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   POST api/profile/login
// @desc    Retrieve profile of logged in user & login tracking
//  @access Private
router.post('/login', [auth,[
  check('ipaddress','IPAddress is required').not().isEmpty(),
  check('device','Device is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate({path: 'user', model: 'user',populate: [{path:'usertype',model:'usertype'},{path: 'company',model:'company', populate: {path: 'companytype',model:'companytype'}}]})

    if(!profile){
      return res.status(400).json({ errors: [{msg: 'Profile not found'}]})
    }

    const login = {
      ipaddress: req.body.ipaddress,
      device: req.body.device
    }

    profile.logins.unshift(login)
    await profile.save()
    res.status(200).json(profile)
  } catch (err) {
    console.error(err.message)
    if(err.kind == 'ObjectId'){
      return res.status(400).json({ errors: [{msg: 'Profile not found'}]})
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   GET api/profile/settings
// @desc    Retrieve logged in users settings
// @access  Private
router.get('/settings',auth, async (req,res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    if(!profile){
      return res.status(400).json({ errors: [{msg: 'Profile not found'}]})
    }
    res.status(200).json(profile.settings)
  } catch (err) {
    console.error(err.message)
    if(err.kind == 'ObjectId'){
      return res.status(400).json({ errors: [{msg: 'Profile not found'}]})
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   POST api/profile/settings
// @desc    Retrieve profile of logged in user update settings
//  @access Private
router.post('/settings', [auth,[
  check('name','Name is required').not().isEmpty(),
  check('value','Value is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate({path: 'user', model: 'user',populate: [{path:'usertype',model:'usertype'},{path: 'company',model:'company', populate: {path: 'companytype',model:'companytype'}}]})

    if(!profile){
      return res.status(400).json({ errors: [{msg: 'Profile not found'}]})
    }

    const setting = {
      name: req.body.name,
      value: req.body.value
    }

    profile.settings.unshift(setting)
    await profile.save()
    res.status(200).json(profile)
  } catch (err) {
    console.error(err.message)
    if(err.kind == 'ObjectId'){
      return res.status(400).json({ errors: [{msg: 'Profile not found'}]})
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   DELETE api/profile/
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/',access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), async (req, res) => {
  try {
    
    // Remove Profile
    await Profile.findOneAndRemove({user: req.user.id})

    // Remove User
    await User.findOneAndRemove({_id: req.user.id})
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