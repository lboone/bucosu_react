const express = require('express')
const router = express.Router()
const access = require('../../middleware/access')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const BcsEvent = require('../../models/BcsEvent')
const {COMPANY, USER} = require('../../config/constants').ACCESSTYPES


// @route   POST api/bcsevents
// @desc    Create a BCS Event
// @access  Private
router.post('/', [access(COMPANY.ADMIN,USER.SUPERADMIN), [
  check('name','Name is required').not().isEmpty(),
  check('startdate','Must be a valid start date').isDate(),
  check('enddate','Must be a valid end date').isDate(),
  check('isactive','IsActive is reauired').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }

  try {

    const {name, startdate, enddate, isactive} = req.body

    const newbcsevent = {
      name,
      startdate,
      enddate,
      isactive
    }
        
    const bcsevent = new BcsEvent(newbcsevent)
    await bcsevent.save();
    
    res.status(200).json(bcsevent)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   PUT api/bcsevents/:id
// @desc    Update a BCS Event
// @access  Private
router.put('/:id', [access(COMPANY.ADMIN,USER.SUPERADMIN), [
  check('name','Name is required').not().isEmpty(),
  check('startdate','Must be a valid start date').isDate(),
  check('enddate','Must be a valid end date').isDate()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  
  try {
    const bcsevent = await BcsEvent.findById(req.params.id)
    
    if(!bcsevent){
      return res.status(404).json({errors: [{msg: 'BCS Event not found'}]})
    }

    const {name, startdate, enddate} = req.body
    
    
    bcsevent.name = name
    bcsevent.startdate = startdate
    bcsevent.enddate = enddate
    
    await bcsevent.save();

    res.status(200).json(bcsevent)
  } catch (err) {
    console.error(err.message)

    if(err.kind == 'ObjectId'){
      return res.status(400).json({ errors: [{msg: 'BCS Event not found'}]})
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   GET api/bcsevents
// @desc    Get all BCS Events
// @access  Private
router.get('/',access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const bcsevents = await BcsEvent.find()
    res.status(200).json(bcsevents)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   GET api/bcsevents/:id
// @desc    Get BCS Event by id
// @access  Private
router.get('/:id', access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const bcsevent = await BcsEvent.findById(req.params.id)

    if(!bcsevent){
      return res.status(404).json({ errors: [{msg: 'BCS Event not found'}]})  
    }
    res.status(200).json(bcsevent)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Event not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})


// @route   DELETE api/bcsevents/:id
// @desc    Delete bcsevent by id
// @access  Private
router.delete('/:id',access(COMPANY.ADMIN,USER.SUPERADMIN), async (req,res) => {
  try{
    const bcsevent = await BcsEvent.findById(req.params.id)
    if(!bcsevent){
      return res.status(404).json({errors: [{msg: 'BCS Event not found'}]})
    }


    await bcsevent.remove()
    res.status(200).json({msg: 'BCS Event removed'})

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Event not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT pi/bcsevents/:id/deactivate
// @desc    Deactivate a BCS Event
// @access  Private
router.put('/:id/deactivate', access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), async (req, res) => {
  try{
    const bcsevent = await BcsEvent.findById(req.params.id)
    if(!bcsevent){
      return res.status(404).json({errors: [{msg: 'BCS Event not found'}]})
    }
    bcsevent.isactive = false
    await bcsevent.save()
    res.status(200).json(bcsevent)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Event not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT pi/bcsevents/:id/activate
// @desc    Activate a BCS Event
// @access  Private
router.put('/:id/activate', access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), async (req, res) => {
  try{
    const bcsevent = await BcsEvent.findById(req.params.id)
    if(!bcsevent){
      return res.status(404).json({errors: [{msg: 'BCS Event not found'}]})
    }
    bcsevent.isactive = true
    await bcsevent.save()
    res.status(200).json(bcsevent)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'BCS Event not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

module.exports = router