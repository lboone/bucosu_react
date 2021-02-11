import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import company  from './company'
import menu from './menu'
import companytype from './companytype'
import building from './building'
import usertype from './usertype'
import adminUser from './admin/user'
import adminBcsEvent from './admin/bcsevent'
import adminCompany from './admin/company'

const appReducer = combineReducers({
  alert,
  auth,
  profile,
  company,
  menu,
  companytype,
  building,
  usertype,
  adminUser,
  adminBcsEvent,
  adminCompany
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer