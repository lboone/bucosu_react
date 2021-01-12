const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const CompanyType = require('../../models/CompanyType')
const Company = require('../../models/Company')
const User = require('../../models/User')


// @route   POST api/companies/companytype/:companytype_id
// @desc    Create a company
// @access  Private
router.post('/companytype/:companytype_id', [auth, [
  check('name','Name is required').not().isEmpty(),
  check('address','Address is required').not().isEmpty(),
  check('city','city is required').not().isEmpty(),
  check('state','state is required').not().isEmpty(),
  check('zip','zip is required').not().isEmpty(),
  check('phone','phone is required').not().isEmpty(),
  check('website','website is required').not().isEmpty(),
  check('logo','logo is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  
  try {
    const companytype = await CompanyType.findById(req.params.companytype_id)
    if(!companytype){
      return res.status(400).json({errors: [{msg: 'Company type invalid'}] })
    }
    const {name, address, city, state, zip, phone, website, logo, fax} = req.body
    const companyaddress = {
      address,
      city,
      state,
      zip
    }
    const contact = {
      phone,
      website,
      logo,
      fax,
    }
    const newCompany = {
      name,
      companytype : companytype.id,
      companyaddress,
      contact
    }
    
    const company = new Company(newCompany)
    await company.save();
    
    const co = await Company.findById(company.id).populate('companytype',['name','level'])
    res.status(200).json(co)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   PUT api/companies/:id
// @desc    Update a company
// @access  Private
router.put('/:id', [auth, [
  check('name','Name is required').not().isEmpty(),
  check('address','Address is required').not().isEmpty(),
  check('city','city is required').not().isEmpty(),
  check('state','state is required').not().isEmpty(),
  check('zip','zip is required').not().isEmpty(),
  check('phone','phone is required').not().isEmpty(),
  check('website','website is required').not().isEmpty(),
  check('logo','logo is required').not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  
  try {
    const company = await Company.findById(req.params.id).populate('companytype',['name','level'])
    
    if(!company){
      return res.status(404).json({errors: [{msg: 'Company not found'}]})
    }

    const {name, address, city, state, zip, phone, website, logo, fax} = req.body
    const companyaddress = {
      address,
      city,
      state,
      zip
    }
    const contact = {
      phone,
      website,
      logo,
      fax
    }
    company.name = name
    company.companyaddress = companyaddress
    company.contact = contact
    await company.save();

    res.status(200).json(company)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   GET api/companies
// @desc    Get all companies
// @access  Private
router.get('/',auth, async (req,res) => {
  try{
    const companies = await Company.find().populate('companytype',['name','level'])
    res.status(200).json(companies)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   GET api/companies/:id
// @desc    Get company by id
// @access  Private
router.get('/:id', auth, async (req,res) => {
  try{
    const company = await Company.findById(req.params.id).populate('companytype',['name','level'])
    if(!company){
      return res.status(404).json({ errors: [{msg: 'Company not found'}]})  
    }
    res.status(200).json(company)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Company not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   DELETE api/companies/:id
// @desc    Delete company by id
// @access  Private
router.delete('/:id',auth, async (req,res) => {
  try{
    const company = await Company.findById(req.params.id).populate('companytype',['name','level'])
    if(!company){
      return res.status(404).json({errors: [{msg: 'Company not found'}]})
    }

    const user = await User.findById(req.user.id).populate('usertype',['name','level'])

    // Make sure user level is Admin
    if(user.usertype.level > 0){
      return res.status(401).json({ errors: [{msg: 'You are not authorized'}]})
    }

    // Make sure company is not Admin Company
    if(company.companytype.level === 0){
      return res.status(401).json({ errors: [{msg: 'You are not authorized'}]})  
    }

    await company.remove()
    res.status(200).json({msg: 'Company removed'})

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Company not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT pi/companies/:id/deactivate
// @desc    Deactivate a company
// @access  Private
router.put('/:id/deactivate', auth, async (req, res) => {
  try{
    const company = await Company.findById(req.params.id)
    if(!company){
      return res.status(404).json({errors: [{msg: 'Company not found'}]})
    }
    company.isactive = false
    await company.save()
    res.status(200).json(company)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Company not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT pi/companies/:id/activate
// @desc    Activate a company
// @access  Private
router.put('/:id/activate', auth, async (req, res) => {
  try{
    const company = await Company.findById(req.params.id)
    if(!company){
      return res.status(404).json({errors: [{msg: 'Company not found'}]})
    }
    company.isactive = true
    await company.save()
    res.status(200).json(company)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Company not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

module.exports = router