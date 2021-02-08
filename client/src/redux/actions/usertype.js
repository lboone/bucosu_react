import axios from 'axios'
import { setAlert } from './alert'

import {
  GET_USERTYPES,
  GET_USERTYPE,
  CREATE_USERTYPE,
  DELETE_USERTYPE,
  USERTYPE_ERROR
} from './types'


export const getCompanyTypes = () => async dispatch => {
  try {
    const res = await axios.get('/api/companytypes')
    dispatch({
      type: GET_USERTYPES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: USERTYPE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
    throw err
  }
}

export const getUserType = (ctid) => async dispatch => {
  try {
    const res = await axios.get(`/api/usertypes/${ctid}`)
    dispatch({
      type: GET_USERTYPE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: USERTYPE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
    throw err
  }
}

export const createUserType = ({name, description, level}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, description, level})
  try {
    const res = await axios.post(`/api/usertypes`, body, config )
    dispatch({
      type:   CREATE_USERTYPE,
      payload: res.data
    })
    setAlert('User Type added successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: USERTYPE_ERROR
    })
    throw err
  }
}

export const deleteUserType = (ctid) => async dispatch => {
  try{
    const res = await axios.delete(`/api/usertypes/${ctid}`)
    dispatch({
      type: DELETE_USERTYPE,
      payload: res.data
    })
    setAlert('User Type deleted successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: USERTYPE_ERROR
    })
    throw err
  }
}