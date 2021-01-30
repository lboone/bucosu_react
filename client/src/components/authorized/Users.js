import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavbar from '../layout/page/PageWithoutNavbar'

const Users = ( { auth } ) => {
  return (
    <PageWithoutNavbar title="Users">
      <h2>Users Page</h2>
    </PageWithoutNavbar>
  )
}

Users.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Users)
  