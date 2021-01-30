import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavBar from '../layout/page/PageWithoutNavbar'

const Project = ( { auth } ) => {
  return (
    <PageWithoutNavBar title="Project">
      <h2>Project Page</h2>
    </PageWithoutNavBar>
  )
}

Project.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Project)
  