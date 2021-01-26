import {
  GET_COMPANIES,
  SET_COMPANY,
  GET_COMPANY_USERTYPES,
  SET_COMPANY_USERTYPE,
  COMPANY_ERROR,
} from '../actions/types'

const initialState = {
  companies: [],
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
        company: null,
        usertypes: [],
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