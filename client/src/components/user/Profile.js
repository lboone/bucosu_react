import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Profile = ( { auth } ) => {
  return (
    <Fragment>
      <h1>Edit Profile</h1>
      <hr/>
    </Fragment>
  )
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Profile)
  