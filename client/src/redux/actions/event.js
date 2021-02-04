import axios from 'axios'
import {setAlert} from './alert'

import {
  GET_BCSEVENTS,
  GET_BCSEVENT,
  CREATE_BCSEVENT,
  EDIT_BCSEVENT,
  ACTIVATE_BCSEVENT,
  DEACTIVATE_BCSEVENT,
  DELETE_BCSEVENT,
  BCSEVENT_ERROR,
} from './types'


export const getBcsEvents = () => async dispatch => {
  try {
    const res = await axios.get('/api/bcsevents')
    dispatch({
      type: GET_BCSEVENTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BCSEVENT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const getBcsEvent = (bid) => async dispatch => {
  try {
    const res = await axios.get(`/api/bcsevents/${bid}`)
    dispatch({
      type: GET_BCSEVENT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BCSEVENT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const createBcsEvent = ({name, startdate, enddate, isactive}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, startdate, enddate, isactive})
  try {
    const res = await axios.post('/api/bcsevents', body, config )
    dispatch({
      type:   CREATE_BCSEVENT,
      payload: res.data
    })
    setAlert('BCS Event added successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: BCSEVENT_ERROR
    })
    throw err
  }
}

export const editBcsEvent = ({name, startdate, enddate, isactive, id}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, startdate, enddate, isactive})
  try {
    const res = await axios.put(`/api/bcsevents/${id}`, body, config )
    dispatch({
      type:   EDIT_BCSEVENT,
      payload: res.data
    })
    setAlert('BCS Event successfully edited','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: BCSEVENT_ERROR
    })
    throw err
  }
}
export const activateBcsEvent = (bid) => async dispatch => {
  try {
    const res = await axios.put(`/api/bcsevents/${bid}/activate`)
    dispatch({
      type: ACTIVATE_BCSEVENT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BCSEVENT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const deactivateBcsEvent = (bid) => async dispatch => {
  try {
    const res = await axios.put(`/api/bcsevents/${bid}/deactivate`)
    dispatch({
      type: DEACTIVATE_BCSEVENT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BCSEVENT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const deleteBcsEvent = (bid) => async dispatch => {
  try{
    const res = await axios.delete(`/api/bcsevents/${bid}`)
    dispatch({
      type: DELETE_BCSEVENT,
      payload: res.data
    })
    setAlert('BCS Event deleted successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: BCSEVENT_ERROR
    })
    throw err
  }
}