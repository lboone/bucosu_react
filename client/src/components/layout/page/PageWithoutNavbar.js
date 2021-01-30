import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import './Page.css'

const PageWithNavbar = ( { auth , title, footer, children } ) => {
  footer = footer ? footer : 'Bucosu.com'
  return (
    <div class="pagecontainer">
      <div class="header">
        <h1>{title}</h1>
        <hr/>
      </div>
      <div class="main-content-no-nav">
        {children}
      </div>
      <div class="footer">
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
