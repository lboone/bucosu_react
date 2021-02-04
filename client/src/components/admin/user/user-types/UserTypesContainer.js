import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'

const UserTypesContainer = ( { auth } ) => {
  return (
    <PageWithNavbar title="User Types">
      <h2>User Types Page</h2>
    </PageWithNavbar>
  )
}

UserTypesContainer.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(UserTypesContainer)
  