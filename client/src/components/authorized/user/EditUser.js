import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getUser } from '../../../actions/user'
import PageWithoutNavbar from '../../layout/page/PageWithoutNavbar'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/core'

const override = css`
  display: block;
  margin: 0 auto;
`
const EditUser = ( { user:{loading, user, userid}, getUser } ) => {
  const history = useHistory()

  useEffect(()=>{
      if(loading || !user){
        getUser(userid)
      }
      
      setFormData({
        username: loading || !user || !user.user ? '' : user.user.username,
        email: loading || !user || !user.user ? '' : user.user.email,
        firstname: loading || !user ? '' : user.firstname,
        lastname: loading || !user ? '' : user.lastname,
        phone: loading || !user ? '' : user.phone      
      })
    
  },[getUser, userid, loading, user])

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
    history.push('/authorized/users')
  }

  const onSubmitClick = (e) =>{
    console.log('submit')
  }
  //const userCompanyID = !loading && user && user.user.company ? user.user.company._id : ''
  //const userUserTypeID = !loading && user && user.user.usertype ? user.user.usertype._id : ''
  //console.log({userCompanyID,userUserTypeID})
  
  

  return (
    <PageWithoutNavbar title="Edit User">
      {loading || !user ? (
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

EditUser.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.object.isRequired,
}

const mapStateToProps = (state,ownProps) => ({
  user: state.user
})
  
export default connect(mapStateToProps, {getUser} )(EditUser)
  