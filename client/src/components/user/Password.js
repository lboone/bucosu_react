import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Password = ( { auth } ) => {
  return (
    <div>
      <h1>Change Password</h1>
    </div>
  )
}

Password.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Password)
  