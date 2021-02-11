import axios from 'axios'
import {setAlert} from '../alert'

import {
  ADMIN_GET_COMPANIES,
  ADMIN_UPDATE_COMPANIES,
  ADMIN_CREATE_COMPANY,
  ADMIN_UPDATE_COMPANY,
  ADMIN_ACTIVATE_COMPANY,
  ADMIN_DEACTIVATE_COMPANY,
  ADMIN_DELETE_COMPANY,
  ADMIN_COMPANY_ERROR,
} from '../types'


export const adminGetCompanies = () => async dispatch => {
  try {
    const res = await axios.get('/api/companies')
    dispatch({
      type: ADMIN_GET_COMPANIES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ADMIN_COMPANY_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })   
    throw err 
  }
}

export const adminUpdateCompanies = (companies) => dispatch => {
  dispatch({
    type: ADMIN_UPDATE_COMPANIES,
    payload: companies
  })
}

export const adminCreateCompany = ({companyTypeID, name, address, city, state, zip, phone, website, logo}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, address, city, state, zip, phone, website, logo})
  try {
    const res = await axios.post(`/api/companies/companytype/${companyTypeID}`, body, config )
    dispatch({
      type:   ADMIN_CREATE_COMPANY,
      payload: res.data
    })
    setAlert('Company added successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: ADMIN_COMPANY_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
    throw err
  }
}

export const adminUpdateCompany = ({companyTypeID, name, address, city, state, zip, phone, website, logo, id}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, address, city, state, zip, phone, website, logo})
  try {
    const res = await axios.put(`/api/companies/${id}`, body, config )
    dispatch({
      type:   ADMIN_UPDATE_COMPANY,
      payload: res.data
    })
    setAlert('Company updated successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: ADMIN_COMPANY_ERROR
    })
    throw err
  }
}

export const adminActivateCompany = (bid) => async dispatch => {
  try {
    const res = await axios.put(`/api/companies/${bid}/activate`)
    dispatch({
      type: ADMIN_ACTIVATE_COMPANY,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ADMIN_COMPANY_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
    throw err    
  }
}

export const adminDeactivateCompany = (bid) => async dispatch => {
  try {
    const res = await axios.put(`/api/companies/${bid}/deactivate`)
    dispatch({
      type: ADMIN_DEACTIVATE_COMPANY,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ADMIN_COMPANY_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })  
    throw err  
  }
}

export const adminDeleteCompany = (bid) => async dispatch => {
  try{
    const res = await axios.delete(`/api/companies/${bid}`)
    dispatch({
      type: ADMIN_DELETE_COMPANY,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: ADMIN_COMPANY_ERROR
    })
    throw err
  }
}