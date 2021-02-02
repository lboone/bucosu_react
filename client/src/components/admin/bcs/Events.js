import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavbar from '../../layout/page/PageWithNavbar'


const Events = ( { auth } ) => {
  return (
    <PageWithNavbar title="Events">
      <h2>Events Page</h2>
    </PageWithNavbar>
  )
}

Events.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Events)
  