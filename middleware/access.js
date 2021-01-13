const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

function HasLevel(companyLevel, userLevel){
  return function(req, res, next){
    // Get token from header
    const token = req.header('x-auth-token')
  
    // Check if no token
    if(!token){
      return res.status(401).json({ errors: [{msg: 'No token, authorization denied'}]})
    }
  
    // Verify token
    try{
      const decoded = jwt.verify(token,config.get('jwtSecret'))
      const userId = decoded.user
      req.user = userId

      const user = User.findById(userId.id).populate({path: 'usertype',model:'usertype'}).populate({path: 'company',model: 'company',populate:{path: 'companytype',model: 'companytype'}})
      .exec(function(err, user){
        if (!user){
          return res.status(401).json({ errors: [{msg: 'Access denied'}]})
        }
        if( user.usertype.level > userLevel || user.company.companytype.level > companyLevel){
          return res.status(401).json({ errors: [{msg: 'Access denied'}]})
        }
        next()
      })
      
     
    } catch(err){
      console.log(err)
      res.status(401).json({ errors: [{msg: 'Token is not valid'}]})
    }
  }
}

module.exports = HasLevel