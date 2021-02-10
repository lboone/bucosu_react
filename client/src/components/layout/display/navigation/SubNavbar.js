import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'
import { setSideNavMenus } from '../../../../redux/actions/menu'
import { css } from '@emotion/core'
import BarLoader from 'react-spinners/BarLoader'

const override = css`
  display: contents;
`
const SubNavbar = ( {menu, setSideNavMenus}) => {
  const location = useLocation().pathname.split('/')[2]

  useEffect(() => {
    if(menu && !menu.loading && menu.navmenus && menu.subnavmenus.length > 0  && !menu.sidenavmenus.length > 0 ){
      menu.subnavmenus.forEach((subnavmenu) => {
        const menuLoc = subnavmenu.link.split('/')[2]
        if (location === menuLoc) {
          if(subnavmenu.submenus.length > 0){
            setSideNavMenus(subnavmenu.submenus) 
          }
        }
      })
    }
  }, [menu, setSideNavMenus, location])
  
  const onClick = (index)=> {
    if(menu.subnavmenus.length > 0 && menu.subnavmenus[index] && menu.subnavmenus[index].submenus.length > 0){
      setSideNavMenus(menu.subnavmenus[index].submenus)
    } else {
      setSideNavMenus([])
    }
  }

  const showSpinner = location && location  !== '/login'
  const menuLoaded = menu && !menu.loading && menu.subnavmenus && (menu.subnavmenus.length > 0)
  return (
    <Fragment>
      {menuLoaded ? 
        (
          <nav className="navbar menubar bg-bucosu">
          <ul>
            {menu.subnavmenus &&
              menu.subnavmenus.map((subnavmenu, index) => {
                //console.log({menu:{'loc.split': loc.split('/')[2], link: subnavmenu.link.split('/')[2]}})
                return (
                  <li key={subnavmenu._id}>
                    <Link 
                      to={subnavmenu.link} 
                      onClick={(e)=>onClick(index)}
                      className={location === subnavmenu.link.split('/')[2] ? 'selected' : ''}
                    >
                      <i 
                        className={`fa ${subnavmenu.icon}`}
                        title={subnavmenu.label}
                      ></i>{' '}
                      <span className="hide-md">{subnavmenu.label}</span>
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

SubNavbar.propTypes = {
  setSideNavMenus: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  menu: state.menu,
})

export default connect(mapStateToProps, { setSideNavMenus })(SubNavbar)
