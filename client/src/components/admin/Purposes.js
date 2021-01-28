import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Purposes = ( { auth } ) => {
  return (
    <div>
      <h1>Project Purposes</h1>
    </div>
  )
}

Purposes.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Purposes)
  