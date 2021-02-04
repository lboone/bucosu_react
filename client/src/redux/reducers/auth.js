import {
  getItem, 
  setItem, 
  removeItem,
} from '../../utils/manageLocalStorage'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  PASSWORD_SUCCESS,
  PASSWORD_FAIL,
  LOGOUT,
} from '../actions/types'

const initialState = {
  token: getItem('token'),
  isAuthenticated: null,
  userRegistered: null,
  loading: true,
  level: null,
  user: null
}

const reduce = function(state = initialState, action){
  const { type, payload } = action
  switch(type){
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        userRegistered: null,
        loading: false,
        level: payload.level,
        user: payload.user,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        userRegistered: payload,
        loading: false
      }
    case LOGIN_SUCCESS:
      setItem('token',payload.token)
      //localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        userRegistered:null,
        loading: false
      }
    case REGISTER_FAIL:
      return {
        ...state,
        userRegistered:null,
        loading: false
      }
    case PASSWORD_SUCCESS:
    case PASSWORD_FAIL:
      return {
        ...state,
        loading: false
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      removeItem('token')
      //localStorage.removeItem('token')
      return {
        ...state,
        user: null,
        userRegistered:null,
        token: null,
        level: null,
        isAuthenticated: false,
        loading: false
      }
    default:
      return state
  }
}

export default reduce