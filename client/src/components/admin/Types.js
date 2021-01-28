import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Types = ( { auth } ) => {
  return (
    <div>
      <h1>Project Types</h1>
    </div>
  )
}

Types.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Types)
  