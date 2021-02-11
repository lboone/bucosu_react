import React, {useContext} from 'react'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'
import ListEvents from './ListEvents'
import AddEvent from './AddEvent'
import EditEvent from './EditEvent'
import { URLContext } from '../../../../URLContext'


const EventsContainer = () => {
  const {action, id, index} = useContext(URLContext)
  let finalComponent = null;
  let title = null;
  switch (action) {  
    case 'add':
      finalComponent = (<AddEvent />)
      title = 'New Event'
      break;
    case 'edit':
      finalComponent = (<EditEvent id={id} index={index}/>)
      title = 'Edit Event'
      break;
    default:
      finalComponent = (<ListEvents/>)
      title = 'List Events'
      break;
  }
  return (
    <PageWithNavbar title={title}>
      {finalComponent}
    </PageWithNavbar>
  )
}

  
export default EventsContainer  