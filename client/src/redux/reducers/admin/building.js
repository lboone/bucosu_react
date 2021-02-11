import {
  ADMIN_GET_BUILDINGS,
  ADMIN_UPDATE_BUILDINGS,
  ADMIN_CREATE_BUILDING,
  ADMIN_UPDATE_BUILDING,
  ADMIN_ACTIVATE_BUILDING,
  ADMIN_DEACTIVATE_BUILDING,
  ADMIN_DELETE_BUILDING,
  ADMIN_BUILDING_ERROR,
} from '../../actions/types'

const initialState = {
  buildings: [],
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action
  
  switch (type) {
    case ADMIN_GET_BUILDINGS:
    case ADMIN_UPDATE_BUILDINGS:
      return {
        ...state,
        buildings: payload,
        loading: false,
        error: {}
      }
    case ADMIN_CREATE_BUILDING:
    case ADMIN_DEACTIVATE_BUILDING:
    case ADMIN_ACTIVATE_BUILDING:
    case ADMIN_UPDATE_BUILDING:
    case ADMIN_DELETE_BUILDING:
      return {
        ...state,
        loading: false,
        error: {}
      }
    case ADMIN_BUILDING_ERROR:
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