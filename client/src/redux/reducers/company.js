import {
  GET_COMPANIES,
  GET_COMPANY_RELATIONSHIPS,
  GET_COMPANY,
  CREATE_COMPANY,
  UPDATE_COMPANY,
  GET_COMPANY_USERTYPES,
  DEACTIVATE_COMPANY,
  ACTIVATE_COMPANY,
  DELETE_COMPANY,
  COMPANY_ERROR,
} from '../actions/types'

const initialState = {
  companies: [],
  company: null,
  usertypes: [],
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action
  
  switch (type) {
    case GET_COMPANIES:
    case GET_COMPANY_RELATIONSHIPS:
      return {
        ...state,
        companies: payload,
        company: null,
        usertypes: [],
        loading: false,
        error: {}
      }
    case GET_COMPANY:
    case CREATE_COMPANY:
    case DEACTIVATE_COMPANY:
    case ACTIVATE_COMPANY:
    case UPDATE_COMPANY:
      return {
        ...state,
        company: payload,
        usertypes: null,
        loading: false,
        error: {}
      }
    case GET_COMPANY_USERTYPES:
      return {
        ...state,
        usertypes: payload,
        loading: false,
        error: {}
      }
    case DELETE_COMPANY:
      return {
        ...state,
        company: null,
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