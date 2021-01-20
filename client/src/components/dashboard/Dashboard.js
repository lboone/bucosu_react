import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { ACCESSTYPES } from '../../utils/constants'

const Dashboard = ( { auth } ) => {
  return (
    <div>
        Dashboard
    </div>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})
  
export default connect(mapStateToProps)(Dashboard)
  