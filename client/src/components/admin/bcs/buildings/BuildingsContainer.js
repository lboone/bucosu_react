import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'


const BuildingsContainer = ( { auth } ) => {
  return (
    <PageWithNavbar title="Buildings">
      <h2>Buildings Page</h2>
    </PageWithNavbar>
  )
}

BuildingsContainer.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(BuildingsContainer)
  