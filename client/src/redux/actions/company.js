import axios from 'axios'
//import {setAlert} from './alert'

import {
  GET_COMPANIES,
  SET_COMPANY,
  GET_COMPANY_USERTYPES,
  SET_COMPANY_USERTYPE,
  COMPANY_ERROR
} from './types'


export const getCompanies = () => async dispatch => {
  try {
    const res = await axios.get('/api/companies/relationships')
    dispatch({
      type: GET_COMPANIES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COMPANY_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
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