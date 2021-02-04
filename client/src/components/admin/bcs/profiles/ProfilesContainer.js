import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'


const ProfilesContainer = ( { auth } ) => {
  return (
    <PageWithNavbar title="Profiles">
      <h2>Profiles Page</h2>
    </PageWithNavbar>
  )
}

ProfilesContainer.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(ProfilesContainer)
  