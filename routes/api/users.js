const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')

const EXP = process.env.EXP || 360000

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
  check('name','Name is required').not().isEmpty(),
  check('email','Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  const {name, email, password} = req.body 
  try {
    // See if user exists
    let user = await User.findOne({ email })
    if(user){
      return res.status(400).json({ errors: [{msg: 'User already exists'}]})
    }
    
    // Get users gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })

    user = new User({
      name,
      email,
      avatar,
      password
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
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
    
  
})

module.exports = router