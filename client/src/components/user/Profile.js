import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Profile = ( { auth } ) => {
  return (
    <div>
      <h1>Edit Profile</h1>
    </div>
  )
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Profile)
  