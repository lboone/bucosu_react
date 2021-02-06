import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {getUser, updateUserByID } from '../../../../redux/actions/user'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/core'
import { Link, useHistory } from 'react-router-dom'
import { getCompanyUserTypes, setCompanyUserType } from '../../../../redux/actions/company'
import { setAlert } from '../../../../redux/actions/alert'
import CompanyUserTypesList from '../../../layout/ui/fields/CompanyUserTypesList'

const override = css`
  display: block;
  margin: 0 auto;
`
const EditUser = ( { user:{loading, user}, company: { company, usertype, usertypes}, getUser, id, getCompanyUserTypes, setCompanyUserType, updateUserByID, setAlert } ) => {
  const history = useHistory()
  const [userID, setuserID] = useState(null)
  const [updateEnabled, setUpdateEnabled] = useState(true)
  const [companyID, setCompanyID] = useState("")
  
  useEffect(()=> id && setuserID(id), [id])
  useEffect(()=>{ (userID !== null && !user) && getUser(userID) }, [ userID, user, getUser ])
  useEffect(()=>{ (user && user.user && !loading && user.user.company) && setCompanyID(user.user.company._id) }, [ user, loading ])

  useEffect(()=>{
    const getData = async () => {
      try {
          await getCompanyUserTypes(user.user.company._id)
          await setCompanyUserType(user.user.usertype._id)      
      } catch (error) {
        console.log('nope')
      } 
    }
    getData()
  },[ user, getCompanyUserTypes, setCompanyUserType ])
  


  const initialState = {
    username: '',
    email: '', 
    password: '',
    password2: '',
    firstname: '',
    lastname: '',
    phone: '',
  }
  const [formData, setFormData] = useState(initialState)
  useEffect(()=>{
    setFormData({
      username: loading || !user || !user.user ? '' : user.user.username,
      email: loading || !user || !user.user ? '' : user.user.email,
      firstname: loading || !user ? '' : user.firstname,
      lastname: loading || !user ? '' : user.lastname,
      phone: loading || !user ? '' : user.phone      
    })
  }, [ user, loading ])

  const { username, email, firstname, lastname, phone } = formData


  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })
  const onSubmit = e => {
    setUpdateEnabled(false)
    e.preventDefault();
    updateUserByID({
      username,
      email,
      firstname,
      lastname,
      phone,
      usertypeid: usertype,
      uid: userID
    }).then(()=>{
      setAlert('User has been updated.','success',2000)
      setTimeout(()=> {
        setUpdateEnabled(true)
        history.push('/admin/user/home')
      },3000)
    })
    .catch((e)=>{
      console.log({error: e})
    })

  }

  const onChangeUserTypes = (e) => {
    setCompanyUserType(e.target.value)
  }  

  return (
    <>
      {loading || !user ? (
        <ClipLoader color={'#37bc9b'} loading={true} css={override} size={25} />
      ) : (
        <div className="container-center" style={{marginTop:'5px'}}>
          <form className="form"  onSubmit={e => onSubmit(e)}>
            <br />
            <p className="lead">
              <i className="fas fa-user"></i> User Information.
            </p>
            <CompanyUserTypesList onChange={onChangeUserTypes} value={usertype} companyID={companyID}/>
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
            <Link to="#" disabled={!updateEnabled} onClick={(e)=> onSubmit(e)} className="btn btn-success btn-outline"><i className="fa fa-user-edit"></i> Update User</Link>
            <input type="submit" className="btn btn-success btn-outline hidden" value="Update User" onClick={(e)=> onSubmit(e)}/>
            <Link to="/admin/user/home" className="btn btn-danger btn-outline" id="cancelUpdateUser"><i className="fa fa-times"></i> Cancel</Link>            
          </form>
        </div>
      )}
      </>
  )
}

EditUser.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getCompanyUserTypes: PropTypes.func.isRequired,
  setCompanyUserType: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  updateUserByID: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state,ownProps) => ({
  user: state.user,
  company: state.company
})
  
export default connect(mapStateToProps, {getUser, getCompanyUserTypes, setCompanyUserType, updateUserByID, setAlert} )(EditUser)
  