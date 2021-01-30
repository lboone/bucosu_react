import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavbar from '../layout/page/PageWithoutNavbar'

const UserData = ( { auth } ) => {
  return (
    <PageWithoutNavbar title="User Data">
      <h2>User Data Page</h2>
      <ul>
        <li>User Types</li>
        <li>User Login History - pick user then see their login history</li>
        <li>All Login History - see flat list of user loging history</li>
        <li>See IP address login history</li>
        <li>User Settings - pick user then see their login history</li>
      </ul>
    </PageWithoutNavbar>
  )
}

UserData.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(UserData)
  