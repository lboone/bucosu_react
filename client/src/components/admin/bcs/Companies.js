import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Link } from 'react-router-dom'
import PageWithNavbar from '../../layout/page/PageWithNavbar'


const Companies = ( { auth } ) => {
  return (
    <PageWithNavbar title="Companies">
      <Link to="/admin/bcs/companies/addcompany" className="btn btn-bucosu"><i className="fa fa-plus" title="New Company"></i>{" "}New Company</Link> 
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
  