import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'

const LoginHistory = ( { auth } ) => {
  return (
    <PageWithNavbar title="Login History">
      <h2>Login History Page</h2>
      <ul>
        <li>User's Login History - Select User</li>
        <li>All Login History</li>
        <li>Login History For IP Addresses</li>
      </ul>
    </PageWithNavbar>
  )
}

LoginHistory.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(LoginHistory)
  