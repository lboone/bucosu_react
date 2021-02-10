import {
  FETCH_NAV_MENUS,
  SET_SUBNAV_MENUS,
  SET_SIDENAV_MENUS,
  MENU_ERROR,
} from '../actions/types'

const initialState = {
  navmenus: [],
  subnavmenus: [],
  sidenavmenus: [],
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action
  switch (type) {
    case FETCH_NAV_MENUS:
      return {
        ...state,
        navmenus: payload,
        subnavmenus: [],
        sidenavmenus: [],
        loading: false,
        error: {}
      }
    case SET_SUBNAV_MENUS:
      return {
        ...state,
        subnavmenus: payload,
        sidenavmenus: [],
        loading: false,
        error: {}
      }
    case SET_SIDENAV_MENUS:
      return {
        ...state,
        sidenavmenus: payload,
        loading: false,
        error: {}
      }     
    case MENU_ERROR:
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