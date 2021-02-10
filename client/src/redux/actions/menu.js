import axios from 'axios'
//import {setAlert} from './alert'

import {
  FETCH_NAV_MENUS,
  SET_SUBNAV_MENUS,
  SET_SIDENAV_MENUS,
  MENU_ERROR
} from './types'

export const fetchNavMenus = () => async dispatch => {
  try {
    const res = await axios.get('/api/menus')
    dispatch({
      type: FETCH_NAV_MENUS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: MENU_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    })    
  }
}

export const setSubNavMenus = (subNavMenus) => dispatch => {
  dispatch({
    type: SET_SUBNAV_MENUS,
    payload: subNavMenus
  })
}

export const setSideNavMenus = (sideNavMenus) => dispatch => {
  dispatch({
    type: SET_SIDENAV_MENUS,
    payload: sideNavMenus
  })
}