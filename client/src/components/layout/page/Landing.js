import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { ACCESSTYPES } from '../../../utils/constants';

const Landing = ( { auth: { isAuthenticated, loading, level } }) => {
  const {COMPANY, USER} = ACCESSTYPES;
  const {company, user } = level ? level : {}

  if(company <= COMPANY.SCHOOLDISTRICT && user <= USER.READER){
    return <Redirect to="/dashboard/home" />
  }
  return (
    <section className="landing">
      <div className="light-overlay">
        <div className="landing-inner">
          
          <div className="buttons" style={{marginTop: '200px'}}>
            { !loading && ( <Fragment> { !isAuthenticated &&  ( <Link to="/login" className="btn btn-primary btn-outline"><i className="fa fa-sign-in-alt"></i> Login</Link> ) } </Fragment> ) }
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
