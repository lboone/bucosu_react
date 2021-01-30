import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavbar from '../layout/page/PageWithoutNavbar'

const Authorized = ( { auth } ) => {
  return (
    <PageWithoutNavbar title="Auth">
      <h2>Auth Page</h2>
    </PageWithoutNavbar>
  )
}

Authorized.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Authorized)
  