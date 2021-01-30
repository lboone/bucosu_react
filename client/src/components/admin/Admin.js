import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Admin = ( { auth } ) => {
  return (
    <div>
      <h1>Admin</h1>
      <hr/>
    </div>
  )
}

Admin.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Admin)
  