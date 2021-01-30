import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavBar from '../../layout/page/PageWithNavbar'

const Projects = ( { auth } ) => {
  return (
    <PageWithNavBar title="Projects">
      <h1>Hi there from the Projects content section.</h1>
    </PageWithNavBar>
  )
}

Projects.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Projects)
  