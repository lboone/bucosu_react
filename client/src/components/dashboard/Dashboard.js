import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavBar from '../layout/page/PageWithoutNavbar'

const Dashboard = ( { auth } ) => {
  return (
    <PageWithoutNavBar title="Dashboard">
      <h2>Dashboard Page</h2>
    </PageWithoutNavBar>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Dashboard)
  