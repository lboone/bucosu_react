import React, {useContext} from 'react'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'
import ListCompanies from './ListCompanies'
import AddCompany from './AddCompany'
import EditCompany from './EditCompany'
import { URLContext } from '../../../../URLContext'


const CompaniesContainer = () => {
  const {action, id, index} = useContext(URLContext)
  let finalComponent = null;
  let title = null;
  switch (action) {  
    case 'add':
      finalComponent = (<AddCompany />)
      title = 'New Company'
      break;
    case 'edit':
      finalComponent = (<EditCompany index={index} id={id} />)      
      title = 'Edit Company'
      break;
    default:
      finalComponent = (<ListCompanies/>)
      title = 'List Companies'
      break;
  }
  return (
    <PageWithNavbar title={title}>
      {finalComponent}
    </PageWithNavbar>
  )
}

  
export default CompaniesContainer  