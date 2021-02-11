import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import 'react-confirm-alert/src/react-confirm-alert.css'
import {adminUpdateUserProfiles, adminActivateUser, adminDeactivateUser, adminDeleteUser, adminGetUserProfiles } from '../../../../redux/actions/admin/user'
import { Tag } from 'antd'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import { setAlert } from '../../../../redux/actions/alert'
import SkeletonList from '../../../layout/feedback/SkeletonList'

const ListUsers = ( { adminUser:{profiles, loading}, adminUpdateUserProfiles, adminGetUserProfiles, adminDeactivateUser, adminActivateUser, adminDeleteUser} ) => {
  
  useEffect(()=>{
    if(loading && profiles && profiles.length < 1)
    adminGetUserProfiles()
  },[adminGetUserProfiles, loading, profiles])

  const clickAdminDeleteUser = async ({id, index}) => {
    await adminDeleteUser(id)
    .then(()=> {
      const newProfiles = [...profiles]
      newProfiles.splice(index,1)
      adminUpdateUserProfiles(newProfiles)
      setAlert('User deleted.','success',2000)

    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const deactivate = async ({id, index}) => {
    
    await adminDeactivateUser(id)
    .then(()=>{
      const newProfiles = [...profiles]
      newProfiles[index].user.isactive = false
      adminUpdateUserProfiles(newProfiles)
      }
    )
  }
  const activate = async ({id, index}) => {
    await adminActivateUser(id)
    .then(()=>{
      const newProfiles = [...profiles]
      newProfiles[index].user.isactive = true
      adminUpdateUserProfiles(newProfiles)
      }
    )
  }

  return (
      <>
      {
        !profiles || loading ? 
        ( <SkeletonList  rows={4} paragraphs={4} /> )
        :
        (
          <>
            <Link to="/admin/user/home?action=add" className="btn btn-primary btn-outline pull-right mb-1"><i className="fa fa-plus mr-1"></i>New User</Link>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="hide-md">Email</th>
                  <th className="hide-md">Type</th>
                  <th className="hide-md">Company</th>
                  <th className="hide-md text-center">Active</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles && !loading && profiles.map((profile, index)=>{
                  return(
                    <tr key={profile.user._id}>
                      <td>
                        {`${profile.firstname} ${profile.lastname}`}
                      </td>
                      <td className="hide-md">
                        {profile.user.email}
                      </td>
                      <td className="hide-md">   
                        <>
                          <Tag color="blue">{profile.user.usertype.name}</Tag>
                          <Tag>{profile.user.usertype.level}</Tag>
                        </>
                      </td>
                      <td className="hide-md">
                        {profile.user.company.name}
                      </td>
                      <td className="hide-md text-center">
                      {profile.user.isactive? 
                        (<Link to="#" className="text-primary" onClick={(e)=>{deactivate({id: profile.user._id, index})}}>Active</Link>)
                        : 
                        (<Link to="#" className="text-light-gray text-strike" onClick={(e)=>{activate({id: profile.user._id, index})}}>Inactive</Link>)
                      }
                      </td>
                      <td className="text-center">
                        <>
                          <Link className="btn btn-success btn-outline" title="Edit" to={`/admin/user/home?action=edit&id=${index}`}><i className="fa fa-pen-nib"></i> Edit</Link>
                          <DeleteButton confirmDelete={(e)=> clickAdminDeleteUser({id: profile.user._id, index})} itemName="Event"/>
                        </>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )
      }
    </>
    
  )
}

ListUsers.propTypes = {
  adminUser: PropTypes.object.isRequired,
  adminGetUserProfiles: PropTypes.func.isRequired,
  adminDeactivateUser: PropTypes.func.isRequired,
  adminActivateUser: PropTypes.func.isRequired,
  adminUpdateUserProfiles: PropTypes.func.isRequired,
  adminDeleteUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  adminUser: state.adminUser
})
  
export default connect(mapStateToProps,{adminUpdateUserProfiles, adminGetUserProfiles, adminActivateUser, adminDeactivateUser, adminDeleteUser})(ListUsers)