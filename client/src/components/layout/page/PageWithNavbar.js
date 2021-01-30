import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import './Page.css'
import './SideNav.css'

const PageWithNavbar = ( { menu , title, footer , children } ) => {
  footer = footer ? footer : 'Bucosu.com'
  return (
    <div class="pagecontainer">
      <div class="header">
        <h1>{title}</h1>
        <hr/>
      </div>
      <div class="navigation-menu">
        <div class="sidenav">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#clients">Clients</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div class="main-content">
        {children}
      </div>
      <div class="footer">
        {footer}
      </div>
    </div>
  )
}

PageWithNavbar.propTypes = {
  menu: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  menu: state.menu
})

export default connect(mapStateToProps)(PageWithNavbar)
