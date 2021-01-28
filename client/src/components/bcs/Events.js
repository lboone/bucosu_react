import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Events = ( { auth } ) => {
  return (
    <div>
      <h1>Events</h1>
    </div>
  )
}

Events.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Events)
  