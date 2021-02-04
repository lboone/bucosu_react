import {
  GET_BCSEVENTS,
  GET_BCSEVENT,
  CREATE_BCSEVENT,
  EDIT_BCSEVENT,
  ACTIVATE_BCSEVENT,
  DEACTIVATE_BCSEVENT,
  DELETE_BCSEVENT,
  BCSEVENT_ERROR,
} from '../actions/types'

const initialState = {
  events: [],
  event: null,
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action
  
  switch (type) {
    case GET_BCSEVENTS:
      return {
        ...state,
        events:payload,
        event: null,
        loading: false,
        error: {}
      }
    case GET_BCSEVENT:
    case CREATE_BCSEVENT:
    case EDIT_BCSEVENT:
    case ACTIVATE_BCSEVENT:
    case DEACTIVATE_BCSEVENT:
      return {
        ...state,
        event: payload,
        loading: false,
        error: {}
      }
    case DELETE_BCSEVENT:
      return {
        ...state,
        event: null,
        loading: false,
        error: {}
      }
    case BCSEVENT_ERROR:
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