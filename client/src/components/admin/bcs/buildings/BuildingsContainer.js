import React, {useContext} from 'react'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'
import ListBuildings from './ListBuildings'
import AddBuilding from './AddBuilding'
import EditBuilding from './EditBuilding'
import { URLContext } from '../../../../URLContext'


const UsersContainer = ( ) => {
  const {action, id} = useContext(URLContext)
  let finalComponent = null;
  let title = null;
  switch (action) {  
    case 'add':
      finalComponent = (<AddBuilding />)
      title = 'New Building'
      break;
    case 'edit':
      finalComponent = (<EditBuilding id={id}/>)
      title = 'Edit Building'
      break;
    default:
      finalComponent = (<ListBuildings/>)
      title = 'List Buildings'
      break;
  }
  return (
    <PageWithNavbar title={title}>
      {finalComponent}
    </PageWithNavbar>
  )
}

  
export default UsersContainer