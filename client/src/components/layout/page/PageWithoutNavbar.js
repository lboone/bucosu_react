import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import './Page.css'
import './NoNav.css'
import { Divider } from 'antd'
import Alerts from '../feedback/Alerts'

const PageWithNavbar = ( { auth , title, footer, children } ) => {
  footer = footer ? footer : 'Bucosu.com'
  return (
    <div className="pagecontainer">
      <div className="main-content-no-nav">
        <Alerts />
      <Divider>{title}</Divider>
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
