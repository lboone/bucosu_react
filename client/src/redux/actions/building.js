import axios from 'axios'
import { setAlert } from './alert'

import {
  GET_BUILDINGS,
  GET_BUILDING,
  CREATE_BUILDING,
  UPDATE_BUILDING,
  DEACTIVATE_BUILDING,
  ACTIVATE_BUILDING,
  DELETE_BUILDING,
  BUILDING_ERROR
} from './types'


export const getBuildings = () => async dispatch => {
  try {
    const res = await axios.get('/api/buildings')
    dispatch({
      type: GET_BUILDINGS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BUILDING_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
    throw err
  }
}

export const getBuilding = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/buildings/${id}`)
    dispatch({
      type: GET_BUILDING,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BUILDING_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
    throw err
  }
}


export const createBuilding = ({company, name, address, city, state, zip, lng, lat, buildingtype="school"}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, address, city, state, zip, lng, lat, buildingtype})
  try {
    const res = await axios.post(`/api/buildings/${company}`, body, config )
    dispatch({
      type:   CREATE_BUILDING,
      payload: res.data
    })
    setAlert('Building added successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: BUILDING_ERROR
    })
    throw err
  }
}

export const updateBuilding = ({id, name, address, city, state, zip, lng, lat, buildingtype="school"}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, address, city, state, zip, lng, lat, buildingtype})
  try {
    const res = await axios.put(`/api/buildings/${id}`, body, config )
    dispatch({
      type:   UPDATE_BUILDING,
      payload: res.data
    })
    setAlert('Building updated successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: BUILDING_ERROR
    })
    throw err
  }
}



export const deactivateBuilding = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/buildings/${id}/deactivate`)
    dispatch({
      type: DEACTIVATE_BUILDING,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BUILDING_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
    throw err
  } 
}

export const activateBuilding = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/buildings/${id}/activate`)
    dispatch({
      type: ACTIVATE_BUILDING,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: BUILDING_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
    throw err
  } 
}

export const deleteBuilding = (id) => async dispatch => {
  try{
    const res = await axios.delete(`/api/buildings/${id}`)
    dispatch({
      type: DELETE_BUILDING,
      payload: res.data
    })
    setAlert('Building deleted successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: BUILDING_ERROR
    })
    throw err
  }
}