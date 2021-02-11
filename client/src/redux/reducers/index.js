import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import company  from './company'
import menu from './menu'
import user from './user'
import event from './event'
import companytype from './companytype'
import building from './building'
import usertype from './usertype'
import adminUser from './admin/user'

const appReducer = combineReducers({
  alert,
  auth,
  profile,
  company,
  menu,
  user,
  event,
  companytype,
  building,
  usertype,
  adminUser,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer