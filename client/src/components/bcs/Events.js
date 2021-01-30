import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavBar from '../layout/page/PageWithoutNavbar'

const Events = ( { auth } ) => {
  return (
    <PageWithoutNavBar title="Events">
      <h2>Events Page</h2>
    </PageWithoutNavBar>
  )
}

Events.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Events)
  