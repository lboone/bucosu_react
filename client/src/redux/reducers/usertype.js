import {
  GET_USERTYPES,
  GET_USERTYPE,
  CREATE_USERTYPE,
  DELETE_USERTYPE,
  USERTYPE_ERROR,
} from '../actions/types'

const initialState = {
  usertypes: [],
  usertype: null,
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action
  
  switch (type) {
    case GET_USERTYPES:
      return {
        ...state,
        usertypes: payload,
        usertype: null,
        loading: false,
        error: {}
      }
    case GET_USERTYPE:
    case CREATE_USERTYPE:
      return {
        ...state,
        usertype: payload,
        loading: false,
        error: {}
      }
    case DELETE_USERTYPE:
      return {
        ...state,
        usertype: null,
        loading: false,
        error: {}
      }
    case USERTYPE_ERROR:
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