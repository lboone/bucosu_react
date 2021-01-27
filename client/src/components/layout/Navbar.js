import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom'
import { getMenus, setMenu } from '../../actions/menu'


const Navbar = ({ auth: { isAuthenticated, loading, level }, logout,  menu, getMenus, setMenu}) => {
  useEffect(() => {
    getMenus()
  }, [getMenus])

  console.log(menu)

  const loc = useLocation().pathname

  const authLinks = (
    <ul>
        <li>
          {menu.menus &&
            menu.menus.map((menu) => {
              return (
                <Link id={menu._id} to={menu.link} className={loc === menu.link ? 'selected' : ''}>
                  <i className={`fa ${menu.icon}`}></i>{' '}
                  <span className="hide-sm">{menu.label}</span>
                </Link>
              )
            })
          }
          <a onClick={logout} href='#!'>
            <i className="fas fa-sign-out-alt"></i>{' '}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </ul>
  )
  const guestLinks = (
    <ul>
      <li>
        <Link to="/login" className={useLocation().pathname === '/login' ? 'selected' : ''}>
        <i className="fas fa-sign-in-alt"></i>{' '}
            <span className="hide-sm">Login</span>
        </Link>
      </li>
    </ul>
  )
  return (
    <nav className="navbar bg-bucosu">
      <h1>
        <Link to="/">
          <span><strong>BUCOSU</strong><span style={{color: 'lightgray', fontWeight: '100'}}>.com</span></span>
        </Link>
      </h1>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
    </nav>
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
