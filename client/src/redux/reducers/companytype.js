import {
  GET_COMPANYTYPES,
  GET_COMPANYTYPE,
  CREATE_COMPANYTYPE,
  DELETE_COMPANYTYPE,
  COMPANYTYPE_ERROR,
} from '../actions/types'

const initialState = {
  companytypes: [],
  companytype: null,
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action
  
  switch (type) {
    case GET_COMPANYTYPES:
      return {
        ...state,
        companytypes: payload,
        companytype: null,
        loading: false,
        error: {}
      }
    case GET_COMPANYTYPE:
    case CREATE_COMPANYTYPE:
      return {
        ...state,
        companytype: payload,
        loading: false,
        error: {}
      }
    case DELETE_COMPANYTYPE:
      return {
        ...state,
        companytype: null,
        loading: false,
        error: {}
      }
    case COMPANYTYPE_ERROR:
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