import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavBar from '../layout/page/PageWithoutNavbar'

const Password = ( { auth } ) => {
  return (
    <PageWithoutNavBar title="Change Your Password">
      <h2>Change Your Password Page</h2>
    </PageWithoutNavBar>
  )
}

Password.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Password)
  