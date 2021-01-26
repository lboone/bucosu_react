import {
  GET_PROFILE,
  PROFILE_SUCCESS,
  PROFILE_ERROR
} from '../actions/types'

const initialState = {
  profile: null,
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case PROFILE_ERROR:
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