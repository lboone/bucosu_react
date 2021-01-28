import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Timeline = ( { auth } ) => {
  return (
    <div>
      <h1>Timeline</h1>
    </div>
  )
}

Timeline.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Timeline)
  