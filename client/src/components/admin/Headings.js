import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavbar from '../layout/page/PageWithoutNavbar'


const Headings = ( { auth } ) => {
  return (
    <PageWithoutNavbar title="Headings">
      <h2>Headings Page</h2>
    </PageWithoutNavbar>
  )
}

Headings.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Headings)
  