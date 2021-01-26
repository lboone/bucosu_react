const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
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
    let user = await User.findOne({ email }).select("+password")
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
    console.log({device, ipaddress})

    let profile = await Profile.findOne({ user: user._id })
    if(profile){
      profile.logins.unshift({ipaddress,device})
      await profile.save()
    } else {
      return res.status(500).json({ errors: [{msg: 'No Profile found, please contact your administrator.'}]})
    }
    

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
        res.json({ token })
      }
    )
  } catch(err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
    
  
})

module.exports = router