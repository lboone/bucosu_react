import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavBar from '../layout/page/PageWithoutNavbar'

const Calendar = ( { auth } ) => {
  return (
    <PageWithoutNavBar title="Calendar">
      <h2>Calendar Page</h2>
    </PageWithoutNavBar>
  )
}

Calendar.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Calendar)
  