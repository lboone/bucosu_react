import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Password = ( { auth } ) => {
  return (
    <Fragment>
      <h1>Change Password</h1>
      <hr/>
    </Fragment>
  )
}

Password.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Password)
  