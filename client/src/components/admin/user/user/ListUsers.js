import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import 'react-confirm-alert/src/react-confirm-alert.css'
import {activateUser, deactivateUser, deleteUser, getUsers } from '../../../../redux/actions/user'
import {Table, Tag } from 'antd'
import DeleteButton from '../../../layout/ui/buttons/DeleteButton'
import { setAlert } from '../../../../redux/actions/alert'
import SkeletonList from '../../../layout/feedback/SkeletonList'

const ListUsers = ( { user:{users, loading}, getUsers, deactivateUser, activateUser, deleteUser} ) => {
  
  useEffect(()=>{
    getUsers()
  },[getUsers])

  const clickDeleteUser = async (id) => {
    console.log(id)
    await deleteUser(id)
    .then(()=> {
      setAlert('User deleted.','success',2000)
      getUsers()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const deactivate = async (id) => {
    await deactivateUser(id)
    await getUsers()
  }
  const activate = async (id) => {
    await activateUser(id)
    await getUsers()
  }

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Type',
      key: 'type',
      className: 'hide-sm',
      render: (text, record)=> (
        <>
          <Tag color="blue">{record.typename}</Tag>
          <Tag>{record.typelevel}</Tag>
        </>
      )
    },  
    {
      title: 'Company',
      key: 'company',
      className:'hide-sm',
      render: (text, record) => (
        <>{record.companyname}</>
      )
    },
    {
      title: 'Active',
      dataIndex: 'isactive',
      key: 'isactive',
      className:'hide-sm text-center',
      render: ({isactive, id}) => (
        isactive? 
                      <Link to="#" className="text-primary" onClick={(e)=>{deactivate(id)}}>Active</Link>
                      : 
                      <Link to="#" className="text-light-gray text-strike" onClick={(e)=>{activate(id)}}>Inactive</Link>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      className: 'text-center',
      render: (text, record) => (
        <>
          <Link className="btn btn-success btn-outline" title="Edit" to={`/admin/user/home?action=edit&id=${record.userid}`}><i className="fa fa-pen-nib"></i> Edit</Link>
          <DeleteButton confirmDelete={(e)=> clickDeleteUser(record.userid)} itemName="Event"/>
        </>
      )
    }
  ]

  const data = users && !loading && users.map((user)=>{
      return {
        key: user._id,
        username: user.username,
        email: user.email,
        typename: user.usertype.name, 
        typelevel:user.usertype.level,
        companyname: user.company.name,
        isactive: {isactive: user.isactive, id: user._id},
        userid: user._id      
      }
  })
  return (
      <>
      {
        !users || loading ? 
        ( <SkeletonList  rows={4} paragraphs={4} /> )
        :
        (<Table 
          columns={columns} 
          dataSource={data} 
          title={()=>(<Link to="/admin/user/home?action=add" className="btn btn-primary btn-outline pull-right mb-1"><i className="fa fa-plus mr-1"></i>New User</Link>)}
        />)
      }
    </>
    
  )
}

ListUsers.propTypes = {
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  deactivateUser: PropTypes.func.isRequired,
  activateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user
})
  
export default connect(mapStateToProps,{getUsers, activateUser, deactivateUser, deleteUser})(ListUsers)