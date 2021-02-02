import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithoutNavbar from '../layout/page/PageWithoutNavbar'
import {getUsers} from '../../actions/user'
import UsersTable from './user/UsersTable'

const Users = ( { user, getUsers } ) => {
  useEffect(() => {
    getUsers()
  }, [getUsers])
  
  return (
    <PageWithoutNavbar title="Users">
      <h2>Users Page</h2>
      <UsersTable users={user.users} loading={user.loading} />
    </PageWithoutNavbar>
  )
}

Users.propTypes = {
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user
})
  
export default connect(mapStateToProps, {getUsers})(Users)
  