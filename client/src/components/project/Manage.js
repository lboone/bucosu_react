import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavBar from '../layout/page/PageWithoutNavbar'

const Manage = ( { auth } ) => {
  return (
    <PageWithoutNavBar title="Manage">
      <h2>Manage Page</h2>
    </PageWithoutNavBar>
  )
}

Manage.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Manage)
  