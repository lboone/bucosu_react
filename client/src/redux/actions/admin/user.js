import axios from 'axios'
import { setAlert } from '../alert'

import {
  ADMIN_GET_USER_PROFILES,
  ADMIN_UPDATE_USER_PROFILES,
  ADMIN_UPDATE_USER_BY_ID,
  ADMIN_ACTIVATE_USER,
  ADMIN_DEACTIVATE_USER,
  ADMIN_DELETE_USER,
  ADMIN_USER_ERROR,
} from '../types'

export const adminGetUserProfiles = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/mylevel')
    dispatch({
      type: ADMIN_GET_USER_PROFILES,
      payload: res.data
    })
  } catch (err) {
    console.log({err})
    dispatch({
      type: ADMIN_USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const adminUpdateUserProfiles = (profiles) => dispatch => {
  dispatch({
    type: ADMIN_UPDATE_USER_PROFILES,
    payload: profiles
  })
}

export const adminUpdateUserByID = ({username, email, firstname, lastname, phone, usertypeid, uid}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({username, email, firstname, lastname, phone, usertypeid})
try {
  const res = await axios.put(`/api/users/${uid}`, body, config)
  dispatch({
    type: ADMIN_UPDATE_USER_BY_ID,
    payload: res.data
  })
} catch (err) {
  dispatch({
    type: ADMIN_USER_ERROR,
    payload: {msg: err.response.statusText, status: err.response.status}
  })
  throw err
}
}

export const adminActivateUser = (uid) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${uid}/activate`)
    dispatch({
      type: ADMIN_ACTIVATE_USER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ADMIN_USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const adminDeactivateUser = (uid) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${uid}/deactivate`)
    dispatch({
      type: ADMIN_DEACTIVATE_USER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ADMIN_USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const adminDeleteUser = (uid) => async dispatch => {
  try{
    const res = await axios.delete(`/api/users/${uid}`)
    dispatch({
      type: ADMIN_DELETE_USER,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: ADMIN_USER_ERROR
    })
  }
}