import {
  ADMIN_GET_COMPANYTYPES,
  ADMIN_UPDATE_COMPANYTYPES,
  ADMIN_EDIT_COMPANYTYPE,
  ADMIN_CREATE_COMPANYTYPE,
  ADMIN_DELETE_COMPANYTYPE,
  ADMIN_COMPANYTYPE_ERROR,
} from '../../actions/types'

const initialState = {
  companytypes: [],
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action
  
  switch (type) {
    case ADMIN_GET_COMPANYTYPES:
    case ADMIN_UPDATE_COMPANYTYPES:
      return {
        ...state,
        companytypes: payload,
        loading: false,
        error: {}
      }
    case ADMIN_CREATE_COMPANYTYPE:
    case ADMIN_EDIT_COMPANYTYPE:
    case ADMIN_DELETE_COMPANYTYPE:
      return {
        ...state,
        loading: false,
        error: {}
      }
    case ADMIN_COMPANYTYPE_ERROR:
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