import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'


const HeadingsContainer = ( { auth } ) => {
  return (
    <PageWithNavbar title="Headings">
      <h2>Headings Page</h2>
    </PageWithNavbar>
  )
}

HeadingsContainer.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(HeadingsContainer)
  