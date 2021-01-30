import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavbar from '../../layout/page/PageWithNavbar'


const Headings = ( { auth } ) => {
  return (
    <PageWithNavbar title="Headings">
      <h2>Headings Page</h2>
    </PageWithNavbar>
  )
}

Headings.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Headings)
  