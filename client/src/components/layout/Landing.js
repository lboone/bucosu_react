import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

const Landing = ( { auth: { isAuthenticated, loading } }) => {
  
  return (
    <section className="landing">
      <div className="light-overlay">
        <div className="landing-inner">
          
          <div className="buttons" style={{marginTop: '200px'}}>
            { !loading && ( <Fragment> { !isAuthenticated &&  ( <Link to="/login" className="btn btn-bucosu">Login</Link> ) } </Fragment> ) }
          </div>
          
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Landing)
