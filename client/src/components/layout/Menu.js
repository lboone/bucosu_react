import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'
import { getSubMenus, setSubMenu } from '../../redux/actions/menu'
import { css } from '@emotion/core'
import BarLoader from 'react-spinners/BarLoader'

const override = css`
  display: contents;
`
const Menu = ( {menu, getSubMenus, setSubMenu}) => {
  const loc = useLocation().pathname
  useEffect(() => {
    if (menu.menu && !menu.loading && !menu.submenus){
      getSubMenus(menu.menu)
    }
    if(menu.submenus && !menu.loading && !menu.submenu){
      menu.submenus.forEach((submenu) => {
          if (loc.split('/')[2] === submenu.link.split('/')[2]) {
            setSubMenu(submenu._id) 
          }
      })
    }
  }, [getSubMenus, menu, setSubMenu, loc])
  
  const onClick = (subMenuId)=> {
    setSubMenu(subMenuId)
  }

  const showSpinner = loc !== '/login'
  const menuLoaded = menu && !menu.loading && menu.submenus && (menu.submenus.length > 0)
  return (
    <Fragment>
      {menuLoaded ? 
        (
          <nav className="navbar menubar bg-bucosu">
          <ul>
            {menu.submenus &&
              menu.submenus.map((submenu) => {
                //console.log({menu:{'loc.split': loc.split('/')[2], link: submenu.link.split('/')[2]}})
                return (
                  <li key={submenu._id}>
                    <Link 
                      to={submenu.link} 
                      onClick={(e)=>onClick(submenu._id)}
                      className={loc.split('/')[2] === submenu.link.split('/')[2] ? 'selected' : ''}
                    >
                      <i 
                        className={`fa ${submenu.icon}`}
                        title={submenu.label}
                      ></i>{' '}
                      <span className="hide-md">{submenu.label}</span>
                    </Link>
                  </li>
                )
              }
            )
          }
          </ul>
        </nav>
        ) : (
            showSpinner && <BarLoader color={'#37bc9b'} loading={true} css={override} width={200} size={5} />
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
