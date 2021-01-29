import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserHistory from './components/UserHistory'


const User = ( { auth } ) => {
  
  return (
    <div>
      <h1>User</h1>
      <UserHistory />
    </div>
  )
}

User.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(User)
  