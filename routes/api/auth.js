const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const axios = require('axios')
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const publicIp = require('public-ip');

const EXP = process.env.EXP || '365d'

// @route   GET api/auth
// @desc    Return user's data
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id)
    .populate({path: 'usertype', model:'usertype'})
    .populate({path: 'company',model: 'company',populate: {path : 'companytype',model: 'companytype', populate: {path:'usertypes',model:'usertype'}}});
    res.json(user)
  } catch(err){
    console.error(err.message);
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
  check('email','Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  const {email, password} = req.body 
  try {
    // See if user exists
    let user = await User.findOne({ email , isactive: true}).select("+password")
    if(!user){
      return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}]})
    }
    

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
      return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}]})
    }
    
    // Get Profile and log user login history

    const device = req.get('User-Agent');
    const ipaddress = await publicIp.v4()

    let profile = await Profile.findOne({ user: user._id })
    if(profile){
      
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
        async (err, token) => {
          if(err) {
            throw err
          }
          
          axios.defaults.headers.common['x-auth-token'] = token
          const geoLoc = await axios.get(`http://localhost:5001/api/ipgeolocation/${ipaddress}`)
          const geolocation = geoLoc.data._id
          profile.logins.unshift({ipaddress,device,geolocation})
          await profile.save()
          res.json({ token })
        }
      )
    } else {
      return res.status(500).json({ errors: [{msg: 'No Profile found, please contact your administrator.'}]})
    }
    
  } catch(err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
    
  
})

// @route   POST api/auth/resetpassword
// @desc    Authenticate user and get token
// @access  Public
router.post('/resetpassword', [auth, [
  check('origpassword','Original Password is required').exists(),
  check('password', 'Password is required').exists()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  const {origpassword, password} = req.body 
  try {
    // See if user exists
    let user = await User.findById(req.user.id).select("+password")
    if(!user){
      return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}]})
    }
    

    const isMatch = await bcrypt.compare(origpassword,user.password)

    if(!isMatch){
      return res.status(400).json({ errors: [{msg: 'Wrong Original Password'}]})
    }
    
    // Now Save the new password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    

    // Save user to database
    await user.save()
    res.status(200).json(user._id)
  } catch(err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

module.exports = router