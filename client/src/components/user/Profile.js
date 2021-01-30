import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavBar from '../layout/page/PageWithoutNavbar'

const Profile = ( { auth } ) => {
  return (
    <PageWithoutNavBar title="Update Your Profile">
      <h2>Update Your Profile Page</h2>
    </PageWithoutNavBar>
  )
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Profile)
  