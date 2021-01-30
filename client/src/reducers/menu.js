import {
  GET_MENUS,
  SET_MENU,
  GET_SUBMENUS,
  SET_SUBMENU,
  GET_SUBSUBMENUS,
  SET_SUBSUBMENU,
  MENU_ERROR,
} from '../actions/types'

const initialState = {
  menus: [],
  menu: null,
  submenus: [],
  submenu: null,
  subsubmenus: [],
  subsubmenu: null,
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
        subsubmenus: [],
        subsubmenu: null,
        loading: false,
        error: {}
      }
    case SET_MENU:
      return {
        ...state,
        menu: payload,
        submenus: null,
        submenu: null,
        subsubmenus: [],
        subsubmenu: null,
        loading: false,
        error: {}
      }
    case GET_SUBMENUS:
      return {
        ...state,
        submenus: payload,
        submenu: null,
        subsubmenus: [],
        subsubmenu: null,
        loading: false,
        error: {}
      }
    case SET_SUBMENU:
      return {
        ...state,
        submenu: payload,
        subsubmenus: [],
        subsubmenu: null,
        loading: false,
        error: {}
      }
    case GET_SUBSUBMENUS:
      return {
        ...state,
        subsubmenus: payload,
        subsubmenu: null,
        loading: false,
        error: {}
      }
    case SET_SUBSUBMENU:
      return {
        ...state,
        subsubmenu: payload,
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