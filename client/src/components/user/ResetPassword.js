import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { resetPassword } from '../../actions/auth'
import PageWithoutNavbar from '../layout/page/PageWithoutNavbar'
import { logout } from '../../actions/auth'

const ResetPassword = ( { resetPassword, setAlert, logout } ) => {
  
  const initialState = {
    origpassword: '',
    password: '',
    password2: ''
  }
  const [formData, setFormData] = useState(initialState)
  const [isDisabled, setIsDisabled] = useState(false)

  const { origpassword, password, password2 } = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })
  const onSubmit = e => {
    e.preventDefault();
    if(password !== password2) {
      setAlert('Passwords do not match', 'danger', 3000)
    } else if (password === origpassword) {
      setAlert("New Password can't match your Original Password", 'danger', 3000)
    } else{
      resetPassword({ origpassword, password })
      .then(()=>{
        setIsDisabled(true)
        setAlert('Your user profile has been updated, you will be logged out now in 3 seconds.','success',3000)
      })
      .then(()=> {
        setTimeout(logout,3000)
      })
      .catch((e)=>{
        console.log({error: e})
      })
    }
  }

  return (
    <PageWithoutNavbar title="Reset Your Password">
      <div className="container-center" style={{marginTop:'5px'}}>
        <form className="form"  onSubmit={e => onSubmit(e)}>
          <br />
          <p className="lead">
            <i className="fas fa-user"></i> Reset Password.
          </p>
          <div className="form-group">
            <input
              type="password"
              placeholder="Original Password"
              name="origpassword"
              value={origpassword} 
              onChange={e => onChange(e)}
              minLength="6"
              required
            />
            <small className="form-text">
              Note: Changing your password will log you out.
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password} 
              onChange={e => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2} 
              onChange={e => onChange(e)}
              minLength="6"
              required
              autoComplete={'false'}
            />
          </div>
          <br />
          <input type="submit" className="btn btn-primary" value="Change Password" disabled={isDisabled} />
        </form>
      </div>
    </PageWithoutNavbar>
  )
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

  
export default connect(null, {resetPassword, setAlert, logout})(ResetPassword)
  