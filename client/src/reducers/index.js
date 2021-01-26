import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import company  from './company'

export default combineReducers({
  alert,
  auth,
  profile,
  company
})