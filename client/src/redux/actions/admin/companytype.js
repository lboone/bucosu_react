import axios from 'axios'
import { setAlert } from '../alert'

import {
  ADMIN_GET_COMPANYTYPES,
  ADMIN_UPDATE_COMPANYTYPES,
  ADMIN_EDIT_COMPANYTYPE,
  ADMIN_CREATE_COMPANYTYPE,
  ADMIN_DELETE_COMPANYTYPE,
  ADMIN_COMPANYTYPE_ERROR,
} from '../types'


export const adminGetCompanyTypes = () => async dispatch => {
  try {
    const res = await axios.get('/api/companytypes')
    dispatch({
      type: ADMIN_GET_COMPANYTYPES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ADMIN_COMPANYTYPE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
    throw err
  }
}

export const adminUpdateCompanyTypes = (companyTypes) => async dispatch => {
    dispatch({
      type: ADMIN_UPDATE_COMPANYTYPES,
      payload: companyTypes
    })
}

export const adminEditCompanyType = ({name, description, level, id}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, description, level})
  try {
    const res = await axios.put(`/api/companytypes/${id}`, body, config )
    dispatch({
      type:   ADMIN_EDIT_COMPANYTYPE,
      payload: res.data
    })
    setAlert('Company Type successfully edited','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: ADMIN_COMPANYTYPE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
    throw err
  }
}

export const adminCreateCompanyType = ({name, description, level}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, description, level})
  try {
    const res = await axios.post(`/api/companytypes`, body, config )
    dispatch({
      type:   ADMIN_CREATE_COMPANYTYPE,
      payload: res.data
    })
    setAlert('Company Type added successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: ADMIN_COMPANYTYPE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
    throw err
  }
}

export const adminDeleteCompanyType = (ctid) => async dispatch => {
  try{
    const res = await axios.delete(`/api/companytypes/${ctid}`)
    dispatch({
      type: ADMIN_DELETE_COMPANYTYPE,
      ADMIN_payload: res.data
    })
    setAlert('Company Type deleted successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: ADMIN_COMPANYTYPE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
    throw err
  }
}