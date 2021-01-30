import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Calendar = ( { auth } ) => {
  return (
    <div>
      <h1>Calendar</h1>
      <hr/>
    </div>
  )
}

Calendar.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Calendar)
  