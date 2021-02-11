import axios from 'axios'
import {setAlert} from '../alert'

import {
  ADMIN_GET_BUILDINGS,
  ADMIN_UPDATE_BUILDINGS,
  ADMIN_CREATE_BUILDING,
  ADMIN_UPDATE_BUILDING,
  ADMIN_ACTIVATE_BUILDING,
  ADMIN_DEACTIVATE_BUILDING,
  ADMIN_DELETE_BUILDING,
  ADMIN_BUILDING_ERROR,
} from '../types'

export const adminGetBuildings = () => async dispatch => {
  try {
    const res = await axios.get('/api/buildings')
    dispatch({
      type: ADMIN_GET_BUILDINGS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ADMIN_BUILDING_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
    throw err
  }
}

export const adminUpdateBuildings = (buildings) => dispatch => {
  dispatch({
    type: ADMIN_UPDATE_BUILDINGS,
    payload: buildings
  })
}


export const adminCreateBuilding = ({company, name, address, city, state, zip, lng, lat, buildingtype="school"}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, address, city, state, zip, lng, lat, buildingtype})
  try {
    const res = await axios.post(`/api/buildings/${company}`, body, config )
    dispatch({
      type:   ADMIN_CREATE_BUILDING,
      payload: res.data
    })
    setAlert('Building added successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: ADMIN_BUILDING_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}

    })
    throw err
  }
}

export const adminUpdateBuilding = ({id, name, address, city, state, zip, lng, lat, buildingtype="school"}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, address, city, state, zip, lng, lat, buildingtype})
  try {
    const res = await axios.put(`/api/buildings/${id}`, body, config )
    dispatch({
      type:   ADMIN_UPDATE_BUILDING,
      payload: res.data
    })
    setAlert('Building updated successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: ADMIN_BUILDING_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
    throw err
  }
}



export const adminDeactivateBuilding = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/buildings/${id}/deactivate`)
    dispatch({
      type: ADMIN_DEACTIVATE_BUILDING,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ADMIN_BUILDING_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
    throw err
  } 
}

export const adminActivateBuilding = (id) => async dispatch => {
  try {
    const res = await axios.put(`/api/buildings/${id}/activate`)
    dispatch({
      type: ADMIN_ACTIVATE_BUILDING,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ADMIN_BUILDING_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
    throw err
  } 
}

export const adminDeleteBuilding = (id) => async dispatch => {
  try{
    const res = await axios.delete(`/api/buildings/${id}`)
    dispatch({
      type: ADMIN_DELETE_BUILDING,
      payload: res.data
    })
    setAlert('Building deleted successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: ADMIN_BUILDING_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
    throw err
  }
}