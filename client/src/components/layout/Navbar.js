import React, { Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'
import { useLocation } from 'react-router-dom'
import { getMenus, setMenu } from '../../actions/menu'
import Menu from './Menu'

const Navbar = ({ auth: { isAuthenticated, loading, level }, logout,  menu, getMenus, setMenu}) => {
  const loc = useLocation().pathname
  
  useEffect(() => {
    if(menu && !menu.loading && !menu.menus){
      getMenus()
    }
    if(menu.menus && !menu.loading && !menu.menu){
      menu.menus.forEach((menu) => {
        const newLoc = loc.split('/')
          if ('/'+newLoc[1] === menu.link) {
            setMenu(menu._id) 
          }
      })
    }
  }, [getMenus, menu, setMenu, loc])
  
  const onClick = (menuId)=> {
    setMenu(menuId)
  }
  
  const authLinks = (
    <ul>
      {menu.menus &&
        menu.menus.map((menu) => {
          return (
            <li key={menu._id}>
              <Link 
                to={menu.link} 
                onClick={(e)=>onClick(menu._id)}
                className={`/${loc.split('/')[1]}` === menu.link ? 'selected' : ''}
              >
                <i 
                  className={`fa ${menu.icon}`}
                  title={menu.label}
                ></i>{' '}
                <span className="hide-sm">{menu.label}</span>
              </Link>
            </li>
          )
        })
      }
      <li key={'0304030'}>
        <a onClick={logout} href='/login'>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
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
      <nav className="navbar bg-bucosu">
        <h1>
          <Link to="/">
            <span><strong>BUCOSU</strong><span style={{color: 'lightgray', fontWeight: '100'}}>.com</span></span>
          </Link>
        </h1>
        { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
      </nav>
      <Menu/>
    </Fragment>
  )
}

Navbar.propTypes = {
  getMenus: PropTypes.func.isRequired,
  setMenu: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  menu: state.menu,
  auth: state.auth

})

export default connect(mapStateToProps, { logout, getMenus, setMenu })(Navbar)
