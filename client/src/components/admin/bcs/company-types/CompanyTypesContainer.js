import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'


const CompanyTypesContainer = ( { auth } ) => {
  return (
    <PageWithNavbar title="Company Types">
      <h2>Company Types Page</h2>
    </PageWithNavbar>
  )
}

CompanyTypesContainer.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(CompanyTypesContainer)
  