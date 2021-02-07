import {
  GET_BUILDINGS,
  GET_BUILDING,
  CREATE_BUILDING,
  UPDATE_BUILDING,
  DEACTIVATE_BUILDING,
  ACTIVATE_BUILDING,
  DELETE_BUILDING,
  BUILDING_ERROR
} from '../actions/types'

const initialState = {
  buildings: [],
  building: null,
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action
  
  switch (type) {
    case GET_BUILDINGS:
      return {
        ...state,
        buildings: payload,
        building: null,
        loading: false,
        error: {}
      }
    case GET_BUILDING:
    case CREATE_BUILDING:
    case DEACTIVATE_BUILDING:
    case ACTIVATE_BUILDING:
    case UPDATE_BUILDING:
      return {
        ...state,
        building: payload,
        loading: false,
        error: {}
      }
    case DELETE_BUILDING:
      return {
        ...state,
        building: null,
        loading: false,
        error: {}
      }
    case BUILDING_ERROR:
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