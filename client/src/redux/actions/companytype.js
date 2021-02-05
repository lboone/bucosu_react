import axios from 'axios'
import { setAlert } from './alert'

import {
  GET_COMPANYTYPES,
  GET_COMPANYTYPE,
  CREATE_COMPANYTYPE,
  DELETE_COMPANYTYPE,
  COMPANYTYPE_ERROR
} from './types'


export const getCompanyTypes = () => async dispatch => {
  try {
    const res = await axios.get('/api/companytypes')
    dispatch({
      type: GET_COMPANYTYPES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COMPANYTYPE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
    throw err
  }
}

export const getCompanyType = (ctid) => async dispatch => {
  try {
    const res = await axios.get(`/api/companytypes/${ctid}`)
    dispatch({
      type: GET_COMPANYTYPE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COMPANYTYPE_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })
    throw err
  }
}

export const createCompany = ({name, description, level}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({name, description, level})
  try {
    const res = await axios.post(`/api/companytypes`, body, config )
    dispatch({
      type:   CREATE_COMPANYTYPE,
      payload: res.data
    })
    setAlert('Company Type added successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: COMPANYTYPE_ERROR
    })
    throw err
  }
}

export const deleteCompanyType = (ctid) => async dispatch => {
  try{
    const res = await axios.delete(`/api/companytypes/${ctid}`)
    dispatch({
      type: DELETE_COMPANYTYPE,
      payload: res.data
    })
    setAlert('Company Type deleted successfully','success',3000)
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger', 6000)))
    }
    dispatch({
      type: COMPANYTYPE_ERROR
    })
    throw err
  }
}