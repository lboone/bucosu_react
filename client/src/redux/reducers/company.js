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
  COMPANY_ERROR,
} from '../actions/types'

const initialState = {
  companies: [],
  companyObject: null,
  company: null,
  usertypes: [],
  usertype: null,
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action
  
  switch (type) {
    case GET_COMPANIES:
      return {
        ...state,
        companies: payload,
        companyObject: null,
        company: null,
        usertypes: [],
        usertype: null,
        loading: false,
        error: {}
      }
    case GET_COMPANY:
    case CREATE_COMPANY:
    case DEACTIVATE_COMPANY:
    case ACTIVATE_COMPANY:
      return {
        ...state,
        companyObject: payload,
        company: null,
        usertypes: null,
        usertype: null,
        loading: false,
        error: {}
      }
    case SET_COMPANY:
      return {
        ...state,
        company: payload,
        usertypes: null,
        usertype: null,
        loading: false,
        error: {}
      }
    case GET_COMPANY_USERTYPES:
      return {
        ...state,
        usertypes: payload,
        usertype: null,
        loading: false,
        error: {}
      }
    case SET_COMPANY_USERTYPE:
      return {
        ...state,
        usertype: payload,
        loading: false,
        error: {}
      }
    case DELETE_COMPANY:
      return {
        ...state,
        companyObject: null,
        loading: false,
        error: {}
      }
    case COMPANY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state
  }
}

export default reduce