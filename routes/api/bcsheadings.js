const express = require('express')
const router = express.Router()
const access = require('../../middleware/access')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const BcsHeading = require('../../models/BcsHeading')
const BcsEvent = require('../../models/BcsEvent')
const {COMPANY, USER} = require('../../config/constants').ACCESSTYPES

// @route   POST api/bcsheadings
// @desc    Create a BCS Heading
// @access  Private
router.post('/', [access(COMPANY.ADMIN,USER.SUPERADMIN), [
  check('name','Name is required').not().isEmpty(),
  check('order','Order is required').not().isEmpty(),
  check('isprojectheading','Is Project Heading is required').not().isEmpty(),
  check('bcsevent','BCS Event ID is required').isMongoId(),
  check('isactive','IsActive is reauired').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }

  try {
    const {name, order, isprojectheading, isactive, bcsevent} = req.body

    const newbcsheading = {
      name,
      order,
      isprojectheading,
      isactive,
      events:[bcsevent]
    }
        
    const bcsheading = new BcsHeading(newbcsheading)
    await bcsheading.save();
    
    res.status(200).json(bcsheading)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   PUT api/bcsheadings/:id
// @desc    Update a BCS Heading
// @access  Private
router.put('/:id', [access(COMPANY.ADMIN,USER.SUPERADMIN), [
  check('name','Name is required').not().isEmpty(),
  check('order','Order is required').not().isEmpty(),
  check('isprojectheading','Is Project Heading is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  
  try {

    const bcsheading = await BcsHeading.findById(req.params.id)
    
    if(!bcsheading){
      return res.status(404).json({errors: [{msg: 'BCS Heading not found'}]})
    }

    const {name, order, isprojectheading} = req.body
    
    
    bcsheading.name = name
    bcsheading.order = order
    bcsheading.isprojectheading = isprojectheading
    
    await bcsheading.save();

    res.status(200).json(bcsheading)
  } catch (err) {
    console.error(err.message)

    if(err.kind == 'ObjectId'){
      return res.status(400).json({ errors: [{msg: 'BCS Heading not found'}]})
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   GET api/bcsheadings
// @desc    Get all BCS Headings
// @access  Private
router.get('/',access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    BcsHeading.hookEnabled=false

    const bcsheadings = await BcsHeading.find()
    .sort({order:1})

    res.status(200).json(bcsheadings)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   GET api/bcsheadings
// @desc    Get all active BCS Headings
// @access  Private
router.get('/activeonly',access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const bcsheadings = await BcsHeading.find({isactive: true})
    .sort({order:1})

    res.status(200).json(bcsheadings)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   GET api/bcsheadings
// @desc    Get all Project Headings BCS Headings
// @access  Private
router.get('/projectheadings',access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const bcsheadings = await BcsHeading.find({isactive: true, isprojectheading: true}).sort({order:1})
    res.status(200).json(bcsheadings)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   GET api/bcsheadings/:id
// @desc    Get BCS Heading by id
// @access  Private
router.get('/:id', access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const bcsheading = await BcsHeading.findById(req.params.id)      

    if(!bcsheading){
      return res.status(404).json({ errors: [{msg: 'BCS Heading not found'}]})  
    }
    res.status(200).json(bcsheading)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Heading not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   GET api/bcsheadings/slug/:slug
// @desc    Get BCS Heading by slug
// @access  Private
router.get('/slug/:slug', access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const bcsheading = await BcsHeading.findOne({slug:req.params.slug})

    if(!bcsheading){
      return res.status(404).json({ errors: [{msg: 'BCS Heading not found'}]})  
    }
    res.status(200).json(bcsheading)

  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT pi/bcsheadings/:id/deactivate
// @desc    Deactivate a BCS Heading
// @access  Private
router.put('/:id/deactivate', access(COMPANY.ADMIN,USER.SUPERADMIN), async (req, res) => {
  try{
    const bcsheading = await BcsHeading.findById(req.params.id)
    if(!bcsheading){
      return res.status(404).json({errors: [{msg: 'BCS Heading not found'}]})
    }
    bcsheading.isactive = false
    await bcsheading.save()
    res.status(200).json(bcsheading)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Heading not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT pi/bcsheadings/:id/bcsevent/:bcsevent_id
// @desc    Attach A BCS Event
// @access  Private
router.put('/:id/bcsevent/:bcsevent_id', access(COMPANY.ADMIN,USER.SUPERADMIN), async (req, res) => {
  try{
    const bcsheading = await BcsHeading.findById(req.params.id)
    if(!bcsheading){
      return res.status(404).json({errors: [{msg: 'BCS Heading not found'}]})
    }

    const bcsevent = await BcsEvent.findById(req.params.bcsevent_id)
    if(!bcsevent){
      return res.status(404).json({errors: [{msg: 'BCS Event not found'}]})
    }

    let foundIndex = null
    bcsheading.events.forEach((event, index)=>{
      if(event._id.toString() === bcsevent._id.toString()){
        foundIndex = index
      }
    })
    
    if(foundIndex === null){
      bcsheading.events.unshift(bcsevent._id)
      await bcsheading.save()
      const newHeading = await BcsHeading.findById(req.params.id)
      return res.status(200).json(newHeading)
    } else {
      return res.status(404).json({errors: [{msg: 'That BCS Event was already attached to the BCS Heading'}]})
    }

    

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Heading or BCS Event not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   DELETE pi/bcsheadings/:id/bcsevent/:bcsevent_id
// @desc    Remove A BCS Event
// @access  Private
router.delete('/:id/bcsevent/:bcsevent_id', access(COMPANY.ADMIN,USER.SUPERADMIN), async (req, res) => {
  try{
    const bcsheading = await BcsHeading.findById(req.params.id)
    if(!bcsheading){
      return res.status(404).json({errors: [{msg: 'BCS Heading not found'}]})
    }

    const bcsevent = await BcsEvent.findById(req.params.bcsevent_id)
    if(!bcsevent){
      return res.status(404).json({errors: [{msg: 'BCS Event not found'}]})
    }

    let foundIndex = null
    bcsheading.events.forEach((event, index)=>{
      if(event._id.toString() === bcsevent._id.toString()){
        foundIndex = index
      }
    })
    
    
    if (foundIndex !== null){
      bcsheading.events.splice(foundIndex,1)
      await bcsheading.save()
      const newHeadings = await BcsHeading.findById(req.params.id)

      return res.status(200).json(newHeadings)
    } else {
      return res.status(404).json({errors: [{msg: 'That BCS Event was not attached to the BCS Heading'}]})
    }

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Heading or BCS Event not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT pi/bcsheadings/:id/activate
// @desc    Activate a BCS Heading
// @access  Private
router.put('/:id/activate', access(COMPANY.ADMIN,USER.SUPERADMIN), async (req, res) => {
  try{
    const bcsheading = await BcsHeading.findById(req.params.id)

    if(!bcsheading){
      return res.status(404).json({errors: [{msg: 'BCS Heading not found'}]})
    }
    bcsheading.isactive = true
    await bcsheading.save()
    res.status(200).json(bcsheading)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Heading not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   DELETE api/bcsheadings/:id
// @desc    Delete bcsevent by id
// @access  Private
router.delete('/:id',access(COMPANY.ADMIN,USER.SUPERADMIN), async (req,res) => {
  try{
    const bcsheading = await BcsHeading.findById(req.params.id)
    if(!bcsheading){
      return res.status(404).json({errors: [{msg: 'BCS Heading not found'}]})
    }


    await bcsheading.remove()
    res.status(200).json({msg: 'BCS Heading removed'})

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Heading not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})
module.exports = router