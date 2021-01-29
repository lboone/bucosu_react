const express = require('express')
const router = express.Router()
const axios = require('axios')
const config = require('config')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const IPGeolocation = require('../../models/IPGeolocation')



// @route   GET api/ipgeolocation/:ip
// @desc    Get the geolocation of an ip address.
// @access  Private
router.get('/:ip',auth, async (req,res) => {
  try{
    let ipgeolocation = await IPGeolocation.findOne({ip: req.params.ip})
    //If it does not exist / create it
    if(!ipgeolocation){
      const rslts = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${config.get('ipGeolocation')}&ipAddress=${req.params.ip}`)
      
      const data = rslts.data
      const { location } = data

      const newIPGeolocation = {
        ip : req.params.ip,
        address: {
          country: location.country,
          state: location.region,
          city: location.city,
          zip: location.postalCode,
          location: {
            type: 'Point',
            coordinates: [
              location.lng, location.lat
            ]            
          },
          logins: [ {user: req.user.id} ]
        },
        name: data.as.name,
        isp: data.isp 
      }
      
      ipgeolocation = new IPGeolocation(newIPGeolocation)
    }

    ipgeolocation.logins.unshift({user: req.user.id})

    await ipgeolocation.save()

    ipgeolocation = await IPGeolocation.findOne({ip: req.params.ip}).populate({
      path: 'logins.user',
      model: 'user',
      select: ['username','email']
    })
    res.status(200).json(ipgeolocation)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ errors: [{msg: 'Server error'}]})
  } 
})


module.exports = router