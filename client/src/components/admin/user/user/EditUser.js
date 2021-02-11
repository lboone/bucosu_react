import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getCompanyUserTypes } from '../../../../redux/actions/company'
import { setAlert } from '../../../../redux/actions/alert'
import CompanyUserTypesSelect from '../../../layout/ui/fields/CompanyUserTypesSelect'
import { Skeleton } from 'antd'
import { adminGetUserProfiles , adminUpdateUserByID} from '../../../../redux/actions/admin/user'


const EditUser = ( { adminUser:{profiles}, id, getCompanyUserTypes, adminUpdateUserByID, setAlert, adminGetUserProfiles } ) => {
  const history = useHistory()
  const [profile, setProfile] = useState(null)
  const [userIndex, setUserIndex] = useState(null)
  const [updateEnabled, setUpdateEnabled] = useState(true)
  const [companyID, setCompanyID] = useState("")
  const [companyUserType, setCompanyUserType] = useState("")
  
  useEffect(()=> id && setUserIndex(id), [id])
  useEffect(()=> userIndex && !profile && profiles && profiles.length > 0 && setProfile(profiles[userIndex]),[userIndex, profile, profiles])

  useEffect(()=> profile && profile.user && profile.user.usertype && setCompanyUserType(profile.user.usertype._id), [ profile ])
  useEffect(()=> profile && profile.user && profile.user.company && setCompanyID(profile.user.company._id), [ profile ])

  useEffect(()=>{
    const getData = async () => {
      try {
          await getCompanyUserTypes(profile.user.company._id)    
      } catch (error) {
        console.log('nope')
      } 
    }
    getData()
  },[ profile, getCompanyUserTypes ])
  


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
      username: !profile || !profile.user ? '' : profile.user.username,
      email: !profile || !profile.user ? '' : profile.user.email,
      firstname: !profile ? '' : profile.firstname,
      lastname: !profile ? '' : profile.lastname,
      phone: !profile ? '' : profile.phone      
    })
  }, [ profile ])


  const { username, email, firstname, lastname, phone } = formData


  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })
  const onSubmit = e => {
    setUpdateEnabled(false)
    e.preventDefault();
    adminUpdateUserByID({
      username,
      email,
      firstname,
      lastname,
      phone,
      usertypeid: companyUserType,
      uid: profile.user._id
    }).then( ()=>{
      setAlert('User has been updated.','success',2000)
      adminGetUserProfiles()
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
/*
 * TODO:  ADD USERTYPES TO THE COMPANY - COMPANYTYPE -USERTYPES WHEN PULLING ALL PROFILES
 *        ADD ABILITY TO PASS THAT DATA TO THE CompanyUserTypesSelect COMPONENT.  
 *        INSIDE OF COMPONENT, IF DATA NOT PASSED THEN LOOKUP ELSE USE PASSED DATA.
 * 
 */

  return (
    <>
      {!profile || !companyUserType ? (
        <div className="container-center" style={{marginTop:'5px'}}>
        <Skeleton avatar active paragraph={{ rows: 5 }} /> 
        <Skeleton avatar active paragraph={{ rows: 5 }} />
        <Skeleton avatar active paragraph={{ rows: 5 }} />
        </div>
      ) : (
        <div className="container-center" style={{marginTop:'5px'}}>
          <form className="form"  onSubmit={e => onSubmit(e)}>
            <br />
            <p className="lead">
              <i className="fas fa-user"></i> User Information.
            </p>
            <CompanyUserTypesSelect onChange={onChangeUserTypes} value={companyUserType} companyID={companyID}/>
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
  adminUser: PropTypes.object.isRequired,
  getCompanyUserTypes: PropTypes.func.isRequired,
  adminUpdateUserByID: PropTypes.func.isRequired,
  adminGetUserProfiles: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state,ownProps) => ({
  adminUser: state.adminUser
})
  
export default connect(mapStateToProps, {getCompanyUserTypes, adminUpdateUserByID, adminGetUserProfiles, setAlert} )(EditUser)
  