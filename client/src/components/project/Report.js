import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Report = ( { auth } ) => {
  return (
    <div>
      <h1>Reports</h1>
      <hr/>
    </div>
  )
}

Report.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Report)
  