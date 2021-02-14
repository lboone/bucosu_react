const express = require('express')
const router = express.Router()
const access = require('../../middleware/access')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const BcsHeading = require('../../models/BcsHeading')
const BcsEvent = require('../../models/BcsEvent')
const {COMPANY, USER} = require('../../config/constants').ACCESSTYPES
const UserType = require('../../models/UserType')
const BcsProfile = require('../../models/BcsProfile')

// @route   POST api/bcsprofiles
// @desc    Create a BCS Profile
// @access  Private
router.post('/', [access(COMPANY.ADMIN,USER.SUPERADMIN), [
  check('name','Name is required').not().isEmpty(),
  check('order','Order is required').not().isEmpty(),
  check('isactive','IsActive is reauired').not().isEmpty(),
  check('bcsheading','BCS Heading ID is required').isMongoId(),
  check('bcsevent','BCS Event ID is required').isMongoId(),
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }

  try {
    const {name, order, usertype, buildingsystem, notes, bcsheading, bcsevent, isactive} = req.body

    const newbcsprofile = {
      name,
      order,
      isactive,
      events:[bcsevent]
    }


    if (usertype){
      const uType = await UserType.findById(usertype)
      if(!uType){
        return res.status(400).json({errors: [{msg: 'The User Type you selected does not exist'}] })
      }
      newbcsprofile.usertype = {
        _id: uType._id,
        name: uType.name,
        level: uType.level
      }
    }

    if (buildingsystem){
      newbcsprofile.buildingsystem = buildingsystem
    }
    
    if (notes){
      newbcsprofile.notes = notes
    }

    const heading = await BcsHeading.findById(bcsheading)
    if(!heading){
      return res.status(400).json({errors: [{msg: 'The BCS Heading you selected does not exist'}] })
    }
    newbcsprofile.heading = {
      _id: heading._id,
      name: heading.name,
      slug: heading.slug
    }



    const bcsprofile = new BcsProfile(newbcsprofile)
    await bcsprofile.save();
    
    heading.profiles.unshift(bcsprofile._id)
    await heading.save()

    res.status(200).json(bcsprofile)
  } catch (err) {
    console.error(err.message)

    if(err.kind == 'ObjectId'){
      return res.status(400).json({ errors: [{msg: 'BCS Profile not found'}]})
    }

    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   PUT api/bcsprofiles/:id
// @desc    Update a BCS Profile
// @access  Private
router.put('/:id', [access(COMPANY.ADMIN,USER.SUPERADMIN), [
  check('name','Name is required').not().isEmpty(),
  check('order','Order is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  
  try {

    const bcsprofile = await BcsProfile.findById(req.params.id)
    
    if(!bcsprofile){
      return res.status(404).json({errors: [{msg: 'BCS Profile not found'}]})
    }

    const {name, order, usertype, buildingsystem, notes} = req.body
    
    
    bcsprofile.name = name
    bcsprofile.order = order
    if (usertype){
      const uType = await UserType.findById(usertype)
      if(!uType){
        return res.status(400).json({errors: [{msg: 'The User Type you selected does not exist'}] })
      }
      bcsprofile.usertype = {
        _id: uType._id,
        name: uType.name,
        level: uType.level
      }
    }

    if (buildingsystem){
      bcsprofile.buildingsystem = buildingsystem
    }
    
    if (notes){
      newbcsprofile.notes = notes
    }
    
    await bcsprofile.save();

    res.status(200).json(bcsprofile)
  } catch (err) {
    console.error(err.message)

    if(err.kind == 'ObjectId'){
      return res.status(400).json({ errors: [{msg: 'BCS Profile not found'}]})
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   GET api/bcsprofiles
// @desc    Get all BCS Profiles
// @access  Private
router.get('/',access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const bcsprofiles = await BcsProfile.find()
    .sort({order:1})

    res.status(200).json(bcsprofiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   GET api/bcsprofiles
// @desc    Get all active BCS Profiles
// @access  Private
router.get('/activeonly',access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const bcsprofiles = await BcsProfile.find({isactive: true})
    .sort({order:1})

    res.status(200).json(bcsprofiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})


// @route   GET api/bcsprofiles/:id
// @desc    Get BCS Profile by id
// @access  Private
router.get('/:id', access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const bcsprofile = await BcsProfile.findById(req.params.id)      

    if(!bcsprofile){
      return res.status(404).json({ errors: [{msg: 'BCS Profile not found'}]})  
    }
    res.status(200).json(bcsprofile)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Profile not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   GET api/bcsprofiles/slug/:slug
// @desc    Get BCS Profile by slug
// @access  Private
router.get('/slug/:slug', access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const bcsprofile = await BcsProfile.findOne({slug:req.params.slug})

    if(!bcsprofile){
      return res.status(404).json({ errors: [{msg: 'BCS Profile not found'}]})  
    }
    res.status(200).json(bcsprofile)

  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT pi/bcsprofiles/:id/deactivate
// @desc    Deactivate a BCS Profile
// @access  Private
router.put('/:id/deactivate', access(COMPANY.ADMIN,USER.SUPERADMIN), async (req, res) => {
  try{
    const bcsprofile = await BcsProfile.findById(req.params.id)
    if(!bcsprofile){
      return res.status(404).json({errors: [{msg: 'BCS Profile not found'}]})
    }
    bcsprofile.isactive = false
    await bcsprofile.save()
    res.status(200).json(bcsprofile)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Profile not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT pi/bcsprofiles/:id/bcsevent/:bcsevent_id
// @desc    Attach A BCS Event
// @access  Private
router.put('/:id/bcsevent/:bcsevent_id', access(COMPANY.ADMIN,USER.SUPERADMIN), async (req, res) => {
  try{
    const bcsprofile = await BcsProfile.findById(req.params.id)
    if(!bcsprofile){
      return res.status(404).json({errors: [{msg: 'BCS Profile not found'}]})
    }

    const bcsevent = await BcsEvent.findById(req.params.bcsevent_id)
    if(!bcsevent){
      return res.status(404).json({errors: [{msg: 'BCS Event not found'}]})
    }

    let foundIndex = null
    bcsprofile.events.forEach((event, index)=>{
      if(event._id.toString() === bcsevent._id.toString()){
        foundIndex = index
      }
    })
    
    if(foundIndex === null){
      bcsprofile.events.unshift(bcsevent._id)
      await bcsprofile.save()
      const newProfile = await BcsProfile.findById(req.params.id)
      return res.status(200).json(newProfile)
    } else {
      return res.status(404).json({errors: [{msg: 'That BCS Event was already attached to the BCS Profile'}]})
    }

    

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Profile or BCS Event not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   DELETE pi/bcsprofiles/:id/bcsevent/:bcsevent_id
// @desc    Remove A BCS Event
// @access  Private
router.delete('/:id/bcsevent/:bcsevent_id', access(COMPANY.ADMIN,USER.SUPERADMIN), async (req, res) => {
  try{
    const bcsprofile = await BcsProfile.findById(req.params.id)
    if(!bcsprofile){
      return res.status(404).json({errors: [{msg: 'BCS Profile not found'}]})
    }

    const bcsevent = await BcsEvent.findById(req.params.bcsevent_id)
    if(!bcsevent){
      return res.status(404).json({errors: [{msg: 'BCS Event not found'}]})
    }

    let foundIndex = null
    bcsprofile.events.forEach((event, index)=>{
      if(event._id.toString() === bcsevent._id.toString()){
        foundIndex = index
      }
    })
    
    
    if (foundIndex !== null){
      bcsprofile.events.splice(foundIndex,1)
      await bcsprofile.save()
      const newHeadings = await BcsProfile.findById(req.params.id)

      return res.status(200).json(newHeadings)
    } else {
      return res.status(404).json({errors: [{msg: 'That BCS Event was not attached to the BCS Profile'}]})
    }

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Profile or BCS Event not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT pi/bcsprofiles/:id/activate
// @desc    Activate a BCS Profile
// @access  Private
router.put('/:id/activate', access(COMPANY.ADMIN,USER.SUPERADMIN), async (req, res) => {
  try{
    const bcsprofile = await BcsProfile.findById(req.params.id)

    if(!bcsprofile){
      return res.status(404).json({errors: [{msg: 'BCS Profile not found'}]})
    }
    bcsprofile.isactive = true
    await bcsprofile.save()
    res.status(200).json(bcsprofile)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Profile not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   DELETE api/bcsprofiles/:id
// @desc    Delete bcsevent by id
// @access  Private
router.delete('/:id',access(COMPANY.ADMIN,USER.SUPERADMIN), async (req,res) => {
  try{
    const bcsprofile = await BcsProfile.findById(req.params.id)
    if(!bcsprofile){
      return res.status(404).json({errors: [{msg: 'BCS Profile not found'}]})
    }


    await bcsprofile.remove()
    res.status(200).json({msg: 'BCS Profile removed'})

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Profile not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})
module.exports = router