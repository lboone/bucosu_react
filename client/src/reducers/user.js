import {
  GET_USERS,
  SET_USER_ID,
  GET_USER,
  UPDATE_USER,
  USER_ERROR
} from '../actions/types'

const initialState = {
  users: [],
  userid: null,
  user: null,
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        userid: null,
        user: null,
        loading: false,
        error: {}
      }
    case SET_USER_ID:
        return {
          ...state,
          userid: payload,
          user: null,
          loading: false,
          error: {}
        }
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
        error: {}
      }
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        error: {}
      }
    case USER_ERROR:
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