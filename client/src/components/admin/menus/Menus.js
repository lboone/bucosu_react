import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavbar from '../../layout/page/PageWithoutNavbar'

const Menus = ( { auth } ) => {
  return (
    <PageWithoutNavbar title="Menus">
      <h2>Menus Page</h2>
    </PageWithoutNavbar>
  )
}

Menus.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Menus)
  