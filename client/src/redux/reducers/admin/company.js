import {
  ADMIN_GET_COMPANIES,
  ADMIN_UPDATE_COMPANIES,
  ADMIN_CREATE_COMPANY,
  ADMIN_UPDATE_COMPANY,
  ADMIN_ACTIVATE_COMPANY,
  ADMIN_DEACTIVATE_COMPANY,
  ADMIN_DELETE_COMPANY,
  ADMIN_COMPANY_ERROR,
} from '../../actions/types'

const initialState = {
  companies: [],
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case ADMIN_GET_COMPANIES:
    case ADMIN_UPDATE_COMPANIES:
      return {
        ...state,
        companies: payload,
        loading: false,
        error: {}
      }
    case ADMIN_CREATE_COMPANY:
    case ADMIN_UPDATE_COMPANY:
    case ADMIN_ACTIVATE_COMPANY:
    case ADMIN_DEACTIVATE_COMPANY:
    case ADMIN_DELETE_COMPANY:
      return {
        ...state,
        loading: false,
        error: {}
      }
    case ADMIN_COMPANY_ERROR:
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