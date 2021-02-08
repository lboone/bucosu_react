const express = require('express')
const router = express.Router()
const access = require('../../middleware/access')
const CompanyType = require('../../models/CompanyType')
const UserType = require('../../models/UserType')
const { check, validationResult } = require('express-validator')
const {COMPANY, USER} = require('../../config/constants').ACCESSTYPES

// @route   GET api/companytypes
// @desc    Get all companytypes
// @access  Private
router.get('/', access(COMPANY.ADMIN,USER.SUPERADMIN), async (req, res) => {
  try{
    const companytypes = await CompanyType.find().sort('level').populate({path:"usertypes",model:"usertype"})

    if(!companytypes){
      return res.status(400).json({ errors: [{msg: 'There are no Company Types.'}]})
    }

    res.json(companytypes)

  } catch(err){
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   POST api/companytypes/:id
// @desc    Get a Company Type by ID
// @access  Private - ADMIN / SUPERADMIN
router.get('/:id', access(COMPANY.ADMIN,USER.SUPERADMIN), async (req, res) => {
  
  try{
    let companytype = await CompanyType.findById(req.params.id).populate({path:"usertypes",model:"usertype"})
    if(!companytype){
      return res.status(404).json({ errors: [{msg: 'Company Type not found.'}]})
    }
    res.status(200).json(companytype)

  } catch (err) {
    console.error(err.message)
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Company Type not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})


// @route   POST api/companytypes
// @desc    Create a Company Type
// @access  Private - ADMIN / SUPERADMIN
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
 
  const companytype = {
    name,
    description,
    level
  }

  try{
    let utype = await CompanyType.findOne({ level: companytype.level, name: companytype.name })
    if(utype){
      return res.status(400).json({ errors: [{msg: 'Company Type already exists.'}]})
    } else {
    // Create new utype
    utype = new CompanyType(companytype)
    await utype.save()
    }
    res.status(200).json(utype)

  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   PUT api/companytypes/:id
// @desc    Update a Company Type
// @access  Private - ADMIN / SUPERADMIN
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
    const companytype = await CompanyType.findById(req.params.id).populate({path:"usertypes",model:"usertype"})

  if(!companytype){
    return res.status(400).json({ errors: [{msg: 'Company Type does not exists.'}]})
  }
    companytype.name = req.body.name
    companytype.description = req.body.description
    companytype.level = req.body.level
    await companytype.save()
    res.status(200).json(companytype)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Company Type not found'}]})   
    }
    
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   POST api/companytypes/:id/usertype/:usertype_id
// @desc    Add a usertype to the company type
// @access  Private - ADMIN / SUPERADMIN
router.post('/:id/usertype/:usertype_id', access(COMPANY.ADMIN,USER.SUPERADMIN), async (req, res) => {

  try{
    const companytype = await CompanyType.findById(req.params.id)

    if(!companytype){
      return res.status(400).json({ errors: [{msg: 'Company Type does not exists.'}]})
    }

    const usertype = await UserType.findById(req.params.usertype_id)
    if(!usertype){
      return res.status(400).json({ errors: [{msg: 'User Type does not exists.'}]})
    }
    companytype.usertypes.unshift(usertype.id)

    await companytype.save()
    res.status(200).json(companytype)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Company Type or User Type not found'}]})   
    }
    
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   DELETE api/companytypes/:id
// @desc    Delete companytype by id
// @access  Private - ADMIN / SUPERADMIN
router.delete('/:id',access(COMPANY.ADMIN,USER.SUPERADMIN), async (req,res) => {
  try{
    const companytype = await CompanyType.findById(req.params.id)
    if(!companytype){
      return res.status(404).json({errors: [{msg: 'Company Type not found'}]})
    }


    await companytype.remove()
    res.status(200).json({msg: 'Company Type removed'})

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Company Type not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

module.exports = router