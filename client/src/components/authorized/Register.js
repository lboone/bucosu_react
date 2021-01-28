import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import CompanyList from '../company/CompanyList'

const Register = ( { auth:{ userRegistered }, company:{company, usertype }, register, setAlert } ) => {
  
  const initialState = {
    username: '',
    email: '',
    password: '',
    password2: '',
    firstname: '',
    lastname: '',
    phone: ''
  }
  const [formData, setFormData] = useState(initialState)

  const { username, email, password, password2, firstname, lastname, phone } = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })
  const onSubmit = e => {
    e.preventDefault();
    if(password !== password2) {
      console.log('Passwords do  not match')
      setAlert('Passwords do not match', 'danger', 3000)
    } else{
      if(company && usertype){
        register({
          username, email, password, firstname, lastname, phone, company, usertype
        })
        .then(()=>{
          setFormData({ ...initialState });
          setAlert('User has been registered.','success',3000)
        })
        .catch((e)=>{
          console.log({error: e})
        })
      } else {
        setAlert('You must select a Company & User Type!','danger',3000)
      }
    }
  }

  return (
    <>
      <div className="container-center" style={{marginTop:'5px'}}>
        
        <h1 className="large text-primary">Add User</h1>
        <hr/>
        <form className="form"  onSubmit={e => onSubmit(e)}>
          <br />
          <p className="lead">
            <i className="fas fa-user"></i> User Information.
          </p>
          <CompanyList></CompanyList>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Username" 
              name="username" 
              value={username} 
              onChange={e => onChange(e)}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              name="email" 
              value={email} 
              onChange={e => onChange(e)}
              required
            />
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
          <p className="lead">
            <i className="fas fa-user-plus"></i> Additional Information.
          </p>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="First Name" 
              name="firstname" 
              value={firstname} 
              onChange={e => onChange(e)}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Last Name" 
              name="lastname" 
              value={lastname} 
              onChange={e => onChange(e)}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Phone Number" 
              name="phone" 
              value={phone} 
              onChange={e => onChange(e)}
              required 
            />
            <small className="form-text">
              Use Format: 5182856325
            </small>
          </div>
          <br />
          <input type="submit" className="btn btn-primary" value="Add User" />
        </form>
      </div>
    </>
  )
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  company: state.company,
  auth: state.auth,
})
  
export default connect(mapStateToProps, {register, setAlert})(Register)
  