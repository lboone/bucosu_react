import React, { Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../../../../redux/actions/auth'
import { useLocation } from 'react-router-dom'
import { fetchNavMenus, setSubNavMenus } from '../../../../redux/actions/menu'
import SubNavbar from './SubNavbar'

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout,  menu,  fetchNavMenus, setSubNavMenus}) => {
  const location = useLocation().pathname.split('/')[1]
  useEffect(() => {
    if(menu && !menu.navmenus.length > 0 && isAuthenticated){
      fetchNavMenus()
    }
  },[menu, fetchNavMenus, isAuthenticated])

  useEffect(()=>{
    if(menu && !menu.loading && menu.navmenus && !menu.subnavmenus.length > 0){
      menu.navmenus.forEach((navmenu) => {
        const menuLoc = navmenu.link.split('/')[1]
          if (location === menuLoc) {
            setSubNavMenus(navmenu.submenus) 
          }
      })
    }
  },[menu, setSubNavMenus, location])
  
  const onClick = (index)=> {
    if(menu && menu.navmenus && menu.navmenus[index] && menu.navmenus[index].submenus.length > 0)
    setSubNavMenus(menu.navmenus[index].submenus)
  }
  
  const authLinks = (
    <ul>
      {menu.navmenus &&
        menu.navmenus.map((navmenu, index) => {
          return (
            <li key={navmenu._id}>
              <Link 
                to={navmenu.link} 
                onClick={(e)=>onClick(index)}
                className={location === navmenu.link.split('/')[1] ? 'selected' : ''}
              >
                <i 
                  className={`fa ${navmenu.icon}`}
                  title={navmenu.label}
                ></i>{' '}
                <span className="hide-md">{navmenu.label}</span>
              </Link>
            </li>
          )
        })
      }
      <li key={'0304030'}>
        <a onClick={logout} href='/login'>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout <span style={{color: '#37bc9b'}}>{user && ` - ${user.username.toLowerCase()}`}</span></span>
        </a>
      </li>
    </ul>
  )
  const guestLinks = (
    <ul>
      <li key={'3984903'}>
        <Link to="/login" className={useLocation().pathname === '/login' ? 'selected' : ''}>
        <i className="fas fa-sign-in-alt"></i>{' '}
            <span className="hide-sm">Login</span>
        </Link>
      </li>
    </ul>
  )
  return (
    <Fragment>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/" onClick={(e)=>onClick(0)}>
            <span><strong>BUCOSU</strong><span style={{color: 'lightgray', fontWeight: '100'}}>.com</span></span>
          </Link>
        </h1>
        { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
      </nav>
      <SubNavbar/>
    </Fragment>
  )
}

Navbar.propTypes = {
  fetchNavMenus: PropTypes.func.isRequired,
  setSubNavMenus: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  menu: state.menu,
  auth: state.auth

})

export default connect(mapStateToProps, { logout, fetchNavMenus, setSubNavMenus })(Navbar)
