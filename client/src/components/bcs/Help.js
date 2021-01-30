import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavBar from '../layout/page/PageWithoutNavbar'

const Help = ( { auth } ) => {
  return (
    <PageWithoutNavBar title="Help">
      <h2>Help Page</h2>
    </PageWithoutNavBar>
  )
}

Help.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Help)
  