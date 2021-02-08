import React, {useContext} from 'react'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'
import ListCompanyTypes from './ListCompanyTypes'
import AddCompanyType from './AddCompanyType'
import EditCompanyType from './EditCompanyType'
import { URLContext } from '../../../../URLContext'


const CompanyTypesContainer = () => {
  const {action, id} = useContext(URLContext)
  let finalComponent = null;
  let title = null;
  switch (action) {  
    case 'add':
      finalComponent = (<AddCompanyType />)
      title = 'New Company Type'
      break;
    case 'edit':
      finalComponent = (<EditCompanyType id={id}/>)
      title = 'Edit Company Type'
      break;
    default:
      finalComponent = (<ListCompanyTypes/>)
      title = 'List Company Types'
      break;
  }
  return (
    <PageWithNavbar title={title}>
      {finalComponent}
    </PageWithNavbar>
  )
}

  
export default CompanyTypesContainer  