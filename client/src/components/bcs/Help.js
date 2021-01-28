import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Help = ( { auth } ) => {
  return (
    <div>
      <h1>Help</h1>
    </div>
  )
}

Help.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Help)
  