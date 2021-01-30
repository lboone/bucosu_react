import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Authorized = ( { auth } ) => {
  return (
    <div>
      <h1>Auth</h1>
      <hr/>
    </div>
  )
}

Authorized.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Authorized)
  