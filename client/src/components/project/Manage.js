import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Manage = ( { auth } ) => {
  return (
    <div>
      <h1>Manage</h1>
    </div>
  )
}

Manage.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Manage)
  