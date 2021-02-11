import {
  ADMIN_GET_USER_PROFILES,
  ADMIN_UPDATE_USER_PROFILES,
  ADMIN_UPDATE_USER_BY_ID,
  ADMIN_ACTIVATE_USER,
  ADMIN_DEACTIVATE_USER,
  ADMIN_DELETE_USER,
  ADMIN_USER_ERROR,
} from '../../actions/types'

const initialState = {
  profiles: [],
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case ADMIN_GET_USER_PROFILES:
    case ADMIN_UPDATE_USER_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
        error: {}
      }
    case ADMIN_DELETE_USER:
    case ADMIN_UPDATE_USER_BY_ID:
    case ADMIN_ACTIVATE_USER:
    case ADMIN_DEACTIVATE_USER:
      return {
        ...state,
        loading: false,
        error: {}
      }
    case ADMIN_USER_ERROR:
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