import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { editBcsEvent, getBcsEvent } from '../../../../redux/actions/event'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const EditEvent = ({event:{event, loading}, getBcsEvent, editBcsEvent, id}) => {
  const [eventID, setEventID] = useState(null)
  useEffect(()=>{
    setEventID(id)
    if(eventID !== null){
      getBcsEvent(eventID)
    }
    
  },[setEventID,getBcsEvent,eventID, id])

  //const onClick = (e)=> editBcsEvent()

  return (
    <div>
      <Link to="/admin/bcs/events" className="btn btn-dark btn-outline"><i className="fa fa-chevron-left"></i> Back</Link>
      Editing: {!event || loading  ? (<h3>Loading...</h3>) : event.name }  
    </div>
  )
}

EditEvent.propTypes = {
  event: PropTypes.object.isRequired,
  getBcsEvent: PropTypes.func.isRequired,
  editBcsEvent: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  event: state.event,
})
export default connect(mapStateToProps,{getBcsEvent, editBcsEvent})(EditEvent)