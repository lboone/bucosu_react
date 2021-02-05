import axios from 'axios'
import { setAlert } from './alert'
//import {setAlert} from './alert'

import {
  GET_COMPANIES,
  GET_COMPANY,
  CREATE_COMPANY,
  SET_COMPANY,
  GET_COMPANY_USERTYPES,
  SET_COMPANY_USERTYPE,
  DEACTIVATE_COMPANY,
  ACTIVATE_COMPANY,
  DELETE_COMPANY,
  COMPANY_ERROR
} from './types'


export const getCompanies = () => async dispatch => {
  try {
    const res = await axios.get('/api/companies')
    dispatch({
      type: GET_COMPANIES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
    throw err
  }
}

export const getCompany = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/companies/${id}`)
    dispatch({
      type: GET_COMPANY,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
    throw err
  }
}

export const createCompany = ({companyTypeID, name, address, city, state, zip, phone, website, logo}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, address, city, state, zip, phone, website, logo})
  try {
    const res = await axios.post(`/api/companies/companytype/${companyTypeID}`, body, config )
    dispatch({
      type:   CREATE_COMPANY,
      payload: res.data
    })
    setAlert('Company added successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: COMPANY_ERROR
    })
    throw err
  }
}

export const setCompany = (coId) => dispatch => {
  dispatch({
    type: SET_COMPANY,
    payload: coId
  })
}

export const getCompanyUserTypes = (coId) => async dispatch => {
  try {
    const res = await axios.get(`/api/companies/${coId}/usertypes`)
    dispatch({
      type: GET_COMPANY_USERTYPES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const setCompanyUserType = (utId) => dispatch => {
  dispatch({
    type: SET_COMPANY_USERTYPE,
    payload: utId
  })
}

export const deactivateCompany = (cid) => async dispatch => {
  try {
    const res = await axios.put(`/api/companies/${cid}/deactivate`)
    dispatch({
      type: DEACTIVATE_COMPANY,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
    throw err
  } 
}

export const activateCompany = (cid) => async dispatch => {
  try {
    const res = await axios.put(`/api/companies/${cid}/activate`)
    dispatch({
      type: ACTIVATE_COMPANY,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
    throw err
  } 
}

export const deleteCompany = (cid) => async dispatch => {
  try{
    const res = await axios.delete(`/api/companies/${cid}`)
    dispatch({
      type: DELETE_COMPANY,
      payload: res.data
    })
    setAlert('Company deleted successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: COMPANY_ERROR
    })
    throw err
  }
}