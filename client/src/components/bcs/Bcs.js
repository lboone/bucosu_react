import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Bcs = ( { auth } ) => {
  return (
    <div>
      <h1>BCS</h1>
      <hr/>
    </div>
  )
}

Bcs.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Bcs)
  