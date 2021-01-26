import axios from 'axios'
import {setAlert} from './alert'

import {
  GET_PROFILE,
  PROFILE_ERROR,
  PROFILE_SUCCESS,

} from './types'


export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me')
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const createUserProfile = (firstname, lastname, phone, userid) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({firstname, lastname, phone, userid})
  try {
    const res = await axios.post('/api/profile', body, config )
    dispatch({
      type: PROFILE_SUCCESS,
      payload: res.data
    })
    setAlert('User added successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: PROFILE_ERROR
    })
  }
}