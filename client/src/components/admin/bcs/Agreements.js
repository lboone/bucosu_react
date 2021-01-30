import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavbar from '../../layout/page/PageWithNavbar'


const Agreements = ( { auth } ) => {
  return (
    <PageWithNavbar title="Agreements">
      <h2>Agreements Page</h2>
    </PageWithNavbar>
  )
}

Agreements.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Agreements)
  