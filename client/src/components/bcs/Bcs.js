import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavBar from '../layout/page/PageWithoutNavbar'

const Bcs = ( { auth } ) => {
  return (
    <PageWithoutNavBar title="BCS">
      <h2>BCS Page</h2>
    </PageWithoutNavBar>
  )
}

Bcs.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Bcs)
  