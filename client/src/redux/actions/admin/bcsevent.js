import axios from 'axios'
import {setAlert} from '../alert'

import {
  ADMIN_GET_BCSEVENTS,
  ADMIN_UPDATE_BCSEVENTS,
  ADMIN_CREATE_BCSEVENT,
  ADMIN_UPDATE_BCSEVENT,
  ADMIN_ACTIVATE_BCSEVENT,
  ADMIN_DEACTIVATE_BCSEVENT,
  ADMIN_DELETE_BCSEVENT,
  ADMIN_BCSEVENT_ERROR,
} from '../types'


export const adminGetBcsEvents = () => async dispatch => {
  try {
    const res = await axios.get('/api/bcsevents')
    dispatch({
      type: ADMIN_GET_BCSEVENTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ADMIN_BCSEVENT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })   
    throw err 
  }
}

export const adminUpdateBcsEvents = (bcsEvents) => dispatch => {
  dispatch({
    type: ADMIN_UPDATE_BCSEVENTS,
    payload: bcsEvents
  })
}


export const adminCreateBcsEvent = ({name, startdate, enddate, isactive}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, startdate, enddate, isactive})
  try {
    const res = await axios.post('/api/bcsevents', body, config )
    dispatch({
      type:   ADMIN_CREATE_BCSEVENT,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: ADMIN_BCSEVENT_ERROR
    })
    throw err
  }
}

export const adminUpdateBcsEvent = ({name, startdate, enddate, isactive, id}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, startdate, enddate, isactive})
  try {
    const res = await axios.put(`/api/bcsevents/${id}`, body, config )
    dispatch({
      type:   ADMIN_UPDATE_BCSEVENT,
      payload: res.data
    })
    setAlert('BCS Event successfully edited','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: ADMIN_BCSEVENT_ERROR
    })
    throw err
  }
}
export const adminActivateBcsEvent = (bid) => async dispatch => {
  try {
    const res = await axios.put(`/api/bcsevents/${bid}/activate`)
    dispatch({
      type: ADMIN_ACTIVATE_BCSEVENT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ADMIN_BCSEVENT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
    throw err    
  }
}

export const adminDeactivateBcsEvent = (bid) => async dispatch => {
  try {
    const res = await axios.put(`/api/bcsevents/${bid}/deactivate`)
    dispatch({
      type: ADMIN_DEACTIVATE_BCSEVENT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ADMIN_BCSEVENT_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })  
    throw err  
  }
}

export const adminDeleteBcsEvent = (bid) => async dispatch => {
  try{
    const res = await axios.delete(`/api/bcsevents/${bid}`)
    dispatch({
      type: ADMIN_DELETE_BCSEVENT,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: ADMIN_BCSEVENT_ERROR
    })
    throw err
  }
}