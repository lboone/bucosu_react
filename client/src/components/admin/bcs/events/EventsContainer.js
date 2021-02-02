import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'
import ListEvent from './ListEvents'
import AddEvent from './AddEvent'
import EditEvent from './EditEvent'
import { URLContext } from '../../../../URLContext'


const EventsContainer = ( { event } ) => {
  const {action, id} = useContext(URLContext)
  let finalComponent = null;
  switch (action) {  
    case 'add':
      finalComponent = (<AddEvent />)
      break;
    case 'edit':
      finalComponent = (<EditEvent id={id}/>)
      break;
    default:
      finalComponent = (<ListEvent/>)
      break;
  }
  return (
    <PageWithNavbar title="Events">
      {finalComponent}
    </PageWithNavbar>
  )
}

EventsContainer.propTypes = {
  event: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  event: state.event,
})
  
export default connect(mapStateToProps, null)(EventsContainer)
  