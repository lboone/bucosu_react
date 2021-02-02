import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBcsEvent } from '../../../../actions/event'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const AddEvent = ({ createBcsEvent }) => {
  
  //const [eventID, setEventID] = useState(null)


  const onClick = (e)=> createBcsEvent()

  return (
    <div>
      <Link to="/admin/bcs/events" className="btn btn-dark">Back</Link>
      <h1>New Event</h1>
    </div>
  )
}

AddEvent.propTypes = {
  createBcsEvent: PropTypes.func.isRequired,
}

export default connect(null,{createBcsEvent})(AddEvent)