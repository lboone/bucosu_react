import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'

const SettingsContainer = ( { auth } ) => {
  return (
    <PageWithNavbar title="Settings">
      <h2>Settings Page</h2>
    </PageWithNavbar>
  )
}

SettingsContainer.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(SettingsContainer)
  