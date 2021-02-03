import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createBcsEvent } from '../../../../actions/event'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const AddEvent = ({ createBcsEvent }) => {
  
  //const [eventID, setEventID] = useState(null)


  const onClick = (e)=> createBcsEvent()

  return (
    <div>
      <Link to="/admin/bcs/events" className="btn btn-dark btn-outline"><i className="fa fa-chevron-left"></i> Back</Link>
      <Link onClick={(e)=>onClick(e)} className="btn btn-primary btn-outline"><i className="fa fa-save"></i> Save Event</Link>
    </div>
  )
}

AddEvent.propTypes = {
  createBcsEvent: PropTypes.func.isRequired,
}

export default connect(null,{createBcsEvent})(AddEvent)