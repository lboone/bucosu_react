import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavbar from '../../layout/page/PageWithNavbar'


const Bcs = ( { auth } ) => {
  return (
    <PageWithNavbar title="BCS">
      <h2>BCS Page</h2>
    </PageWithNavbar>
  )
}

Bcs.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Bcs)
  