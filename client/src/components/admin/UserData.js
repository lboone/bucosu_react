import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const UserData = ( { auth } ) => {
  return (
    <div>
      <h1>User Data</h1>
    </div>
  )
}

UserData.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(UserData)
  