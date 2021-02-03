import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import {activateUser, deactivateUser, getUsers } from '../../../actions/user'

import BeatLoader from 'react-spinners/BeatLoader'
import { css } from '@emotion/core'
const override = css`
  margin: auto;
  display: block;
`

const ListUsers = ( { user:{users}, loading, getUsers, deactivateUser, activateUser} ) => {

  useEffect(()=>{
    getUsers()
  },[getUsers])

  const confirmFunction = () => {
    console.log('confirm')
  }
  const declineFunction = () => {
    console.log('decline')
  }
  const confirm = () => {
    confirmAlert(options)
  }

  const deactivate = async (id) => {
    await deactivateUser(id)
    await getUsers()
  }
  const activate = async (id) => {
    await activateUser(id)
    await getUsers()
  }

  const options = {
    title : 'Delete User?',
    message : 'Are you sure you want to delete this user?',
    buttons: [
      { label: 'Yes', onClick: confirmFunction},
      { label: 'No', onClick: declineFunction}
    ],
    closeOnEscape: false,
    closeOnClickOutside : false,
  }
  return (
    <>
      <Link to="/authorized?action=add" className="btn btn-primary btn-outline pull-right mb-1"><i className="fa fa-user-plus mr-1"></i>New User</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th className="hide-sm">Email</th>
            <th className="hide-sm">Type</th>
            <th className="hide-sm">Company</th>
            <th className="hide-sm text-center">Active</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          { users && users.length > 0 ? (
             users.map((u, index) => {
                return (
                  <tr key={u._id}>
                    <td>{u.username}</td>
                    <td className="hide-sm">{u.email}</td>
                    <td className="hide-sm">{u.usertype.name}</td>
                    <td className="hide-sm">{u.company.name}</td>
                    <td className="hide-sm text-center">{
                      u.isactive? 
                      <Link to="#" className="text-primary" onClick={(e)=>{deactivate(u._id)}}>Active</Link>
                      : 
                      <Link to="#" className="text-light-gray text-strike" onClick={(e)=>{activate(u._id)}}>Inactive</Link>
                    }</td>
                    <td className="text-center"><Link to={`/authorized?action=edit&id=${u._id}`} className="btn btn-success btn-outline"><i className="fa fa-pen-nib"></i> Edit</Link> 
                    <Link to="#" className="btn btn-danger btn-outline" title="Delete" onClick={confirm}><i title="Delete" className="fa fa-trash"></i> Delete</Link>
                    </td>
                  </tr>
                )
              })
            ) : (<tr><td colSpan={6} style={{textAlign: 'center'}}>{
              loading ? (<BeatLoader color={'#37bc9b'} loading={true} css={override} margin={10} size={15} />) : (<h1>No Users Found...</h1>)}</td></tr>
            )
          }
        </tbody>
      </table>
    </>
  )
}

ListUsers.propTypes = {
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  deactivateUser: PropTypes.func.isRequired,
  activateUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user
})
  
export default connect(mapStateToProps,{getUsers, activateUser, deactivateUser})(ListUsers)