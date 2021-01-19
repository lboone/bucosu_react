import axios from 'axios'
import { setAlert } from './alert'
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types'
import setAuthToken from '../utils/setAuthToken'
import {
  getItem, 
} from '../utils/manageLocalStorage'

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