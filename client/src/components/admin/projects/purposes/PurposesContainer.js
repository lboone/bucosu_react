import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavBar from '../../../layout/page/PageWithNavbar'

const PurposesContainer = ( { auth } ) => {
  return (
    <PageWithNavBar title="Projects | Purposes">
      <h1>Hi there from the Projects | Purposes content section.</h1>
    </PageWithNavBar>
  )
}

PurposesContainer.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(PurposesContainer)
  