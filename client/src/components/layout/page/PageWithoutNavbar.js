import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import './Page.css'

const PageWithNavbar = ( { auth , title, footer, children } ) => {
  footer = footer ? footer : 'Bucosu.com'
  return (
    <div className="pagecontainer">
      <div className="header">
        <h1>{title}</h1>
        <hr/>
      </div>
      <div className="main-content-no-nav">
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
