import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Users = ( { auth } ) => {
  return (
    <div>
      <h1>Users</h1>
      <hr/>
    </div>
  )
}

Users.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Users)
  