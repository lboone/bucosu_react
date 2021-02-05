import React, {useContext} from 'react'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'
import ListCompanies from './ListCompanies'
import AddCompany from './AddCompany'
import EditCompany from './EditCompany'
import { URLContext } from '../../../../URLContext'


const CompaniesContainer = () => {
  const {action, id} = useContext(URLContext)
  let finalComponent = null;
  let title = null;
  switch (action) {  
    case 'add':
      finalComponent = (<AddCompany />)
      title = 'New Event'
      break;
    case 'edit':
      finalComponent = (<EditCompany id={id}/>)
      title = 'Edit Event'
      break;
    default:
      finalComponent = (<ListCompanies/>)
      title = 'List Events'
      break;
  }
  return (
    <PageWithNavbar title={title}>
      {finalComponent}
    </PageWithNavbar>
  )
}

  
export default CompaniesContainer  