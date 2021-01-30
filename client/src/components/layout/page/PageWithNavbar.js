import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import './Page.css'
import './SideNav.css'
import SubMenu from '../SubMenu'

const PageWithNavbar = ( { auth , title, footer , children } ) => {
  footer = footer ? footer : 'Bucosu.com'
  return (
    <div className="pagecontainer">
      <div className="header">
        <h1>{title}</h1>
        <hr/>
      </div>
      <div className="navigation-menu">
        <div className="sidenav">
          <SubMenu />
        </div>
      </div>
      <div className="main-content">
        {children}
      </div>
      <div className="footer">
        {footer}
      </div>
    </div>
  )
}

PageWithNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PageWithNavbar)
