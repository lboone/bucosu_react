import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Reports = ( { auth } ) => {
  return (
    <div>
      <h1>Reports</h1>
      <hr/>
    </div>
  )
}

Reports.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Reports)
  