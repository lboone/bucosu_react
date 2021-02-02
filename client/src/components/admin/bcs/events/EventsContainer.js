import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {useLocation} from 'react-router-dom'
import queryString from 'query-string'
import PageWithNavbar from '../../../layout/page/PageWithNavbar'
import ListEvent from './ListEvents'
import AddEvent from './AddEvent'
import EditEvent from './EditEvent'


const EventsContainer = ( { event } ) => {
  const params = useLocation()
  const [results, setResults] = useState(null)
  useEffect(()=>{
      setResults(queryString.parse(params.search))
  },[setResults,params])
  
  const action = results && results.action ? results.action : null
  const id = results && results.id ? results.id : null 

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
  