import axios from 'axios'
import { setAlert } from './alert'

import {
  GET_USERS,
  SET_USER_ID,
  GET_USER,
  UPDATE_USER,
  ACTIVATE_USER,
  DEACTIVATE_USER,
  DELETE_USER,
  USER_ERROR,
} from './types'


export const getUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/mylevel')
    dispatch({
      type: GET_USERS,
      payload: res.data
    })
  } catch (err) {
    console.log({err})
    dispatch({
      type: USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const setUserID = (uID) => dispatch => {
  dispatch({
    type: SET_USER_ID,
    payload: uID
  })
}

export const getUser = (uID) => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${uID}`)
    dispatch({
      type: GET_USER,
      payload: res.data
    })
  } catch (err) {
    console.log({err})
    dispatch({
      type: USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const updateCurrentUser = ({username, email, firstname, lastname, phone}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({username, email, firstname, lastname, phone})
try {
  const res = await axios.put(`/api/users/me`, body, config)
  dispatch({
    type: UPDATE_USER,
    payload: res.data
  })
} catch (err) {
  dispatch({
    type: USER_ERROR,
    payload: {msg: err.response.statusText, status: err.response.status}
  })
  throw err
}
}

export const updateUserByID = ({username, email, firstname, lastname, phone, usertypeid, uid}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({username, email, firstname, lastname, phone, usertypeid})
try {
  const res = await axios.put(`/api/users/${uid}`, body, config)
  dispatch({
    type: UPDATE_USER,
    payload: res.data
  })
} catch (err) {
  dispatch({
    type: USER_ERROR,
    payload: {msg: err.response.statusText, status: err.response.status}
  })
  throw err
}
}

export const activateUser = (uid) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${uid}/activate`)
    dispatch({
      type: ACTIVATE_USER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const deactivateUser = (uid) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${uid}/deactivate`)
    dispatch({
      type: DEACTIVATE_USER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const deleteUser = (uid) => async dispatch => {
  try{
    const res = await axios.delete(`/api/users/${uid}`)
    dispatch({
      type: DELETE_USER,
      payload: res.data
    })
    setAlert('BCS Event deleted successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: USER_ERROR
    })
  }
}