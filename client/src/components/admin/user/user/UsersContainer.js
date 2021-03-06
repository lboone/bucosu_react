import React, {useContext} from 'react'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'
import ListUsers from './ListUsers'
import AddUser from './AddUser'
import EditUser from './EditUser'
import { URLContext } from '../../../../URLContext'


const UsersContainer = ( ) => {
  const {action, id} = useContext(URLContext)
  let finalComponent = null;
  let title = null;
  switch (action) {  
    case 'add':
      finalComponent = (<AddUser />)
      title = 'New User'
      break;
    case 'edit':
      finalComponent = (<EditUser id={id}/>)
      title = 'Edit User'
      break;
    default:
      finalComponent = (<ListUsers/>)
      title = 'List Users'
      break;
  }
  return (
    <PageWithNavbar title={title}>
      {finalComponent}
    </PageWithNavbar>
  )
}

  
export default UsersContainer
  