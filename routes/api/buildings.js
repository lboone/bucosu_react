const express = require('express')
const router = express.Router()
const access = require('../../middleware/access')
const { check, validationResult } = require('express-validator')
const Company = require('../../models/Company')
const Building = require('../../models/Building')
const {COMPANY, USER} = require('../../config/constants').ACCESSTYPES


// @route   POST api/buildings/:company_id
// @desc    Create a building
// @access  Private
router.post('/:company_id', [access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), [
  check('name','Name is required').not().isEmpty(),
  check('address','Address is required').not().isEmpty(),
  check('city','City is required').not().isEmpty(),
  check('state','State is required').not().isEmpty(),
  check('zip','Zip is required').not().isEmpty(),
  check('lng','Longitude is required').not().isEmpty(),
  check('lat','Latitude is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }

  try {
    const company = await Company.findById(req.params.company_id)
    if(!company){
      return res.status(400).json({errors: [{msg: 'Company invalid'}] })
    }
    const {name, buildingtype, address, city, state, zip, lng, lat} = req.body

    const buildingaddress = {
      address,
      city,
      state,
      zip,
      location: {
        type: 'Point',
        coordinates: [lng, lat]
      }
    }
    const newbuilding = {
      name,
      buildingtype: buildingtype? buildingtype : 'school',
      company: company.id,
      buildingaddress
    } 
        
    const building = new Building(newbuilding)
    await building.save();
    
    const build = await Building.findById(building.id).populate({path: 'company', model:'company'})
    res.status(200).json(build)
  } catch (err) {
    console.error(err.message)

    if(err.kind == 'ObjectId'){
      return res.status(400).json({ errors: [{msg: 'Company not found'}]})
    }

    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   PUT api/buildings/:id
// @desc    Update a building
// @access  Private
router.put('/:id', [access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), [
  check('name','Name is required').not().isEmpty(),
  check('buildingtype','Building Type is required').not().isEmpty(),
  check('address','Address is required').not().isEmpty(),
  check('city','City is required').not().isEmpty(),
  check('state','State is required').not().isEmpty(),
  check('zip','Zip is required').not().isEmpty(),
  check('lng','Longitude is required').not().isEmpty(),
  check('lat','Latitude is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  
  try {
    const building = await Building.findById(req.params.id).populate({path: 'company',model: 'company'})
    
    if(!building){
      return res.status(404).json({errors: [{msg: 'Building not found'}]})
    }

    const {name, buildingtype, address, city, state, zip, lng, lat} = req.body
    const buildingaddress = {
      address,
      city,
      state,
      zip,
      location:{
        type: 'Point',
        coordinates: [lng, lat]
      }
    }
    
    building.name = name
    building.buildingtype = buildingtype
    building.buildingaddress = buildingaddress
    
    await building.save();

    res.status(200).json(building)
  } catch (err) {
    console.error(err.message)

    if(err.kind == 'ObjectId'){
      return res.status(400).json({ errors: [{msg: 'Building not found'}]})
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   GET api/buildings
// @desc    Get all buildings
// @access  Private
router.get('/',access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const buildings = await Building.find().populate({
      path: "company",
      model:"company"
    })

    res.status(200).json(buildings)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   GET api/buildings/:id
// @desc    Get building by id
// @access  Private
router.get('/:id', access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const building = await Building.findById(req.params.id).populate({
      path: "company",
      model:"company"
    })
    if(!building){
      return res.status(404).json({ errors: [{msg: 'Building not found'}]})  
    }
    res.status(200).json(building)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Building not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   GET api/buildings/company/:company_id
// @desc    Get all buildings by company id
// @access  Private
router.get('/company/:company_id', access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const buildings = await Building.find({company: req.params.company_id}).populate({
      path: "company",
      model:"company"
    })
    if(!buildings){
      return res.status(404).json({ errors: [{msg: 'Buildings not found for that company'}]})  
    }
    res.status(200).json(buildings)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Company not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   DELETE api/buildings/:id
// @desc    Delete building by id
// @access  Private
router.delete('/:id',access(COMPANY.ADMIN,USER.SUPERADMIN), async (req,res) => {
  try{
    const building = await Building.findById(req.params.id)
    if(!building){
      return res.status(404).json({errors: [{msg: 'Building not found'}]})
    }


    await building.remove()
    res.status(200).json({msg: 'Building removed'})

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Building not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT pi/buildings/:id/deactivate
// @desc    Deactivate a building
// @access  Private
router.put('/:id/deactivate', access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), async (req, res) => {
  try{
    const building = await Building.findById(req.params.id)
    if(!building){
      return res.status(404).json({errors: [{msg: 'Building not found'}]})
    }
    building.isactive = false
    await building.save()
    res.status(200).json(building)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Building not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT pi/buildings/:id/activate
// @desc    Activate a building
// @access  Private
router.put('/:id/activate', access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), async (req, res) => {
  try{
    const building = await Building.findById(req.params.id)
    if(!building){
      return res.status(404).json({errors: [{msg: 'Building not found'}]})
    }
    building.isactive = true
    await building.save()
    res.status(200).json(building)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Building not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

module.exports = router