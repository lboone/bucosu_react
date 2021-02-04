import axios from 'axios'
//import {setAlert} from './alert'

import {
  GET_MENUS,
  SET_MENU,
  GET_SUBMENUS,
  SET_SUBMENU,
  GET_SUBSUBMENUS,
  SET_SUBSUBMENU,
  MENU_ERROR
} from './types'


export const getMenus = () => async dispatch => {
  try {
    const res = await axios.get('/api/menus')
    dispatch({
      type: GET_MENUS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: MENU_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const setMenu = (menu) => dispatch => {
  dispatch({
    type: SET_MENU,
    payload: menu
  })
}

export const getSubMenus = (menId) => async dispatch => {
  try {
    const res = await axios.get(`/api/menus/${menId}/submenus`)
    dispatch({
      type: GET_SUBMENUS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: MENU_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const setSubMenu = (menu) => dispatch => {
  dispatch({
    type: SET_SUBMENU,
    payload: menu
  })
}

export const getSubSubMenus = (menId) => async dispatch => {
  try {
    const res = await axios.get(`/api/menus/${menId}/submenus`)
    dispatch({
      type: GET_SUBSUBMENUS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: MENU_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const setSubSubMenu = (menu) => dispatch => {
  dispatch({
    type: SET_SUBSUBMENU,
    payload: menu
  })
}