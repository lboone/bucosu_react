import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom'
import { ACCESSTYPES } from '../../utils/constants'

const Navbar = ({ auth: { isAuthenticated, loading, level }, logout}) => {
  const {COMPANY, USER } = ACCESSTYPES;
  const loc = useLocation().pathname
  const hasAccess = (level && (level.company <= COMPANY.SCHOOLDISTRICT && level.user <= USER.READER))
  const authLinks = (
    <ul>
        <li>
          {hasAccess && 
          (
            <Link to="/dashboard" className={loc === '/dashboard' ? 'selected' : ''}>
              <i className="fa fa-chart-bar"></i>{' '}
              <span className="hide-sm">Dashboard</span>
            </Link>
          )
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
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
