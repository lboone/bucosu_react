import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {updateUser } from '../../actions/user'
import PageWithoutNavbar from '../layout/page/PageWithoutNavbar'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/core'
import { setAlert} from '../../actions/alert'
import { logout } from '../../actions/auth'

const override = css`
  display: block;
  margin: 0 auto;
`
const EditProfile = ( { profile:{loading, profile}, updateUser,logout , setAlert} ) => {
  const history = useHistory()

  useEffect(()=>{
      setFormData({
        username: loading || !profile || !profile.user ? '' : profile.user.username,
        email: loading || !profile || !profile.user ? '' : profile.user.email,
        firstname: loading || !profile ? '' : profile.firstname,
        lastname: loading || !profile ? '' : profile.lastname,
        phone: loading || !profile ? '' : profile.phone      
      })
    
  },[profile, loading])

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


  const { username, email, firstname, lastname, phone } = formData
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })
  const onSubmit = e => {
    e.preventDefault();
  }

  const onCancelClick = (e) =>{
    history.push('/user')
  }

  const onSubmitClick = (e) =>{
      updateUser({
        username, email, firstname, lastname, phone
      })
      .then(()=>{
        setAlert('Your user profile has been updated, you will be logged out now in 3 seconds.','success',3000)
      })
      .then(()=> {
        setTimeout(logout,3000)
      })
      .catch((e)=>{
        console.log({error: e})
      })
  }

  //const userCompanyID = !loading && user && user.user.company ? user.user.company._id : ''
  //const userUserTypeID = !loading && user && user.user.usertype ? user.user.usertype._id : ''
  //console.log({userCompanyID,userUserTypeID})
  
  

  return (
    <PageWithoutNavbar title="Update Your Profile">
      {loading || !profile ? (
        <ClipLoader color={'#37bc9b'} loading={true} css={override} size={25} />
      ) : (
        <div className="container-center" style={{marginTop:'5px'}}>
          <form className="form"  onSubmit={e => onSubmit(e)}>
            <br />
            <p className="lead">
              <i className="fas fa-user"></i> User Information.
            </p>
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
            <input type="submit" className="btn btn-success" value="Update User" id="updateUser" onClick={(e)=> onSubmitClick()}/>
            <input type="submit" className="btn btn-danger" value="Cancel" id="cancelUpdateUser" onClick={(e)=>onCancelClick()}/>
          </form>
        </div>
      )}
      </PageWithoutNavbar>
  )
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state,ownProps) => ({
  profile: state.profile
})
  
export default connect(mapStateToProps, {updateUser, logout, setAlert} )(EditProfile)
  