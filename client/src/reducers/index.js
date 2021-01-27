import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import company  from './company'
import menu from './menu'

const appReducer = combineReducers({
  alert,
  auth,
  profile,
  company,
  menu
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer