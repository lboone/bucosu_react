import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavBar from '../../../layout/page/PageWithNavbar'

const StatusesContainer = ( { auth } ) => {
  return (
    <PageWithNavBar title="Projects | Statuses">
      <h1>Hi there from the Projects | Statuses content section.</h1>
    </PageWithNavBar>
  )
}

StatusesContainer.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(StatusesContainer)
  