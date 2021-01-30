import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavBar from '../layout/page/PageWithoutNavbar'

const Report = ( { auth } ) => {
  return (
    <PageWithoutNavBar title="Report">
      <h2>Report Page</h2>
    </PageWithoutNavBar>
  )
}

Report.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Report)
  