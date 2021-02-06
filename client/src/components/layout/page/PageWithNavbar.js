import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import './Page.css'
import './SideNav.css'
import SubMenu from '../SubMenu'
import { Divider } from 'antd'

const PageWithNavbar = ( { auth , title, footer , children } ) => {

  footer = footer ? footer : 'Bucosu.com'
  return (
    <div className="pagecontainer">
      <div className="navigation-menu">
        <div className="sidenav">
          <SubMenu />
        </div>
      </div>
      <div className="main-content">
        <Divider>
          {title}
        </Divider>
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
