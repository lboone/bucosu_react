import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const Dashboard = ( { auth } ) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <hr/>
    </div>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Dashboard)
  