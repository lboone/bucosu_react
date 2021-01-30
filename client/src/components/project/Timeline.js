import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavBar from '../layout/page/PageWithoutNavbar'

const Timeline = ( { auth } ) => {
  return (
    <PageWithoutNavBar title="Timeline">
      <h2>Timeline Page</h2>
    </PageWithoutNavBar>
  )
}

Timeline.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Timeline)
  