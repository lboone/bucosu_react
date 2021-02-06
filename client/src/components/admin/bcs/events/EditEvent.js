import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { editBcsEvent, getBcsEvent } from '../../../../redux/actions/event'
import { Link, useHistory } from 'react-router-dom'
import { setAlert } from '../../../../redux/actions/alert'
import moment from 'moment'
import {formatDate} from '../../../../utils/globalFunctions'
import { Skeleton } from 'antd'

const EditEvent = ({ event:{loading, event}, editBcsEvent, setAlert, id , getBcsEvent}) => {  
  const history = useHistory()

  useEffect(()=>{ id && getBcsEvent(id) } , [ id , getBcsEvent ] )
  
  const initialState = {
    name: "",
    startdate: "",
    enddate: "",
    isactive: true,
  }
  const [formData, setFormData] = useState(initialState)

  useEffect(()=>{
    setFormData({
      name: loading || !event  ? '' : event.name,
      startdate: loading || !event  ? '' : formatDate(event.startdate,'YYYY-MM-DD'),
      enddate: loading || !event ? '' : formatDate(event.enddate,'YYYY-MM-DD'),
      isactive: loading || !event ? '' : event.isactive,
    })
  }, [ event, loading ])
  
  const { name, startdate, enddate, isactive } = formData
  
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    editBcsEvent({
      name, 
      startdate: moment(startdate).format('YYYY-MM-DD'), 
      enddate: moment(enddate).format('YYYY-MM-DD'), 
      isactive,
      id
    })
    .then(()=>{
      setFormData({...initialState})
      setAlert('Event has been saved','success',2000)
      setTimeout(()=>{
        history.push('./')
      },2500)
    })
    .catch((e)=> {
      console.log({error: e})
    })
  }
  return (
    <div className="container-center" style={{marginTop: '5px'}}>
      {event && !loading ? (
      <form className="form" onSubmit= {e => onSubmit(e)}>
        <br />
        <p className="lead">
          <i className="fa fa-handshake"></i> Event Information.
        </p>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required          
          />
        </div>
        <div className="form-group">
          <input 
            type="date"
            placeholder="YYYY-MM-DD"
            name="startdate"
            value={startdate}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">
            Start Date
          </small>
        </div>
        <div className="form-group">
          <input 
            type="date"
            placeholder="YYYY-MM-DD"
            name="enddate"
            value={enddate}
            onChange={e => onChange(e)}
            required
          />
          <small className="form-text">
            End Date
          </small>
        </div>
        
        <br />
        <Link to="#" onClick={(e)=>onSubmit(e)} className="btn btn-primary btn-outline"><i className="fa fa-save"></i> Save Event</Link>
        <Link to="/admin/bcs/events" className="btn btn-danger btn-outline"><i className="fa fa-times"></i> Cancel</Link>
      </form>
      )  : (
        <>
        <Skeleton avatar active paragraph={{ rows: 4 }} /> 
        <Skeleton avatar active paragraph={{ rows: 4 }} />
        </>
      )}
    </div>
  )
}

EditEvent.propTypes = {
  editBcsEvent: PropTypes.func.isRequired,
  getBcsEvent: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
}

const mapStateToProps = (state)=> ({
  event: state.event
})

export default connect(mapStateToProps,{editBcsEvent, setAlert, getBcsEvent})(EditEvent)