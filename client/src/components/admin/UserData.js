import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavbar from '../layout/page/PageWithoutNavbar'

const UserData = ( { auth } ) => {
  return (
    <PageWithoutNavbar title="User Data">
      <h2>User Data Page</h2>
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
  