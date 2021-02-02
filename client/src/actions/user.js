import axios from 'axios'

import {
  GET_USERS,
  SET_USER_ID,
  GET_USER,
  UPDATE_USER,
  USER_ERROR
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

export const updateUser = ({username, email, firstname, lastname, phone}) => async dispatch => {
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
    type: UPDATE_USER,
    payload: {msg: err.response.statusText, status: err.response.status}
  })
}
}
