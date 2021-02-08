const express = require('express')
const router = express.Router()
const access = require('../../middleware/access')
const { check, validationResult } = require('express-validator')
const CompanyType = require('../../models/CompanyType')
const Company = require('../../models/Company')
const User = require('../../models/User')
const Building = require('../../models/Building')
const {COMPANY, USER} = require('../../config/constants').ACCESSTYPES
const Profile = require('../../models/Profile')

// @route   POST api/companies/companytype/:companytype_id
// @desc    Create a company
// @access  Private
router.post('/companytype/:companytype_id', [access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), [
  check('name','Name is required').not().isEmpty(),
  check('address','Address is required').not().isEmpty(),
  check('city','City is required').not().isEmpty(),
  check('state','State is required').not().isEmpty(),
  check('zip','Zip is required').not().isEmpty(),
  check('phone','Phone is required').not().isEmpty(),
  check('website','A valid URL is required').not().isEmpty().isURL(),
  check('logo','A valid Logo is required').not().isEmpty().isURL(),
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

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Company Type not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   PUT api/companies/:id
// @desc    Update a company
// @access  Private
router.put('/:id', [access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), [
  check('name','Name is required').not().isEmpty(),
  check('address','Address is required').not().isEmpty(),
  check('city','city is required').not().isEmpty(),
  check('state','state is required').not().isEmpty(),
  check('zip','zip is required').not().isEmpty(),
  check('phone','phone is required').not().isEmpty(),
  check('website','A valid website URL is required').not().isEmpty().isURL(),
  check('logo','A valid logo URL is required').not().isEmpty().isURL(),
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
    
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Company not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   GET api/companies
// @desc    Get all companies
// @access  Private
router.get('/',access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const companies = await Company.find( ).populate({
      path: "companytype",
      model:"companytype",
      populate: 
      {
        path: 'usertypes',
        model: 'usertype'
      }
    })
    res.status(200).json(companies)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   GET api/companies/relationships
// @desc    Get all company relationships for the currently logged in user (Used for adding new users)
// @access  Private
router.get('/relationships',access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), async (req,res) => {
  try{
    const user = await User.findById(req.user.id)
    .populate({
      path: 'company',
      select: ['name'],
      match: {
        isactive: true
      },
      populate: {
        path: 'relationships',
        model: 'company',
        select: ['name'],
        match: {
          isactive: true
        },
        populate: {
          path: 'companytype',
          select: ['level','name'],
          populate: {
            path: 'usertypes',
            select: ['level','name']
          }
        }
      }
    })
    res.status(200).json(user.company.relationships)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   GET api/companies/:id
// @desc    Get company by id
// @access  Private
router.get('/:id', access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const company = await Company.findById(req.params.id).populate({
      path: "companytype",
      model:"companytype",
      populate: 
      {
        path: 'usertypes',
        model: 'usertype'
      }
    })
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

// @route   GET api/companies/:id/usertypes
// @desc    Get companies user types by id
// @access  Private
router.get('/:id/usertypes', access(COMPANY.SCHOOLDISTRICT,USER.READER), async (req,res) => {
  try{
    const company = await Company.findById(req.params.id).populate({
      path: "companytype",
      select: ['level','name'],
      populate: 
      {
        path: 'usertypes',
        model: 'usertype'
      }
    })
    if(!company){
      return res.status(404).json({ errors: [{msg: 'Company not found'}]})  
    }

    const user = await User.findById(req.user.id)
    .populate({
      path: 'company',
      select: ['name'],
      populate: {
        path: 'companytype',
        select: ['level','name']
      }
    })
    .populate({
      path: 'usertype',
      select: ['name', 'level']
    })

    if (user.usertype.level === USER.SUPERADMIN) 
      return res.status(200).json(company.companytype.usertypes)

    if(user.company.companytype.level > company.companytype.level) 
      return res.status(401).json({ errors: [{msg: 'Access denied'}]})   

    if(user.company.companytype.level < company.companytype.level) 
      return res.status(200).json(company.companytype.usertypes)

    const userTypeList = company.companytype.usertypes.filter(usertype => usertype.level > user.usertype.level)
    res.status(200).json(userTypeList)
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
router.delete('/:id',access(COMPANY.ADMIN,USER.SUPERADMIN), async (req,res) => {
  try{
    const company = await Company.findById(req.params.id).populate('companytype',['name','level'])
    if(!company){
      return res.status(404).json({errors: [{msg: 'Company not found'}]})
    }

    // Make sure company is not Admin Company
    if(company.companytype.level === COMPANY.ADMIN){
      return res.status(401).json({ errors: [{msg: 'You are not authorized'}]})  
    }
    // Delete all the users first.
    const users = await User.find({company: company._id})
    if(users && users.length>0){
      users.forEach(async (user)=>{
        await Profile.findOneAndRemove({user: user._id})
        await User.findOneAndRemove({_id: user._id})
      })     
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
router.put('/:id/deactivate', access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), async (req, res) => {
  try{
    const company = await Company.findById(req.params.id)
    if(!company){
      return res.status(404).json({errors: [{msg: 'Company not found'}]})
    }

    // Deactivate all company users.
    await User.updateMany({company:company._id},{isactive:false})

    await Building.updateMany({company:company._id},{isactive: false})
    //deactivate the company
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
router.put('/:id/activate', access(COMPANY.SCHOOLDISTRICT,USER.ADMIN), async (req, res) => {
  try{
    const company = await Company.findById(req.params.id)
    if(!company){
      return res.status(404).json({errors: [{msg: 'Company not found'}]})
    }

    await Building.updateMany({company:company._id},{isactive: true})

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