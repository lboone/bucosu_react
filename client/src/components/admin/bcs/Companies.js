import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavbar from '../../layout/page/PageWithNavbar'


const Companies = ( { auth } ) => {
  return (
    <PageWithNavbar title="Companies">
      <h2>Companies Page</h2>
    </PageWithNavbar>
  )
}

Companies.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})
  
export default connect(mapStateToProps, null)(Companies)
  