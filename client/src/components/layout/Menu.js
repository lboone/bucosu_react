import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'
import { getSubMenus, setSubMenu } from '../../actions/menu'


const Menu = ( {menu, getSubMenus, setSubMenu}) => {
  const loc = useLocation().pathname
  useEffect(() => {
    if (menu.menu && !menu.loading && !menu.submenus){
      getSubMenus(menu.menu)
    }
    if(menu.submenus && !menu.loading && !menu.submenu){
      menu.submenus.forEach((submenu) => {
          if (loc === submenu.link) {
            setSubMenu(submenu._id) 
          }
      })
    }
  }, [getSubMenus, menu, setSubMenu, loc])
  
  const onClick = (subMenuId)=> {
    setSubMenu(subMenuId)
  }


  const menuLoaded = menu && !menu.loading && menu.submenus && (menu.submenus.length > 0)
  return (
    <Fragment>
      {menuLoaded && 
        (
          <nav className="navbar menubar bg-bucosu-light">
          <ul>
            {menu.submenus &&
              menu.submenus.map((submenu) => {
                return (
                  <li key={submenu._id}>
                    <Link 
                      to={submenu.link} 
                      onClick={(e)=>onClick(submenu._id)}
                      className={loc === submenu.link ? 'selected' : ''}
                    >
                      <i 
                        className={`fa ${submenu.icon}`}
                        title={submenu.label}
                      ></i>{' '}
                      <span className="hide-sm">{submenu.label}</span>
                    </Link>
                  </li>
                )
              }
            )
          }
          </ul>
        </nav>
        )
      }
    </Fragment>
  )
}

Menu.propTypes = {
  getSubMenus: PropTypes.func.isRequired,
  setSubMenu: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  menu: state.menu,
})

export default connect(mapStateToProps, { getSubMenus, setSubMenu })(Menu)