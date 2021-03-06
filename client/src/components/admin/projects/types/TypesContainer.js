import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavBar from '../../../layout/page/PageWithNavbar'

const TypesContainer = ( { auth } ) => {
  return (
    <PageWithNavBar title="Projects | Types">
      <h1>Hi there from the Projects | Types content section.</h1>
    </PageWithNavBar>
  )
}

TypesContainer.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(TypesContainer)
  