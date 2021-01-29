const express = require('express')
const router = express.Router()
const access = require('../../middleware/access')
const UserType = require('../../models/UserType')
const { check, validationResult } = require('express-validator')
const {COMPANY, USER} = require('../../config/constants').ACCESSTYPES

// @route   GET api/usertypes
// @desc    Get all usertypes
// @access  Private
router.get('/', access(COMPANY.ADMIN,USER.SUPERADMIN), async (req, res) => {
  try{
    const usertypes = await UserType.find().sort('level')

    if(!usertypes){
      return res.status(400).json({ errors: [{msg: 'There are no User Types.'}]})
    }

    res.json(usertypes)

  } catch(err){
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   POST api/usertypes
// @desc    Create a user type
// @access  Private
router.post('/', [access(COMPANY.ADMIN,USER.SUPERADMIN), [
  check('name', 'Name is required').not().isEmpty(),
  check('description','Description is required').not().isEmpty(),
  check('level','Level must be a number from 0 & 99').isInt({min:0, max:99})
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }

  const {
    name,
    description,
    level
  } = req.body
 
  const usertype = {
    name,
    description,
    level
  }

  try{
    let utype = await UserType.findOne({ level: usertype.level, name: usertype.name })
    if(utype){
      return res.status(400).json({ errors: [{msg: 'User Type already exists.'}]})
    } else {
    // Create new utype
    utype = new UserType(usertype)
    await utype.save()
    }
    res.status(200).json(utype)

  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   PUT api/usertypes/:id
// @desc    Update a user type
// @access  Private
router.put('/:id', [access(COMPANY.ADMIN,USER.SUPERADMIN), [
  check('name', 'Name is required').not().isEmpty(),
  check('description','Description is required').not().isEmpty(),
  check('level','Level must be a number from 0 & 99').isInt({min:0, max:99})
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }

  try{
    const usertype = await UserType.findById(req.params.id)

  if(!usertype){
    return res.status(400).json({ errors: [{msg: 'User Type does not exists.'}]})
  }
    usertype.name = req.body.name
    usertype.description = req.body.description
    usertype.level = req.body.level
    await usertype.save()
    res.status(200).json(usertype)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'User Type not found'}]})   
    }

    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   DELETE api/usertypes/:id
// @desc    Delete usertype by id
// @access  Private
router.delete('/:id',access(COMPANY.ADMIN,USER.SUPERADMIN), async (req,res) => {
  try{
    const usertype = await UserType.findById(req.params.id)
    if(!usertype){
      return res.status(404).json({errors: [{msg: 'User Type not found'}]})
    }


    await usertype.remove()
    res.status(200).json({msg: 'Usertype removed'})

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'User Type not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

module.exports = router