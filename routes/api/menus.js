const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const access = require('../../middleware/access')
const { check, validationResult } = require('express-validator')
const CompanyType = require('../../models/CompanyType')
const UserType = require('../../models/UserType')
const Menu = require('../../models/Menu')
const {COMPANY, USER} = require('../../config/constants').ACCESSTYPES

// @route   POST api/menus
// @desc    Create a top level menu
// @access  Public
router.post('/', [access(COMPANY.ADMIN,USER.SUPERADMIN),[
  check('label','Label is required').not().isEmpty(),
  check('sort','Sort is required').not().isEmpty(),
  check('icon','Icon is required').not().isEmpty(),
  check('companytype','Company Type ID is required').not().isEmpty(),
  check('usertype','User Type ID is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  try {
    const {label, headerlabel, link, icon, sort,  companytype, usertype} = req.body 

    const cotype = await CompanyType.findById(companytype)
    if(!cotype){
      return res.status(400).json({ errors: [{msg: 'Invalid Company Type'}]})
    }

    const utype = await UserType.findById(usertype)
    if(!utype){
      return res.status(400).json({ errors: [{msg: 'Invalid User Type'}]})
    }

    const newMenu = {
      label,
      headerlabel: headerlabel ? headerlabel : "",
      link: link ? link : "",
      icon,
      sort,
      companytype: cotype.id,
      usertype: utype.id
    }
    
    const menu = new Menu(newMenu)
    await menu.save()
    const menu1 = await Menu.findById(menu.id).populate({path: 'companytype',model: 'companytype'}).populate({path: 'usertype',model: 'usertype'})
    res.status(200).json(menu1)

  } catch(err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
    
  
})

// @route   POST api/menus/parent/:parent_id
// @desc    Create a sub menu
// @access  Public
router.post('/parent/:parent_id', [access(COMPANY.ADMIN,USER.SUPERADMIN),[
  check('label','Label is required').not().isEmpty(),
  check('sort','Sort is required').not().isEmpty(),
  check('icon','Icon is required').not().isEmpty(),
  check('companytype','Company Type ID is required').not().isEmpty(),
  check('usertype','User Type ID is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  try {
    const parent = await Menu.findById(req.params.parent_id)
    if(!parent){
      return res.status(400).json({ errors: [{msg: 'Invalid Parent Menu'}]})
    }

    const {label, headerlabel, link, icon, sort,  companytype, usertype} = req.body 

    const cotype = await CompanyType.findById(companytype)
    if(!cotype){
      return res.status(400).json({ errors: [{msg: 'Invalid Company Type'}]})
    }

    const utype = await UserType.findById(usertype)
    if(!utype){
      return res.status(400).json({ errors: [{msg: 'Invalid User Type'}]})
    }

    const newMenu = {
      label,
      headerlabel: headerlabel ? headerlabel : "",
      link: link ? link : "",
      icon,
      sort,
      companytype: cotype.id,
      usertype: utype.id,
      istoplevel: false
    }
    
    const menu = new Menu(newMenu)
    await menu.save()

    parent.submenus.unshift(menu.id)
    await parent.save()

    const menu1 = await Menu.findById(menu.id).populate({path: 'companytype',model: 'companytype'}).populate({path: 'usertype',model: 'usertype'})
    res.status(200).json(menu1)

  } catch(err) {
    console.error(err.message)

    if(err.kind == 'ObjectId'){
      return res.status(400).json({ errors: [{msg: 'Parent Menu not found'}]})
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
    
  
})

// @route   PUT api/menus/:id
// @desc    Update a menu
// @access  Public
router.put('/:id', [access(COMPANY.ADMIN,USER.SUPERADMIN),[
  check('label','Label is required').not().isEmpty(),
  check('sort','Sort is required').not().isEmpty(),
  check('icon','Icon is required').not().isEmpty(),
  check('companytype','Company Type ID is required').not().isEmpty(),
  check('usertype','User Type ID is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }
  try {
    const {label, headerlabel, link, icon, sort,
      istoplevel, companytype, usertype} = req.body 

    const cotype = await CompanyType.findById(companytype)
    if(!cotype){
      return res.status(400).json({ errors: [{msg: 'Invalid Company Type'}]})
    }

    const utype = await UserType.findById(usertype)
    if(!utype){
      return res.status(400).json({ errors: [{msg: 'Invalid User Type'}]})
    }

    const menuItem = await Menu.findById(req.params.id)
    .populate({path: 'companytype',model: 'companytype'})
    .populate({path: 'usertype',model: 'usertype'})

    if (!menuItem){
      return res.status(400).json({ errors: [{msg: 'Invalid Menu'}]})      
    }
    if(menuItem.label != label){
      menuItem.label = label
    }
    if(menuItem.headerlabel != headerlabel){
      menuItem.headerlabel = headerlabel
    }
    
    if(menuItem.link != link){
      menuItem.link = link
    }
    if(menuItem.icon != icon){
      menuItem.icon = icon
    }
    if(menuItem.sort != sort){
      menuItem.sort = sort
    }
    let changedTypes = false

    if(menuItem.companytype.id != cotype.id){
      changedTypes = true
      console.log('changed: ', menuItem.companytype)
      menuItem.companytype = cotype.id
    }
    if(menuItem.usertype.id != utype.id){
      changedTypes = true
      console.log('changed: ', menuItem.usertype)
      menuItem.usertype = utype.id
    }
    if(menuItem.istoplevel != istoplevel){
      menuItem.istoplevel = istoplevel
    }

    await menuItem.save()
    if(changedTypes){
      const menuItem2 = await Menu.findById(menuItem.id)
    .populate({path: 'companytype',model: 'companytype'})
    .populate({path: 'usertype',model: 'usertype'})
    return res.status(200).json(menuItem2)
    }
    res.status(200).json(menuItem)
  } catch(err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})


// @route   GET api/menus/:id/submenus
// @desc    Get a menus submenus based on users access.
// @access  Private
router.get('/:id/submenus', auth, async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id)
    .populate({
      path: "submenus",
      model:"menu",
      options: {sort: {sort:1}},
      populate: [{
        path: "companytype",
        select: ["level","name"],
      },{
        path: "usertype",
        select: ["level","name"],
      }]
    })
    .populate({
      path: "companytype",
      select: ["level","name"],
    })
    .populate({
      path: "usertype",
      select: ["level","name"],
    })

    if (!menuItem){
      return res.status(400).json({ errors: [{msg: 'Invalid Menu'}]})      
    }

    let user = await User.findById(req.user.id)
    .populate('usertype',['level'])
    .populate({path: 'company',model: 'company',populate: {path : 'companytype',select: 'level'}});

    if (!user){
      return res.status(400).json({ errors: [{msg: 'Server Error!'}]})      
    }

    const subMenus = menuItem.submenus.filter(menu => menu.companytype.level >= user.company.companytype.level && menu.usertype.level >= user.usertype.level)


    res.status(200).json(subMenus)
  } catch(err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  }
})

// @route   GET api/menus
// @desc    Get all menus
// @access  Public
router.get('/', auth, async (req,res) => {
  
  try{

    let user = await User.findById(req.user.id)
    .populate('usertype',['level'])
    .populate({path: 'company',model: 'company',populate: {path : 'companytype',select: 'level'}});

    const menus = await Menu.find({istoplevel: true})
    .sort({sort:1})
    .populate({
      path: "submenus",
      model:"menu",
      options: {sort: {sort:1}},
      populate: [{
        path: "companytype",
        select: ["level","name"],
      },{
        path: "usertype",
        select: ["level","name"],
      }]
    })
    .populate({
      path: "companytype",
      select: ["level","name"],
    })
    .populate({
      path: "usertype",
      select: ["level","name"],
    })

    
    const newMenus = menus.filter(menu => menu.companytype.level >= user.company.companytype.level && menu.usertype.level >= user.usertype.level )

    res.status(200).json(newMenus)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT api/menus/:id/deactivate
// @desc    Deactivate a menu
// @access  Private
router.put('/:id/deactivate', access(COMPANY.ADMIN,USER.SUPERADMIN), async (req, res) => {
  try{
    const menu = await Menu.findById(req.params.id)
    if(!menu){
      return res.status(404).json({errors: [{msg: 'Menu not found'}]})
    }
    menu.isactive = false
    await menu.save()
    res.status(200).json(menu)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Menu not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   PUT pi/menus/:id/activate
// @desc    Activate a company
// @access  Private
router.put('/:id/activate', access(COMPANY.ADMIN,USER.SUPERADMIN), async (req, res) => {
  try{
    const menu = await Menu.findById(req.params.id)
    if(!menu){
      return res.status(404).json({errors: [{msg: 'Menu not found'}]})
    }
    menu.isactive = true
    await menu.save()
    res.status(200).json(menu)

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Menu not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})

// @route   DELETE api/menus/:id
// @desc    Delete Menu by id
// @access  Private
router.delete('/:id',access(COMPANY.ADMIN,USER.SUPERADMIN), async (req,res) => {
  try{
    const menu = await Menu.findById(req.params.id)
    if(!menu){
      return res.status(404).json({errors: [{msg: 'Menu not found'}]})
    }

    await menu.remove()
    res.status(200).json({msg: 'Menu removed'})

  } catch (err) {
    console.error(err.message)

    if(err.kind === 'ObjectId'){
      return res.status(404).json({ errors: [{msg: 'Menu not found'}]})   
    }
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})
module.exports = router