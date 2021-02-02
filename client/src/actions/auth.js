import axios from 'axios'
import { setAlert } from './alert'
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PASSWORD_SUCCESS,
  PASSWORD_FAIL,
  LOGOUT
} from './types'
import setAuthToken from '../utils/setAuthToken'
import {
  getItem, 
} from '../utils/manageLocalStorage'
import {getCurrentProfile} from './profile'
import { getMenus } from './menu'

// Load User
export const loadUser = () => async dispatch => {
  const token = getItem('token')
  if(token){
  //if(localStorage.token){
    setAuthToken(token)  
  }
  try {
    const res = await axios.get('/api/auth');
    const payload = {
      user: res.data,
      level: {
        company:  res.data.company.companytype.level,
        user:     res.data.usertype.level
      }
    }
    dispatch({
      type: USER_LOADED,
      payload
    })
    dispatch(getCurrentProfile())
    dispatch(getMenus())
    
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({email, password})
  try {
    const res = await axios.post('/api/auth', body, config )
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
    
  } catch (err) {
    const errors = err.response.data.errors

    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
  
}

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT})  
}


// Register User
export const register = ( { username, email, password, firstname, lastname, phone, company, usertype }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({username, email, password, firstname, lastname, phone})
  try {
    const res = await axios.post(`/api/users/company/${company}/usertype/${usertype}`, body, config )
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: REGISTER_FAIL
    })
    throw err
  }
  
}


// Reset User's password
export const resetPassword = ({origpassword, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({origpassword, password})
  try {
    const res = await axios.post(`/api/auth/resetpassword`, body, config )
    dispatch({
      type: PASSWORD_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: PASSWORD_FAIL
    })
    throw err
  }
}