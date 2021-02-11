import {
  ADMIN_GET_BCSEVENTS,
  ADMIN_UPDATE_BCSEVENTS,
  ADMIN_CREATE_BCSEVENT,
  ADMIN_UPDATE_BCSEVENT,
  ADMIN_ACTIVATE_BCSEVENT,
  ADMIN_DEACTIVATE_BCSEVENT,
  ADMIN_DELETE_BCSEVENT,
  ADMIN_BCSEVENT_ERROR,
} from '../../actions/types'

const initialState = {
  bcsevents: [],
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case ADMIN_GET_BCSEVENTS:
    case ADMIN_UPDATE_BCSEVENTS:
      return {
        ...state,
        bcsevents: payload,
        loading: false,
        error: {}
      }
    case ADMIN_CREATE_BCSEVENT:
    case ADMIN_UPDATE_BCSEVENT:
    case ADMIN_ACTIVATE_BCSEVENT:
    case ADMIN_DEACTIVATE_BCSEVENT:
    case ADMIN_DELETE_BCSEVENT:
      return {
        ...state,
        loading: false,
        error: {}
      }
    case ADMIN_BCSEVENT_ERROR:
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