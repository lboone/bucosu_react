import {
  GET_MENUS,
  SET_MENU,
  GET_SUBMENUS,
  SET_SUBMENU,
  MENU_ERROR,
} from '../actions/types'

const initialState = {
  menus: [],
  menu: null,
  submenus: [],
  submenu: null,
  loading: true,
  error: {}
}

const reduce = function(state = initialState, action) {
  const {type, payload} = action
  
  switch (type) {
    case GET_MENUS:
      return {
        ...state,
        menus: payload,
        menu: null,
        submenus: [],
        submenu: null,
        loading: false,
        error: {}
      }
    case SET_MENU:
      return {
        ...state,
        menu: payload,
        submenus: null,
        submenu: null,
        loading: false,
        error: {}
      }
    case GET_SUBMENUS:
      return {
        ...state,
        submenus: payload,
        submenu: null,
        loading: false,
        error: {}
      }
    case SET_SUBMENU:
      return {
        ...state,
        submenu: payload,
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