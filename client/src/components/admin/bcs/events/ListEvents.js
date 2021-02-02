import React, { useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getBcsEvents } from '../../../../actions/event'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


const Events = ( { event:{events, loading}, getBcsEvents } ) => {
  useEffect(()=>{
    getBcsEvents()
  },[getBcsEvents])

  return (
    <>
      <h2>List Events</h2>
      <Link to="/admin/bcs/events?action=add" className="btn btn-primary">New Event</Link>
      {
        !events || loading ? 
          (<h1>loading...</h1>) 
        : 
          (
            <ul>
              {events.map( (event) => { return (<li key={event._id}>{event.name} - { <Link className="btn btn-success" to={`/admin/bcs/events/?action=edit&id=${event._id}`}> Edit </Link> }</li>)})}
            </ul>
          )
      }
    </>
  )
}

Events.propTypes = {
  event: PropTypes.object.isRequired,
  getBcsEvents: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  event: state.event,
})
  
export default connect(mapStateToProps, {getBcsEvents})(Events)
  