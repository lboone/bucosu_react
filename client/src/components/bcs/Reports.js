import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavBar from '../layout/page/PageWithoutNavbar'

const Reports = ( { auth } ) => {
  return (
    <PageWithoutNavBar title="Reports">
      <h2>Reports Page</h2>
    </PageWithoutNavBar>
  )
}

Reports.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Reports)
  