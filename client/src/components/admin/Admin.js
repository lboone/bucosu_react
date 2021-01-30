import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavbar from '../layout/page/PageWithoutNavbar'

const Admin = ( { auth } ) => {
  return (
    <PageWithoutNavbar title="Admin">
      <h2>Admin Page</h2>
    </PageWithoutNavbar>
  )
}

Admin.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Admin)
  